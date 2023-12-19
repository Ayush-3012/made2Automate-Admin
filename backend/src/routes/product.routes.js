import { Router } from "express";
import {
  addProduct,
  getAllProduct,
  getProduct,
  listProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter.route("/get-product").get(getProduct);
productRouter.route("/getAllProduct").get(getAllProduct)
productRouter
  .route("/add-product")
  .post(upload.fields([{ name: "productImage", maxCount: 1 }]), addProduct);
productRouter.route("/list-product").post(listProduct);

export default productRouter;
