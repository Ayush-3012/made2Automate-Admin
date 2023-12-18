import { Router } from "express";
import { addProdut } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter
  .route("/add-product")
  .post(upload.fields([{ name: "productImage", maxCount: 1 }]), addProdut);
// productRouter.route("/get-prodcut").get();

export default productRouter;
