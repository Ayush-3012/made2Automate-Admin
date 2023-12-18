import { Product } from "../models/product.models.js";
import { generateBarcode } from "../utils/barcode.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addProdut = async (req, res) => {
  try {
    const {
      name,
      productId,
      manufacturer,
      description,
      quantity,
      price,
      category,
    } = req.body;

    if (
      [
        name,
        productId,
        manufacturer,
        description,
        quantity,
        price,
        category,
      ].some((field) => field?.trim() === "")
    ) {
      res.status(400).json({ message: "All fields are required" });
    }

    const imageLocalPath = req.files?.productImage[0]?.path;
    if (!imageLocalPath) res.status(400).json({ message: "Image not found" });

    const barcodeLocalPath = await generateBarcode();
    if (!barcodeLocalPath)
      res.status(400).json({ message: "Barcode not found" });

    // const productImage = await uploadOnCloudinary(imageLocalPath);
    // const barcodeImage = await uploadOnCloudinary(barcodeLocalPath);

    // const newProduct = await Product.create({
    //   productImage: productImage.url,
    //   barcodeImage: barcodeImage.url,
    //   name,
    //   productId,
    //   manufacturer,
    //   description,
    //   quantity,
    //   price,
    //   category,
    // });

    // return res
    //   .status(201)
    //   .json({ message: "Product Added Successfully", newProduct });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};
