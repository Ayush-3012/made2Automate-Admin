import { createCanvas } from "canvas";
import JsBarcode from "jsbarcode";
import fs from "fs";

export const generateBarcode = async () => {
  const min = Math.pow(10, 11); 
  const max = Math.pow(10, 12) - 1;
  const barcodeDigits = Math.floor(Math.random() * (max - min + 1)) + min;

  const canvas = createCanvas(400, 200);
  JsBarcode(canvas, barcodeDigits);

  const barcodeImageBuffer = canvas.toBuffer("image/png");
  const filePath = `./public/temp/barcode_${barcodeDigits}.png`;
  fs.writeFileSync(filePath, barcodeImageBuffer);

  return filePath;
};
