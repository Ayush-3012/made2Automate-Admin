import { Link } from "react-router-dom";
import { MdAddShoppingCart, MdQrCodeScanner } from "react-icons/md";
// import { startBarcodeScanner } from "./BarcodeScanner";

const Header = () => {
  return (
    <div className="flex z-10 bg-slate-300 justify-between px-4 items-center m-1 rounded-md text-5xl py-2 sticky top-0 max-md:flex-col max-md:justify-center max-md:text-4xl max-sm:text-3xl max-md:m-0 max-md:mb-2 max-md:rounded-none">
      <Link
        to="/"
        className="text-3xl  text-slate-700 font-extrabold font-serif max-md:text-2xl max-sm:text-xl"
      >
        Made 2 Automate - Admin
      </Link>
      <div className="flex gap-4">
      <Link
        to="/updateStock"
        className="text-4xl text-slate-900 text-center font-serif max-md:text-xl max-sm:text-lg"
      >
        <MdQrCodeScanner />
        </Link>
        <Link
          to="/addProduct"
          className="text-4xl text-slate-900 text-center font-serif max-md:text-xl max-sm:text-lg"
        >
          <MdAddShoppingCart />
        </Link>
        </div>
    </div>
  );
};

export default Header;
