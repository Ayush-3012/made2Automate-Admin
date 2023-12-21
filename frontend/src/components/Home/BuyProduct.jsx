import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../partials/Loader";

const BuyProduct = () => {
  const location = useLocation();
  const { barcode } = location.state;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_ROUTE}/product/get-product?id=${barcode}`
      )
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [barcode]);

  const handlePlaceOrder = async (e) => {
    setLoading(true);
    e.preventDefault();
    const boughtItem = {
      productId: product._id,
      totalOrders: Number(quantity),
      totalStocks: product.quantity - quantity,
      totalLeads: Math.trunc(product.quantity / quantity),
      totalRevenue: quantity * product.price,
    };

    await axios
      .post(`${import.meta.env.VITE_API_ROUTE}/product/updateStock`, boughtItem)
      .then((res) => {
        const { message } = res.data;
        enqueueSnackbar(message, { variant: "success" });
        navigator(`/`);
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
      {product ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <form
              className="flex px-4 py-4 justify-center items-center bg-slate-300 rounded-xl gap-5 max-lg:flex-col max-md:gap-2"
              onSubmit={(e) => handlePlaceOrder(e)}
            >
              <div className="border w-1/5 max-sm:w-72">
                <img src={product.productImage} className="h-full w-full" />
              </div>
              <div className=" flex flex-col font-mono gap-4 px-2 py-4 items-center max-md:px-0">
                <div className="flex w-full justify-evenly gap-4 max-lg:flex-col ">
                  <div className="p-2  rounded-md bg-slate-400 flex flex-col gap-1">
                    <span>
                      Product Name:{" "}
                      <span className="font-bold text-red-900">
                        {product.name}
                      </span>
                    </span>
                  </div>
                  <div className="p-2  rounded-md bg-slate-400 flex flex-col gap-1 ">
                    <span>
                      Product Id:{" "}
                      <span className="font-bold text-red-900">
                        {product.productId}
                      </span>
                    </span>
                  </div>
                  <div className="p-2 rounded-md bg-slate-400 flex flex-col gap-1">
                    <span>
                      Price (per piece):{" "}
                      <span className="font-bold text-red-900">
                        {product.price}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="p-2  rounded-md bg-slate-400 flex flex-col gap-1">
                  <span>
                    Product Description:{" "}
                    <span className="font-bold text-red-900">
                      {product.description}
                    </span>
                  </span>
                </div>
                <div className="flex w-full justify-evenly gap-4 max-lg:flex-col ">
                  <div className="p-2  flex items-center rounded-md bg-slate-400">
                    <span>
                      Manufacturer Name:{" "}
                      <span className="font-bold text-red-900">
                        {product.manufacturer}
                      </span>
                    </span>
                  </div>
                  <div className="p-2 rounded-md bg-slate-400 flex items-center gap-1">
                    <label>Set Quantity: </label>
                    <input
                      type="number"
                      required
                      className="form-control mx-4 p-2 rounded-md font-mono focus:border focus:border-slate-600 outline-none"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min={0}
                    />
                  </div>
                  <div className="p-2  flex items-center rounded-md bg-slate-400">
                    <span>
                      Total Bill:{" "}
                      <span className="font-bold text-red-900">
                        ₹{quantity * product.price}
                      </span>
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="py-4 text-3xl self-center font-mono px-14 rounded-xl text-white bg-slate-600 hover:bg-slate-800 max-sm:text-2xl"
                >
                  Place Order
                </button>
              </div>
            </form>
          )}
        </>
      ) : (
        <div className="mt-4 shadow-[1px_1px_20px_rgb(0,0,0)] h-[85vh] flex flex-col items-center justify-center px-10 bg-slate-300 mx-4 rounded-md max-sm:mx-2">
          <h1 className="text-5xl mb-4 text-slate-700 my-4">
            Product Not Found
          </h1>
        </div>
      )}
    </>
  );
};

export default BuyProduct;
