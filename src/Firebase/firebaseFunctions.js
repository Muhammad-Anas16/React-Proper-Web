// firebaseFunctions.js
import { doc, setDoc, getDoc, updateDoc, deleteDoc, arrayUnion, collection, getDocs } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "./Firebase";


export const addUser = async (data) => { // add User in database
    const user = auth.currentUser;
    if (!user) {
        console.error("User not logged in");
        return;
    }

    const userId = user.uid;
    const userRef = doc(db, "User", userId);

    try {
        await setDoc(
            userRef,
            {
                userId,
                data: {
                    ...data,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            },
            { merge: true }
        );
        console.log("Sign Up successfully.");
    } catch (err) {
        console.error("Error Sign Up:", err);
    }
};

export const updateUserProfile = async (userId, userData) => {
    try {
        const userRef = doc(db, "User", userId);
        await updateDoc(userRef, {
            data: {
                ...userData,
                updatedAt: new Date().toISOString(),
            },
        });
        console.log("Profile updated successfully.");
    } catch (err) {
        console.error("Error updating profile:", err);
        throw err;
    }
};

export const deleteUserProfile = async (userId) => {
    try {
        const userRef = doc(db, "User", userId);
        await deleteDoc(userRef);
        console.log("User profile deleted successfully.");
    } catch (err) {
        console.error("Error deleting user profile:", err);
        throw err;
    }
};

export const userOrder = async (productList) => {
    const user = auth.currentUser;
    if (!user) return console.error("User not logged in");

    if (!Array.isArray(productList)) return console.error("Product list must be an array");

    const orderRef = doc(db, "orders", user.uid);

    try {
        const docSnap = await getDoc(orderRef);
        const oldOrders = docSnap.data()?.orderedProduct || [];

        const newOrders = productList.map(item => ({
            ...item,
            orderedAt: new Date().toISOString(),
        }));

        await setDoc(orderRef, {
            userId: user.uid,
            orderedProduct: [...oldOrders, ...newOrders],
            createdAt: docSnap.data()?.createdAt || new Date().toISOString(),
        }, { merge: true });

        console.log("Order saved successfully.");
    } catch (err) {
        console.error("Error saving order:", err);
    }
};

export const getUserOrder = async () => { // Get oder function
    const user = auth.currentUser;
    if (!user) {
        console.error("User not logged in");
        return null;
    }

    const userId = user.uid;
    const orderRef = doc(db, "orders", userId);

    try {
        const docSnap = await getDoc(orderRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // console.log("User Order:", data.orderedProduct);
            return data.orderedProduct;
        } else {
            // console.log("No order found for user.");
            return null;
        }
    } catch (err) {
        console.error("Error getting order:", err);
        return null;
    }
};

export const updateUserOrder = async (updatedFields) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("User not logged in");
        return;
    }

    const userId = user.uid;
    const orderRef = doc(db, "orders", userId);

    try {
        await updateDoc(orderRef, updatedFields);
        console.log("Order updated successfully.");
    } catch (error) {
        console.error("Error updating order:", error);
    }
};

export const Google = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        await addUser({
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
        })

        console.log("User:", user);
        console.log("Access Token:", token);

        return user;
    } catch (error) {
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error("Login error:", errorMessage);
        console.error("Email:", email);
        console.error("Credential:", credential);
    }
};

export const addToCart = async (product) => {
    const user = auth.currentUser;
    if (!user) return console.error("User not logged in");
    if (!product || !product.id) return console.error("Invalid product");

    const CartRef = doc(db, "carts", user.uid);
    try {
        const docSnap = await getDoc(CartRef);
        const oldCarts = docSnap.data()?.cartProduct || [];
        // Check if product already exists in cart
        const exists = oldCarts.find(item => item.id === product.id);
        let newCarts;
        if (exists) {
            // If exists, update quantity
            newCarts = oldCarts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
                    : item
            );
        } else {
            newCarts = [...oldCarts, { ...product, quantity: product.quantity || 1, CartedAt: new Date().toISOString() }];
        }
        await setDoc(CartRef, {
            userId: user.uid,
            cartProduct: newCarts,
            createdAt: docSnap.data()?.createdAt || new Date().toISOString(),
        }, { merge: true });
        console.log("Product added to cart successfully.");
    } catch (err) {
        console.error("Error adding to cart:", err);
    }
};


export const deleteCart = async (productId) => {
    const user = auth.currentUser;
    if (!user) return console.error("User not logged in");
    if (!productId) return console.error("Invalid product ID");

    const CartRef = doc(db, "carts", user.uid);
    try {
        const docSnap = await getDoc(CartRef);
        const oldCarts = docSnap.data()?.cartProduct || [];
        const newCarts = oldCarts.filter(item => item.id !== productId);
        await setDoc(CartRef, {
            userId: user.uid,
            cartProduct: newCarts,
            createdAt: docSnap.data()?.createdAt || new Date().toISOString(),
        }, { merge: true });
        console.log("Product removed from cart successfully.");
    } catch (err) {
        console.error("Error removing from cart:", err);
    }
};

export const getAllUsers = async () => {
  try {
    const usersCol = collection(db, "User");
    const snapshot = await getDocs(usersCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};

export const getAllOrders = async () => {
  try {
    const ordersCol = collection(db, "orders");
    const snapshot = await getDocs(ordersCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching orders:", err);
    return [];
  }
};

export const updateAnyUserOrder = async (userId, orderedProduct) => {
  try {
    const orderRef = doc(db, "orders", userId);
    await updateDoc(orderRef, { orderedProduct });
    console.log("Order updated for user", userId);
  } catch (err) {
    console.error("Error updating user order:", err);
  }
};

export const deleteAnyUserOrder = async (userId, orderIndex) => {
  try {
    const orderRef = doc(db, "orders", userId);
    const docSnap = await getDoc(orderRef);
    const oldOrders = docSnap.data()?.orderedProduct || [];
    const newOrders = oldOrders.filter((_, idx) => idx !== orderIndex);
    await updateDoc(orderRef, { orderedProduct: newOrders });
    console.log("Order deleted for user", userId);
  } catch (err) {
    console.error("Error deleting user order:", err);
  }
};

export const getCarouselImages = async () => {
  try {
    const docRef = doc(db, "carousel", "main");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().images || [];
    }
    return [];
  } catch (err) {
    console.error("Error fetching carousel images:", err);
    return [];
  }
};

export const setCarouselImages = async (images) => {
  try {
    const docRef = doc(db, "carousel", "main");
    await setDoc(docRef, { images });
    console.log("Carousel images updated in Firestore.");
  } catch (err) {
    console.error("Error setting carousel images:", err);
  }
};

export const deleteAllOrdersForUser = async (userId) => {
  try {
    const orderRef = doc(db, "orders", userId);
    await deleteDoc(orderRef);
    console.log("All orders deleted for user", userId);
  } catch (err) {
    console.error("Error deleting all orders for user:", err);
  }
};

