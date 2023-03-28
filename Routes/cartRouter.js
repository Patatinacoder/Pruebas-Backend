import { Router } from 'express';
import Cart  from '../models/cart.js';


const cartRouter = Router()
cartRouter.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cartRouter.post('/:cid/products', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    cart.products.push({
      product: req.body.product,
      quantity: req.body.quantity
    });
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

 cartRouter.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    cart.products.id(req.params.pid).remove();
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

 cartRouter.put('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: req.body }, { new: true });
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
 cartRouter.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    const product = cart.products.id(req.params.pid);
    product.quantity = req.body.quantity;
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

 cartRouter.delete('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.cid);
    res.json({ message: 'Cart has been deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default cartRouter