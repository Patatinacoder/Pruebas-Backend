import express from "express";
import bodyParser from "body-parser";
import productRouter from "./Routes/productRouter.js";
import cartRouter from "./Routes/cartRouter.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import path from "path";
import  {dirname}  from "path";
import {fileURLToPath }from "url";
import sessionRouter from './Routes/sessionRouter.js'
import passport from "./Routes/passportRouter.js"

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);
app.use('/', sessionRouter)


// Configurar Passport
app.use(passport.initialize());
app.use(passport.session());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
  res.redirect('/login');
});

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to Mongo Atlas'))
  .catch((error) => console.log(error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
