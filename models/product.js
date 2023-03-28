import mongoose from "mongoose";
import  Express  from "express";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Product', productSchema);