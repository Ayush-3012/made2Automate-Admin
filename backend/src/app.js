import express from "express";
import cors from "cors";
import productRouter from "./routes/product.routes.js";

const app = express();

app.use(cors());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json("Hello Welcome"));

app.use("/api/v1/product", productRouter);

export default app;
