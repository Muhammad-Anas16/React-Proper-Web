import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";

const Product = () => {
  const [addProducts, setAddProducts] = useState(10);
  const [count, setCount] = useState(1);

  const products = useSelector((state) => state.products.products).slice(
    0,
    addProducts
  );
  const totalAddProductsNumber = useSelector(
    (state) => state.products.products
  );

  const QTY = Math.ceil(totalAddProductsNumber.length / 10);

  console.log("QTY :", QTY);
  console.log("count :", count);

  return (
    <section className="text-gray-600 body-font border border-gray-300">
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((item, index) => (
            <Link key={index} to={`/${item.id}`} className="w-full p-5">
              <div className="group relative h-32 rounded overflow-hidden bg-white shadow-sm">
                <img
                  alt="product"
                  className="object-cover w-full h-full p-2"
                  src={item?.images[0]}
                />
                <button className="absolute bottom-0 right-0 left-0 bg-black bg-opacity-80 text-white px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <LocalGroceryStoreOutlinedIcon fontSize="small" /> Add to Cart
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
        <div className="w-full flex items-center justify-center">
          <button
            className={`w-[50vw] capitalize text-white ${
              count === QTY ? "hidden bg-gray-400" : "bg-black"
            } py-2 px-4 rounded-full `}
            onClick={() => {
              setAddProducts((addProducts) => addProducts + 10);
              setCount((count) => count + 1);
            }}
          >
            load more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
