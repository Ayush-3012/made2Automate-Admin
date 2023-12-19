import Quagga from "quagga";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UpdateStock = () => {
  const [barcodeData, setBarcodeData] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const startBarcodeScanner = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: 480,
            height: 320,
          },
        },
        decoder: {
          readers: ["code_128_reader"],
        },
      },
      (err) => {
        if (err) {
          console.error("Failed to initialize Quagga:", err);
          return;
        }
        Quagga.start();
        Quagga.onDetected((data) => {
          const barcode = data.codeResult.code;
          setBarcodeData(barcode);
          setShowOptions(true);
          Quagga.stop();
        });
      }
    );
  };

  useEffect(() => {
    startBarcodeScanner();

    return () => {
      Quagga.stop();
      Quagga.offProcessed();
      Quagga.offDetected();
    };
  }, []);

  return (
    <div className="flex flex-col bg-slate-300 py-4 items-center justify-center">
      <div
        id="scanner-container"
        className="h-80 bg-slate-300 flex flex-col"
      ></div>
      {showOptions && (
        <div className="py-4 flex gap-4">
          <Link
            to="/buyProduct"
            state={{ barcode: barcodeData }}
            className="py-2 text-xl self-center font-mono px-14 rounded-xl text-white bg-slate-600 hover:bg-slate-800"
          >
            Buy Product
          </Link>
          <Link
            to="/addToStock"
            state={{ barcode: barcodeData }}
            className="py-2 text-xl self-center font-mono px-14 rounded-xl text-white bg-slate-600 hover:bg-slate-800"
          >
            Add to Stock
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpdateStock;
