import express from "express";
import ProductManager from "../controllers/ProductManager.js";
import productSchema from '../models/product.js'
import bodyParser from "body-parser";


const productManager = new ProductManager();
const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  productSchema
.find()
.then((data)=> res.json(data))
.catch((error)=> res.json(error))
});

productRouter.get("/:pid", (req, res) => { 
const { pid } = req.params;
productSchema
.findById(pid)
.then((data) =>res.json (data))
.catch((error)=> res.json(error))
});

productRouter.post("/add", (req, res) => {
  const product = new productSchema(req.body);
  product.save()
    .then(() => res.json(product))
    .catch((error) => res.json({ message: error }));
});

  

 productRouter.put("/:pid", (req, res) => {
  const {pid} = req.params;
  const {title, description, price, stock, category} = req.body;
  productSchema
  .updateOne({ _id: pid}, {$set : {title, description, price, stock, category} })
  .then((data)=> res.json (data))
  .catch((error)=> res.json(error))
});


productRouter.delete("/:pid", (req, res) => {
  const {pid} = req.params;
  productSchema
  .deleteOne( { _id: pid})
  .then((data)=> res.json (data))
  .catch((error)=> {
    console.log(error);
    res.json(error);
  })});

  


export default productRouter;
