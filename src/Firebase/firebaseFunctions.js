// firebaseFunctions.js
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "./Firebase";


export const addUser = async (data) => { // add User in database
    const user = auth.currentUser;
    if (!user) {
        console.error("User not logged in");
        return;
    }

    const userId = user.uid;
    const orderRef = doc(db, "User", userId);

    try {
        await setDoc(
            orderRef,
            {
                userId,
                data,
                createdAt: new Date().toISOString(),
            },
            { merge: true }
        );
        console.log("Sign Up successfully.");
    } catch (err) {
        console.error("Error Sign Up:", err);
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

export const userCart = async (cartList) => {
    const user = auth.currentUser;
    if (!user) return console.error("User not logged in");

    if (!Array.isArray(cartList)) return console.error("Product list must be an array");

    const CartRef = doc(db, "carts", user.uid);

    try {
        const docSnap = await getDoc(CartRef);
        const oldCarts = docSnap.data()?.CartedProduct || [];

        const newCarts = cartList.map(item => ({
            ...item,
            CartedAt: new Date().toISOString(),
        }));

        await setDoc(CartRef, {
            userId: user.uid,
            cartProduct: [...oldCarts, ...newCarts],
            createdAt: docSnap.data()?.createdAt || new Date().toISOString(),
        }, { merge: true });

        console.log("Cart saved successfully.");
    } catch (err) {
        console.error("Error saving Cart:", err);
    }
};