/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

const productContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState(sessionStorage.getItem("currentProduct") || null);

  useEffect(() => {
    sessionStorage.setItem("currentProduct", currentProduct);
  }, [currentProduct]);

  const value = { currentProduct, setCurrentProduct };
  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => useContext(productContext);
