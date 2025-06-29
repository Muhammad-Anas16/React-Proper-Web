import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { Stack, Pagination, PaginationItem } from "@mui/material";

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

  // const HandleNextPagination = () => {
  //   setPage((prev) => prev + 1);
  //   setInitialProducts((prev) => prev + 10);
  //   setAddProducts((prev) => prev + 10);
  // };

  // const HandleBeforePagination = () => {
  //   setPage((prev) => prev - 1);
  //   setInitialProducts((prev) => prev - 10);
  //   setAddProducts((prev) => prev - 10);
  // };

  const handlePageChange = (event, value) => {
    setPage(value);
    setInitialProducts((value - 1) * 10);
    setAddProducts(value * 10);
  };

  // console.log(page);

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
              />
            )}
          />
        </Stack>
      </div>
    </section>
  );
};

export default Product;
