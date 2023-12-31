import { Routes, Route } from "react-router-dom";
import NotFound from "./components/partials/NotFound";
import Header from "./components/partials/Header";
import Dashboard from "./components/Home/Dashboard";
import AddProduct from "./components/pages/AddProduct";
import CurrentProduct from "./components/pages/CurrentProduct";
import AllProducts from "./components/pages/AllProducts";
import ListProduct from "./components/pages/ListProduct";
import UpdateStock from "./components/Home/UpdateStock";
import BuyProduct from "./components/Home/BuyProduct";
import AddToStock from "./components/Home/AddToStock";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="/product/:productId" element={<CurrentProduct />} />
        <Route path="/listProduct/:productId" element={<ListProduct />} />
        <Route path="/updateStock" element={<UpdateStock />} />
        <Route path="/addToStock" element={<AddToStock />} />
        <Route path="/buyProduct" element={<BuyProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
