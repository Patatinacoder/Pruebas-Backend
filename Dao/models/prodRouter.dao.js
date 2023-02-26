import { express } from "express";
import { router } from "express";
const Product = require("./product.model");
const productDao = require("./dao/product.dao");
const fs = require("fs");


router.get("/", async (req, res) => {
  try {
    const products = await productDao.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

router.post("/", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });
    const newProduct = await productDao.createProduct(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  try {
    const updatedProduct = await productDao.updateProduct(res.product);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getProduct, async (req, res) => {
  try {
    await productDao.deleteProduct(res.product);
    fs.unlink(`./uploads/${res.product.image}`, (err) => {
      if (err) throw err;
      console.log("File is deleted.");
    });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProduct(req, res, next) {
  let product;
  try {
    product = await productDao.getProductById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
