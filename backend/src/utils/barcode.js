import { createCanvas } from "canvas";
import JsBarcode from "jsbarcode";
import fs from "fs";

export const generateBarcode = async ({ barcodeDigits }) => {
  const canvas = createCanvas(400, 200);
  JsBarcode(canvas, barcodeDigits);

  const barcodeImageBuffer = canvas.toBuffer("image/png");
  const barcodeLocalPath = `./public/temp/barcode_${barcodeDigits}.png`;
  fs.writeFileSync(barcodeLocalPath, barcodeImageBuffer);

  return { barcodeLocalPath };
};
