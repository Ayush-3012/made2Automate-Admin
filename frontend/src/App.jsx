import { Routes, Route } from "react-router-dom";
import NotFound from "./components/partials/NotFound";
import Header from "./components/partials/Header";
import Dashboard from "./components/Home/Dashboard";
import AddProduct from "./components/pages/AddProduct";
import CurrentProduct from "./components/pages/CurrentProduct";
import AllProducts from "./components/pages/AllProducts";
import ListProduct from "./components/pages/ListProduct";
import { ProductContextProvider } from "./context/ProductContext";

const App = () => {
  return (
    <ProductContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/product" element={<CurrentProduct />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="/listProduct/:productId" element={<ListProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProductContextProvider>
  );
};

export default App;
