import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    barcodeDigits: {
      type: Number,
      required: true,
      unique: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    barcodeImage: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Sensors", "Controllers", "Switch Gear"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
