import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../Redux/product/ProductSlice";
import { customProductData } from "../Components/CustomProduct/cutomProductsData";

export const Shop = () => {

    const dispatch = useDispatch();

    const arr = ["https://api.escuelajs.co/api/v1/categories", "https://api.escuelajs.co/api/v1/products"]

    const { data, isSuccess } = useQuery({
        queryKey: ["Shop"],
        queryFn: () => fetch(`${arr[1]}`).then((res) => res.json())
    })

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setProducts(data));
        }
    }, [isSuccess, data, dispatch]);
}