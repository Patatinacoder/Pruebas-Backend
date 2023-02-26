import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = {
  getAllProducts: async () => {
    const products = await Product.find({});
    return products;
  },

  getProductById: async (id) => {
    const product = await Product.findById(id);
    return product;
  },

  addProduct: async (newProduct) => {
    const product = new Product(newProduct);
    await product.save();
    return product;
  },

  updateProduct: async (id, updatedProduct) => {
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    return product;
  },

  deleteProduct: async (id) => {
    const product = await Product.findByIdAndDelete(id);
    return product;
  },
};
