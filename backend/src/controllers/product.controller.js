import { Product } from "../models/product.models.js";
import { Stock } from "../models/stock.model.js";
import { generateBarcode } from "../utils/barcode.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import axios from "axios";

export const getProduct = async (req, res) => {
  const { id } = req.query;
  try {
    if (id.length > 12) {
      const foundById = await Product.findOne({ _id: id });
      return res.status(201).json(foundById);
    } else if (id.length === 12) {
      const foundByBarcode = await Product.findOne({ barcodeDigits: id });
      return res.status(201).json(foundByBarcode);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Server Error" });
  }
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
      barcodeDigits,
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

    const { barcodeLocalPath } = await generateBarcode({ barcodeDigits });
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
    await Stock.create({
      productId: newProduct._id,
      totalOrders: 0,
      totalStocks: newProduct.quantity,
      totalLeads: 0,
      totalRevenue: 0,
    });
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

export const getUpdatedStock = async (req, res) => {
  await Stock.find()
    .then((found) => {
      return res.status(201).json(found);
    })
    .catch(() => {
      return res.status(400).json({ message: "Server Error" });
    });
};

export const addToStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const foundProduct = await Product.findOne({ _id: productId });
    const newQuantity = foundProduct.quantity + Number(quantity);

    await Product.findOneAndUpdate(
      { _id: foundProduct._id },
      { $set: { quantity: newQuantity } },
      { new: true }
    );

    const found = await Stock.findOne({ productId });
    await Stock.findOneAndUpdate(
      { productId: foundProduct._id },
      {
        $set: {
          totalStocks: newQuantity,
        },
      }
    );
    return res.status(201).json({ message: "Stock Updated" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const updateStock = async (req, res) => {
  const { productId, totalOrders, totalLeads, totalRevenue } = req.body;

  const found = await Stock.findOne({ productId });
  await Stock.findOneAndUpdate(
    { _id: found._id },
    {
      $set: {
        totalOrders: found.totalOrders + totalOrders,
        totalStocks: found.totalStocks - totalOrders,
        totalLeads: totalLeads,
        totalRevenue: found.totalRevenue + totalRevenue,
      },
    },
    { new: true }
  );

  await Product.findOneAndUpdate(
    { _id: productId },
    { $set: { quantity: found.totalStocks - totalOrders } },
    { new: true }
  );
  return res.status(201).json({ message: "Stock Updated" });
};
