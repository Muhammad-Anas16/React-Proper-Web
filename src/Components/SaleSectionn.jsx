import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { db } from "../Firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";

const SaleSection = () => {
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products).slice(0, 5);
  const userLogin = useSelector((state) => state.IsLogin.IsLogin);

  // console.log(products[0]);

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
    <section className="text-gray-600 body-font border border-gray-300">
      <div className="capitalize flex items-center justify-between px-5 pt-3">
        <h1 className="text-lg text-black font-bold mt-4">Flesh Sales</h1>
      </div>
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((item, index) => {

            // console.log(item?.images[0])
            if (userLogin) {
              return (
                <Link key={index} to={`/${item.id}`} className="w-full p-5">
                  <div className="group relative h-32 rounded overflow-hidden bg-white shadow-sm">
                    <img
                      alt="product"
                      className="object-cover w-full h-full p-2"
                      src={item?.images[0]}
                    />
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
                      {""} Shop Now
                    </button>
                  </div>
                  <div className="mt-1 text-center">
                    <h2 className="text-gray-900 text-xs font-medium truncate">
                      {item?.title}
                    </h2>
                    <p className="text-xs">${item?.price}.00</p>
                  </div>
                </Link>
              );
            } else {
              return (
                <Link key={index} to={`/auth`} className="w-full p-5">
                  <div className="group relative h-32 rounded overflow-hidden bg-white shadow-sm">
                    <img
                      alt="product"
                      className="object-cover w-full h-full p-2"
                      src={item?.images[0]}
                    />
                  </div>
                  <div className="mt-1 text-center">
                    <h2 className="text-gray-900 text-xs font-medium truncate">
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

export default SaleSection;
