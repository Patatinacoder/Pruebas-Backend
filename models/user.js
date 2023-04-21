import mongoose from "mongoose";
import { Schema } from 'mongoose'


const UserSchema = new mongoose.Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    } ,
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    role:{
        type: String,
        default: 'user'
    }
});


export default mongoose.model('User', UserSchema);