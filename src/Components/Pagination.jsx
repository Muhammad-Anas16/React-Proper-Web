import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";

const BasicPagination = () => {
  const apiItems = useSelector((state) => state.products.products);

  console.log("Products QTY is :", apiItems.length);

  return (
    <button className="w-[100vw] h-[10vh] bg-black text-white">More</button>
  );
}

export default BasicPagination