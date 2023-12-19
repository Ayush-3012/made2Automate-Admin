import { useEffect, useState } from "react";
import AllProducts from "../pages/AllProducts";
import axios from "axios";
import StockDetails from "./StockDetails";

const Dashboard = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_ROUTE}/product/getAllProduct`)
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-slate-300 mx-4 rounded-md">
      <StockDetails />
      <hr className="border border-black" />
      <div className="flex flex-col gap-2 max-md:gap-1">
        <span className="mx-8 text-4xl">Products : </span>
        {allProducts?.map((result, index) => (
          <AllProducts key={result._id} index={index} productData={result} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
