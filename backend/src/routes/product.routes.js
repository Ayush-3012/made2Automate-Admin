import { Router } from "express";
import {
  addProduct,
  getAllProduct,
  getProduct,
  getUpdatedStock,
  listProduct,
  updateStock,
  addToStock,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter.route("/get-product").get(getProduct);
productRouter.route("/getAllProduct").get(getAllProduct);
productRouter.route("/getUpdatedStock").get(getUpdatedStock);
productRouter
  .route("/add-product")
  .post(upload.fields([{ name: "productImage", maxCount: 1 }]), addProduct);
productRouter.route("/list-product").post(listProduct);
productRouter.route("/updateStock").post(updateStock);
productRouter.route("/addToStock").patch(addToStock);

export default productRouter;
