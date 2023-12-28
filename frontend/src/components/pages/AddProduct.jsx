// import Loader from "../partials/Loader"
import { useState } from "react";
import axios from "axios";
import ImageUpload from "../partials/ImageUpload";
import { useSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../partials/Loader";

const AddProduct = () => {
  const categories = ["Sensors", "Controllers", "Switch Gear"];
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    productId: "",
    price: 0,
    description: "",
    manufacturer: "",
    quantity: 0,
    category: "",
  });
  const navigator = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  let barcode = location.state;

  if (!barcode) {
    const min = Math.pow(10, 11);
    const max = Math.pow(10, 12) - 1;
    barcode = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setProduct(() => {
      return {
        ...product,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!uploadedFile) {
      enqueueSnackbar("Product Image is Missing", { variant: "info" });
    }

    const formData = new FormData();
    formData.append("productImage", uploadedFile);
    formData.append("name", product.name);
    formData.append("productId", product.productId);
    formData.append("manufacturer", product.manufacturer);
    formData.append("description", product.description);
    formData.append("quantity", product.quantity);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("barcodeDigits", barcode);

    await axios
      .post(`${import.meta.env.VITE_API_ROUTE}/product/add-product`, formData)
      .then((res) => {
        const { message, createdProduct } = res.data;
        enqueueSnackbar(message, { variant: "success" });
        navigator(`/product/${createdProduct._id}`);
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
      <div className="rounded-md font-mono bg-slate-200">
        <div className="py-2 text-center mx-2 border-b-black border-2 text-slate-800 text-4xl max-md:text-3xl">
          Add Product
        </div>
        {loading ? (
          <Loader />
        ) : (
          <form
            onSubmit={(e) => onSubmit(e)}
            className="flex flex-col gap-2 py-2 items-center"
          >
            <ImageUpload onFileChange={(file) => setUploadedFile(file)} />
            <div className="flex w-3/5 gap-4 max-lg:flex-col max-md:w-5/6">
              <div className="p-2  rounded-md bg-slate-300 flex flex-col gap-1 w-full">
                <label className="">Product Name: </label>
                <input
                  type="text"
                  required
                  className="form-control mx-4 p-2 rounded-md font-mono focus:border focus:border-slate-600 outline-none"
                  placeholder="Enter Product Name"
                  name="name"
                  value={product.name ?? ""}
                  onChange={onChangeData}
                />
              </div>
              <div className="p-2  rounded-md bg-slate-300 flex flex-col gap-1 w-full">
                <label className="">Product Id: </label>
                <input
                  type="text"
                  required
                  className="form-control mx-4 p-2 rounded-md font-mono focus:border focus:border-slate-600 outline-none"
                  placeholder="Enter Product Id"
                  name="productId"
                  value={product.productId ?? ""}
                  onChange={onChangeData}
                />
              </div>
              <div className="p-2  rounded-md bg-slate-300 flex flex-col gap-1 w-full">
                <label className="">Price: </label>
                <input
                  type="number"
                  min={0}
                  required
                  className="form-control mx-4 p-2 rounded-md font-mono focus:border focus:border-slate-600 outline-none"
                  placeholder="Enter Product Id"
                  name="price"
                  value={product.price ?? ""}
                  onChange={onChangeData}
                />
              </div>
            </div>
            <div className="p-2  rounded-md bg-slate-300 flex flex-col gap-1 w-3/5 max-md:w-5/6">
              <label className="">Product Description: </label>
              <input
                type="text"
                required
                className="form-control mx-4 p-2 rounded-md font-mono focus:border focus:border-slate-600 outline-none"
                placeholder="Enter Product Description"
                name="description"
                value={product.description ?? ""}
                onChange={onChangeData}
              />
            </div>
            <div className="flex w-3/5 gap-4 max-lg:flex-col max-md:w-5/6">
              <div className="p-2  rounded-md bg-slate-300 flex flex-col gap-1 w-full">
                <label className="">Manufacturer Name: </label>
                <input
                  type="text"
                  required
                  className="form-control mx-4 p-2 rounded-md font-mono focus:border focus:border-slate-600 outline-none"
                  placeholder="Enter Name of Manufacturer"
                  name="manufacturer"
                  value={product.manufacturer ?? ""}
                  onChange={onChangeData}
                />
              </div>
              <div className="p-2 rounded-md bg-slate-300 flex flex-col gap-1 w-full">
                <label className="">Quantity: </label>
                <input
                  type="number"
                  required
                  className="form-control mx-4 p-2 rounded-md font-mono focus:border focus:border-slate-600 outline-none"
                  placeholder="Quantity"
                  name="quantity"
                  min={0}
                  value={product.quantity ?? ""}
                  onChange={onChangeData}
                />
              </div>
            </div>
            <div className="p-2 gap-1 rounded-md bg-slate-300 flex flex-col w-3/5 max-md:w-5/6">
              <label className="">Product Category: </label>
              <select
                required
                className="form-control mx-4 form-control p-2 rounded-md font-mono focus:border focus:border-slate-600 outline-none"
                name="category"
                value={product.category ?? ""}
                onChange={onChangeData}
              >
                <option disabled value="">
                  Select Category
                </option>
                {categories.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="submit"
              className="py-4 text-3xl self-center font-mono px-14 rounded-xl text-white bg-slate-600 hover:bg-slate-800 max-sm:text-2xl"
            >
              Add Product
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default AddProduct;
