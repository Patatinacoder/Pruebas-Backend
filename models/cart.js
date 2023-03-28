import mongoose from "mongoose";
import express from 'express'

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel' },
      quantity: { type: Number, default: 1 }
    }
  ]
});

export default cartSchema