// Order.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUserOrder } from "../Firebase/firebaseFunctions";
import { auth } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import StickyHeadTable from "../Components/Table";

const Order = () => {
  const mode = useSelector((state) => state.theme.mode); // for Theme
  const [ordered, setOrdered] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const product = await getUserOrder();
        if (Array.isArray(product)) {
          setOrdered(product); // ✅ Set directly
        } else if (product) {
          setOrdered([product]); // ✅ Wrap single object in array
        } else {
          setOrdered([]);
        }
      } else {
        console.log("No user logged in.");
        setOrdered([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <StickyHeadTable data={ordered} />
    </div>
  );
};

export default Order;
