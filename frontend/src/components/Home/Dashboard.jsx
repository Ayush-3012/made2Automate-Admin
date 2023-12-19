import { useEffect, useState } from "react";
import AllProducts from "../pages/AllProducts";
import axios from "axios";

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
    <div>
      <div className="flex flex-col gap-2 max-md:gap-1">
        {allProducts?.map((result, index) => (
          <AllProducts key={result._id} index={index} productData={result} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
