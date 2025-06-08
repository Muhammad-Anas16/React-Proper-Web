import { useSelector } from "react-redux";
import { Link } from "react-router";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import Loader from "./Loading";
import { useState } from "react";

const ProductSection = () => {
  const products = useSelector((state) => state.products.products).slice(5, 15);

  const [isLoading, setIsLoading] = useState(false);

  const changeIsLoading = setInterval(() => {
    setIsLoading(true);
  }, 3000);

  return products ? (
    isLoading == false ? (
      <section className="flex items-center justify-center p-5">
        <Loader />
      </section>
    ) : (
      <section className="text-gray-600 body-font border border-gray-300">
        <div className="capitalize flex items-center justify-between px-5 pt-3">
          <h1 className="text-lg text-black font-bold capitalize">
            explore our products
          </h1>
          <Link
          to={"/product"}
            type="button"
            className="text-black border border-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            See All
          </Link>
        </div>
        <div className="container px-4 py-6 mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((item, index) => (
              <Link key={index} to={`/${item.id}`} className="w-full p-5">
                <div className="group relative h-32 rounded overflow-hidden bg-white shadow-sm">
                  <img
                    alt="product"
                    className="object-cover w-full h-full p-2"
                    src={item?.images[0]}
                  />
                  <button className="absolute bottom-0 right-0 left-0 bg-black bg-opacity-80 text-white px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <LocalGroceryStoreOutlinedIcon fontSize="small" /> Add to
                    Cart
                  </button>
                </div>
                <div className="mt-1 text-center">
                  <h2 className="text-gray-900 text-xs font-medium truncate">
                    {item.title}
                  </h2>
                  <p className="text-xs">${item?.price}.00</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  ) : (
    <Loader />
  );
};

export default ProductSection;
