import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { Stack, Pagination, PaginationItem } from "@mui/material";
import { addToCart } from "../Firebase/firebaseFunctions";

const Product = () => {
  const { category } = useParams();
  const [initialProducts, setInitialProducts] = useState(0); // Initial Products
  const [addProducts, setAddProducts] = useState(10); // Initial + 10 Products
  const [page, setPage] = useState(1); // Page number for pagination

  const userLogin = useSelector((state) => state.IsLogin.IsLogin); // Checking User in Login or Not
  const allProducts = useSelector(
    (state) => state.customProducts.customProducts
  ); // Custom hard Coded Products I store in Rudux

  const filterCategory = allProducts.filter(
    // if category passed if not show all produ0cts
    (item) => item?.category === category
  );
  const products = category
    ? filterCategory
    : allProducts.slice(initialProducts, addProducts);

  const QTY = Math.ceil(
    (category ? filterCategory.length : allProducts.length) / 10
  ); // Total Products QTY

  const handlePageChange = (event, value) => {
    setPage(value);
    setInitialProducts((value - 1) * 10);
    setAddProducts(value * 10);
  };

  const HandleAddToCart = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.images[0],
        quantity: 1,
      });
      // Optionally show a toast/notification here
    } catch (err) {
      // Optionally show an error notification
      console.error("Add to cart error:", err);
    }
  };

  // console.log(page);

  const mode = useSelector((state) => state.theme.mode);

  return (
    <section
      className={`body-font border ${
        mode === "dark"
          ? "bg-gray-900 text-gray-100 border-gray-700"
          : "bg-white text-gray-600 border-gray-300"
      }`}
    >
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((item, index) => (
            <Link
              key={index}
              to={userLogin ? `/${item.id}` : "/auth"}
              className="w-full p-5"
            >
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
                {userLogin && (
                  <button
                    onClick={(e) => HandleAddToCart(e, item)}
                    className="absolute bottom-0 right-0 left-0 bg-black bg-opacity-80 text-white px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <LocalGroceryStoreOutlinedIcon fontSize="small" /> Shop Now
                  </button>
                )}
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
          ))}
        </div>

        <Stack spacing={3} alignItems={"center"}>
          <Pagination
            count={QTY}
            page={page}
            onChange={handlePageChange}
            size="large"
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                disabled={
                  (item.type === "previous" && initialProducts === 0) ||
                  (item.type === "next" && page === QTY)
                }
                sx={{
                  color: mode === "light" ? "black" : "white",
                }}
              />
            )}
          />
        </Stack>
      </div>
    </section>
  );
};

export default Product;
