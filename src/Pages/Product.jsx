import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import Pagination from "@mui/material/Pagination";

const Product = () => {
  const { category } = useParams();
  const [addProducts, setAddProducts] = useState(10);
  const [count, setCount] = useState(1);

  const userLogin = useSelector((state) => state.IsLogin.IsLogin);
  const allProducts = useSelector(
    (state) => state.customProducts.customProducts
  );

  // Your logic: filter first if category is passed, else show all
  const filterCategory = allProducts.filter(
    (item) => item?.category === category
  );
  const products = category
    ? filterCategory
    : allProducts.slice(0, addProducts);

  const QTY = Math.ceil(
    (category ? filterCategory.length : allProducts.length) / 10
  );

  console.log(QTY);

  return (
    <section className="text-gray-600 body-font border border-gray-300">
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((item, index) => (
            <Link
              key={index}
              to={userLogin ? `/${item.id}` : "/auth"}
              className="w-full p-5"
            >
              <div className="group relative h-32 rounded overflow-hidden bg-white shadow-sm">
                <img
                  alt="product"
                  className="object-cover w-full h-full p-2"
                  src={item?.images[0]}
                />
                {userLogin && (
                  <button className="absolute bottom-0 right-0 left-0 bg-black bg-opacity-80 text-white px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <LocalGroceryStoreOutlinedIcon fontSize="small" /> Shop Now
                  </button>
                )}
              </div>
              <div className="mt-1 text-center">
                <h2 className="text-gray-900 text-xs font-medium truncate">
                  {item?.title}
                </h2>
                <p className="text-xs">${item?.price}.00</p>
              </div>
            </Link>
          ))}
        </div>

        {count < QTY && (
          <div className="w-full flex items-center justify-center mt-4">
            <button
              className="w-[50vw] capitalize text-white bg-black py-2 px-4 rounded-full"
              onClick={() => {
                setAddProducts((prev) => prev + 10);
                setCount((prev) => prev + 1);
              }}
            >
              load more
            </button>
          </div>
        )}

        <Pagination count={QTY} />
      </div>
    </section>
  );
};

export default Product;
