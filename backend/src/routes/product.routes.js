import { Router } from "express";
import { addProdut } from "../controllers/product.controller";


const productRouter = Router();

productRouter.route("/add-product").post(addProdut);
// productRouter.route("/get-prodcut").get();

export default productRouter;
