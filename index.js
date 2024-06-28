import express from "express";
import productRouter from "./routes/products.routes.js"

import { config } from "dotenv";


const app = express();
app.use(express.json())
app.use("/products",productRouter)
config()

app.listen(8080,()=> {
  console.log("App running on port 8080")
}) 