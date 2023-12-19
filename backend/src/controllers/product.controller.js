import { Product } from "../models/product.models.js";
import { generateBarcode } from "../utils/barcode.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import axios from "axios";

export const getProduct = async (req, res) => {
  const { id } = req.query;
  await Product.findById({ _id: id })
    .then((found) => {
      return res.status(201).json(found);
    })
    .catch(() => {
      return res.status(400).json({ message: "Server Error" });
    });
};

export const getAllProduct = async (req, res) => {
  await Product.find({})
    .then((found) => {
      return res.status(201).json(found);
    })
    .catch(() => {
      return res.status(400).json({ message: "Server Error" });
    });
};

export const addProduct = async (req, res) => {
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

    const { barcodeLocalPath, barcodeDigits } = await generateBarcode();
    if (!barcodeLocalPath)
      res.status(400).json({ message: "Barcode not found" });

    const productImage = await uploadOnCloudinary(imageLocalPath);
    const barcodeImage = await uploadOnCloudinary(barcodeLocalPath);

    const newProduct = await Product.create({
      productImage: productImage.url,
      barcodeImage: barcodeImage.url,
      barcodeDigits,
      name,
      productId,
      manufacturer,
      description,
      quantity,
      price,
      category,
    });

    const createdProduct = await Product.findById(newProduct._id);

    return res
      .status(201)
      .json({ message: "Product Added Successfully", createdProduct });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const listProduct = async (req, res) => {
  const productData = {
    product: {
      title: req.body.name,
      body_html: req.body.description,
      vendor: req.body.manufacturer,
      product_type: req.body.category,
      variants: [
        {
          price: req.body.price,
          quantity: req.body.quantity,
        },
      ],
      images: [
        {
          src: req.body.productImage,
        },
      ],
    },
  };

  axios
    .post(
      `https://${process.env.SHOPIFY_SHOP_URI}/admin/api/2023-10/products.json`,
      productData,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    )
    .then(() => {
      return res.status(201).json({ message: "Product listed successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "Error while listing product" });
    });
};
