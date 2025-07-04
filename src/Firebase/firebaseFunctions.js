// firebaseFunctions.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./Firebase";


export const userOrder = async (productData) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("User not logged in");
        return;
    }

    const userId = user.uid;
    const orderRef = doc(db, "orders", userId);

    try {
        await setDoc(
            orderRef,
            {
                userId,
                orderedProduct: productData, // 👈 one object (not array)
                createdAt: new Date().toISOString(),
            },
            { merge: true }
        );
        console.log("Product saved successfully.");
    } catch (err) {
        console.error("Error saving product:", err);
    }
};

export const getUserOrder = async () => {
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
            console.log("User Order:", data.orderedProduct); 
            return data.orderedProduct;
        } else {
            console.log("No order found for user.");
            return null;
        }
    } catch (err) {
        console.error("Error getting order:", err);
        return null;
    }
};