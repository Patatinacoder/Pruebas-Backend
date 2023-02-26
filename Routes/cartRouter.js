import express from "express"
import { v4 as  uuidv4 } from "uuid"
const cartRouter = express.Router();

const carts = [];

cartRouter.get("/", (req, res) => {
  res.send(carts);
});

cartRouter.get("/:cid", (req, res) => {
  const cart = carts.find((c) => c.id === req.params.cid);
  if (!cart) {
    return res.status(404).send("Carrito no encontrado");
  }
  res.send(cart.products);
});

cartRouter.post("/", (req, res) => {
  const newCart = {
    id: uuidv4(),
    products: [],
  };
  carts.push(newCart);
  res.send(newCart);
});

cartRouter.post("/:cid/product/:pid", (req, res) => {
  const cart = carts.find((c) => c.id == req.params.cid);
  if (!cart) {
    return res.status(404).send("Carrito no encontrado");
  }

  const existingProductIndex = cart.products.findIndex(
    (p) => p.product == req.params.pid
  );
  if (existingProductIndex == -1) {
    cart.products.push({
      product: req.params.pid,
      quantity: 1,
    });
  } else {
    cart.products[existingProductIndex].quantity += 1;
  }

  res.send(cart.products);
});

export default cartRouter