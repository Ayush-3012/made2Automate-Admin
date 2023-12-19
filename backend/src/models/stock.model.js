import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  totalOrders: {
    type: Number,
    required: true,
  },
  totalStocks: {
    type: Number,
    required: true,
  },
  totalLeads: {
    type: Number,
    required: true,
  },
  totalRevenue: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

export const Stock = mongoose.model("Stock", stockSchema);
