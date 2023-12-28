import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CurrentProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState({});

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
  return (
    <>
      <div className="px-2 flex flex-col gap-4 max-md:px-0 max-md:m-0 max-sm:gap-2">
        <div className="flex justify-evenly items-center bg-slate-300 rounded-xl gap-5 max-md:flex-col max-md:gap-2">
          <div className="px-10 py-5 flex-2 w-96 max-sm:w-72">
            <img
              src={productData.productImage}
              className="rounded-ss-xl rounded-ee-xl shadow-[1px_1px_20px_rgb(0,0,0)]"
            />
          </div>
          <div className="flex gap-4 flex-col font-serif p-5 flex-1">
            <div className="flex items-center justify-evenly max-sm:flex-col">
              <div className="flex gap-2 px-2 items-center">
                <h2 className="my-1 pr-4 text-4xl text-slate-800 font-serif max-md:text-3xl max-sm:text-2xl">
                  Name: {productData.name}
                </h2>
              </div>
              <div className="flex gap-1 px-2 items-center">
                <h2 className="text-2xl text-gray-800 max-sm:text-xl">
                  ProductID: {productData.productId}
                </h2>
              </div>
            </div>
            <hr className="border-black border" />
            <div>
              <h2 className="text-2xl text-gray-800 max-sm:text-xl">
                Description: {productData.description}
              </h2>
            </div>
            <hr className="border-black border" />
            <div className="flex items-center justify-evenly max-sm:flex-col">
              <div className="flex items-center justify-center pr-4 gap-2 ">
                <h2 className="text-xl text-gray-800">
                  Manufacturer: {productData.manufacturer}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-xl text-gray-800">
                  Price (per piece): {productData.price}
                </h2>
              </div>
            </div>
            <hr className="border-black border" />
            <div className="flex items-center justify-evenly max-sm:flex-col">
              <div className="flex items-center justify-center pr-4 gap-2 ">
                <h2 className="text-xl text-gray-800">
                  Quantity: {productData.quantity}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-xl text-gray-800">
                  Category: {productData.category}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-4 px-8 bg-slate-300 rounded-xl justify-evenly items-center gap-5 max-md:flex-col max-md:gap-2">
          <div className="py-2 flex-2 ">
            <img
              src={productData.barcodeImage}
              className="rounded-ss-xl rounded-ee-xl shadow-[1px_1px_20px_rgb(0,0,0)]"
            />
          </div>
          <div className="flex gap-4 font-mono flex-1 items-center justify-evenly max-sm:flex-col">
            <div className="flex items-center justify-center pr-4 gap-2 ">
              <button
                onClick={() => {
                  const printWindow = window.open("", "_blank");
                  printWindow.document.write(
                    `<img src="${productData.barcodeImage}" />`
                  );
                  printWindow.document.close();
                  printWindow.print();
                }}
                className="text-xl bg-blue-400 px-4 py-2 rounded-md text-black hover:bg-blue-600"
              >
                Print Barcode
              </button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = productData.barcodeImage;
                  link.download = "barcode.png";
                  link.click();
                }}
                className="text-xl bg-blue-400 px-4 py-2 rounded-md text-black hover:bg-blue-600"
              >
                Save to Device
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentProduct;
