import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
     title: {
    type: String,
    required: true
     }  ,

     price: {
        type: Number,
        required: true
     },

     description: {
        type: String,
        required: true
     },

     stock: {
        type: Number,
        required: true
     },

     category: {
        type: String,
        required:true
     }

    }
)

export default mongoose.model('Product', productSchema)