import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const AllProducts = ({ productData, index }) => {
  return (
    <Link
      to={`/listProduct/${productData._id}`}
      className="bg-slate-100 mx-4 my-2 rounded-md hover:shadow-[1px_1px_10px_rgb(256,256,256)] hover:-translate-y-1 transition ease-in-out duration-200 max-sm:mx-1"
    >
      <div className="mx-2 py-2 flex cursor-pointer items-center gap-2 max-md:flex-col">
        <div className="flex justify-center items-center gap-2 font-mono flex-2 max-md:flex-col">
          <h4 className="text-slate-900 text-2xl max-sm:text-xl">
            {index + 1}.
          </h4>
          <div className="w-28 h-28">
            <img src={productData.productImage} className="w-full h-full " />
          </div>
        </div>
        <div className="flex gap-2 flex-col flex-1">
          <h2 className="text-2xl  text-slate-900 max-sm:text-xl">
            Name: {productData.name}
          </h2>
          <h2 className="text-xl text-slate-900 max-sm:text-lg">
            {productData.description.split(" ").slice(0, 15).join(" ") + "..."}
          </h2>
          <div className="flex justify-evenly">
            <h2 className="text-lg flex items-center gap-1  text-slate-900">
              Manufacturer: {productData.manufacturer}
            </h2>
            <h2 className="text-lg flex items-center gap-1 text-slate-900">
              Price (per piece): {productData.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AllProducts;
