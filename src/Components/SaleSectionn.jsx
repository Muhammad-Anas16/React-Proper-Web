import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../Firebase/firebaseFunctions";

const SaleSection = () => {
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products).slice(0, 5);
  const userLogin = useSelector((state) => state.IsLogin.IsLogin);
  const mode = useSelector((state) => state.theme.mode);

  const HandleAddToCart = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.images[0],
      quantity: 1,
    });
  };
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
          className={`text-lg font-bold mt-4 ${
            mode === "dark" ? "text-white" : "text-black"
          }`}
        >
          Flesh Sales
        </h1>
      </div>
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((item, index) => {
            // console.log(item?.images[0])
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
                    <button
                      id={item.id}
                      onClick={(e) => HandleAddToCart(e, item)}
                      className="absolute bottom-0 right-0 left-0 bg-black bg-opacity-80 text-white px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <LocalGroceryStoreOutlinedIcon fontSize="small" /> Shop
                      Now
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

export default SaleSection;
