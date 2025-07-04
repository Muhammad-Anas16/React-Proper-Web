import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUserOrder } from "../Firebase/firebaseFunctions";
import { auth } from "../Firebase/Firebase";

const Order = () => {
  const [ordered, setOrdered] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const product = await getUserOrder();
        setOrdered(product);
      } else {
        console.log("No user logged in.");
      }
    });

    console.log(ordered);

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Order Section</h1>
    </div>
  );
};

export default Order;
