import axios from "axios";
import { useEffect, useState } from "react";

const StockDetails = () => {
  const [stockInfo, setStockInfo] = useState({
    totalOrders: 0,
    totalStocks: 0,
    totalLeads: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_ROUTE}/product/getUpdatedStock`)
      .then((res) => {
        const updatedInfo = res.data.reduce(
          (accumulator, currentItem) => {
            accumulator.totalOrders += currentItem.totalOrders || 0;
            accumulator.totalStocks += currentItem.totalStocks || 0;
            accumulator.totalLeads += currentItem.totalLeads || 0;
            accumulator.totalRevenue += currentItem.totalRevenue || 0;
            return accumulator;
          },
          {
            totalOrders: 0,
            totalStocks: 0,
            totalLeads: 0,
            totalRevenue: 0,
          }
        );
        setStockInfo(updatedInfo);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="grid px-8 py-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-center items-center">
      <div className="flex flex-col font-mono  bg-blue-600 justify-center items-center py-8 rounded-lg hover:bg-slate-600">
        <span className="text-4xl text-rose-500 font-bold">
          {stockInfo.totalOrders}
        </span>
        <span className="text-2xl text-amber-500 font-bold">Total Orders</span>
      </div>
      <div className="flex flex-col font-mono  bg-blue-600 justify-center items-center py-8 rounded-lg hover:bg-slate-600">
        <span className="text-4xl text-rose-500 font-bold">
          {stockInfo.totalStocks}
        </span>
        <span className="text-2xl text-amber-500 font-bold">Total Stocks</span>
      </div>
      <div className="flex flex-col font-mono  bg-blue-600 justify-center items-center py-8 rounded-lg hover:bg-slate-600">
        <span className="text-4xl text-rose-500 font-bold">100</span>
        <span className="text-2xl text-amber-500 font-bold">Dead Stocks</span>
      </div>
      <div className="flex flex-col font-mono  bg-blue-600 justify-center items-center py-8 rounded-lg hover:bg-slate-600">
        <span className="text-4xl text-rose-500 font-bold">
          {stockInfo.totalLeads}
        </span>
        <span className="text-2xl text-amber-500 font-bold">Total Leads</span>
      </div>
      <div className="flex flex-col font-mono bg-blue-600 justify-center items-center py-8 rounded-lg hover:bg-slate-600">
        <span className="text-4xl text-rose-500 font-bold">
          {stockInfo.totalRevenue}
        </span>
        <span className="text-2xl text-amber-500 font-bold">Total Revenue</span>
      </div>
    </div>
  );
};

export default StockDetails;
