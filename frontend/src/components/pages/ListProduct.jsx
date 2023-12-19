import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Loader from "../partials/Loader";
import { useParams } from "react-router-dom";
import CurrentProduct from "./CurrentProduct";

/* eslint-disable react/prop-types */
const ListProduct = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [productData, setProductData] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_ROUTE}/product/get-product?id=${productId}`
      )
      .then((res) => {
        setProductData(res.data);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const handleProductListing = async () => {
    setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_ROUTE}/product/list-product`,
        productData
      )
      .then((res) => {
        const { message } = res.data;
        enqueueSnackbar(message, { variant: "success" });
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar("!!! Server Error 404 Not Found !!!", {
          variant: "error",
        });
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-2 flex flex-col gap-4 max-md:px-0 max-md:m-0 max-sm:gap-2">
          <CurrentProduct />
          <div className="flex bg-slate-300 rounded-xl font-mono py-4 items-center justify-center gap-4 max-md:flex-col">
            <h2 className="text-4xl text-gray-800 max-sm:text-2xl">E-Commerce Listing: </h2>
            <button
              onClick={handleProductListing}
              className="text-2xl bg-blue-400 px-4 py-2 rounded-md text-black"
            >
              List To Shopify
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListProduct;
