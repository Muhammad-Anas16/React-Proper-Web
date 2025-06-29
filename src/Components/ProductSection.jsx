import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import Loader from "./Loading";
import { db } from "../Firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";

const ProductSection = () => {
  const mode = useSelector((state) => state.theme.mode);
  const userLogin = useSelector((state) => state.IsLogin.IsLogin);
  const products = useSelector(
    (state) => state.customProducts.customProducts
  ).slice(5, 15);
  const [isLoading, setIsLoading] = useState(false);

  const changeIsLoading = setInterval(() => {
    setIsLoading(true);
  }, 3000);

  // const HandleAddToCard = async (image, title, price) => {
  //   if (!userLogin) {
  //     navigate("/auth");
  //     return;
  //   }

  //   try {
  //     const docRef = await addDoc(collection(db, "carts"), {
  //       image,
  //       title,
  //       price,
  //       uid: userLogin,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  return (
    <section
      className={`${
        mode === "dark"
          ? "bg-gray-900 text-gray-100 border-gray-700"
          : "bg-white text-gray-600 border-gray-300"
      } body-font border`}
    >
      <div className="capitalize flex items-center justify-between px-5 pt-3">
        <h1
          className={`text-lg font-bold capitalize ${
            mode === "dark" ? "text-white" : "text-black"
          }`}
        >
          explore our products
        </h1>
        <Link
          to={"/product"}
          type="button"
          className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
            mode === "dark"
              ? "text-white border border-white"
              : "text-black border border-black"
          }`}
        >
          See All
        </Link>
      </div>
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((item, index) => {
            if (userLogin) {
              return (
                <Link key={index} to={`/${item.id}`} className="w-full p-5">
                  <div
                    className={`group relative h-32 rounded overflow-hidden shadow-sm ${
                      mode === "dark" ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <img
                      alt="product"
                      className="object-cover w-full h-full p-2"
                      src={item?.images[0]}
                    />
                    {/* Show Add to Cart only when user is logged in */}
                    <button
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   e.stopPropagation();
                      //   HandleAddToCard(
                      //     item?.images[0],
                      //     item?.title,
                      //     item?.price
                      //   );
                      // }}
                      className="absolute bottom-0 right-0 left-0 bg-black bg-opacity-80 text-white px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <LocalGroceryStoreOutlinedIcon fontSize="small" />
                      {" "}Shop Now
                    </button>
                  </div>
                  <div className="mt-1 text-center">
                    <h2
                      className={`text-xs font-medium truncate ${
                        mode === "dark" ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {item?.title}
                    </h2>
                    <p className="text-xs">${item?.price}.00</p>
                  </div>
                </Link>
              );
            } else {
              return (
                <Link key={index} to={`/auth`} className="w-full p-5">
                  <div
                    className={`group relative h-32 rounded overflow-hidden shadow-sm ${
                      mode === "dark" ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <img
                      alt="product"
                      className="object-cover w-full h-full p-2"
                      src={item?.images[0]}
                    />
                  </div>
                  <div className="mt-1 text-center">
                    <h2
                      className={`text-xs font-medium truncate ${
                        mode === "dark" ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {item?.title}
                    </h2>
                    <p className="text-xs">${item?.price}.00</p>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};


export default ProductSection;
