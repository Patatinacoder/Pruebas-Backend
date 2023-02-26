import express from "express";
import ProductManager from "../controllers/ProductManager.js";

const productManager = new ProductManager();
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const products = await productManager.getProducts();
    if (limit) {
      res.send(products.slice(0, limit));
    } else {
      res.send(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al obtener productos." });
  }
});

productRouter.get("/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al obtener producto." });
  }
});

productRouter.post("/add", async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      thumbnails,
      
    } = req.body;
    const newProduct = await productManager.addProduct({
      title,
      description,
      code,
      price,
      status: true,
      stock: 0,
      thumbnails
    });
    res.send(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al agregar producto." });
  }
});

productRouter.delete("/:pid", async (req, res) => {
  try {
    await productManager.deleteProduct(req.params.pid);
    res.send({ message: "Producto eliminado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al eliminar producto." });
  }
});

 productRouter.put("/:pid", (req, res) => {
  const pid = req.params.pid;
  const updatedProduct = req.body;
  
  const productIndex = products.findIndex((p) => p.id === pid);

  if (productIndex === -1) {
    return res.status(404).send({ message: "Product not found" });
  }

  for (const key in updatedProduct) {
    if (key !== "id") {
      products[productIndex][key] = updatedProduct[key];
    }
  }

  res.send(products[productIndex]);
});

productRouter.delete("/:pid", (req, res) => {
  const pid = req.params.pid;

  const productIndex = products.findIndex((p) => p.id == pid);

  if (productIndex == -1) {
    return res.status(404).send({ message: "Product not found" });
  }

  products.splice(productIndex, 1);

  res.send({ message: "Product deleted successfully" });
});


export default productRouter;
