import  express from "express"

import mongoose from "mongoose";
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

const app = express();
import bodyParser from "body-parser";

app.use(bodyParser.json());

import productRouter from "./Routes/productRouter.js";
import cartRouter from "./Routes/cartRouter.js";
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
export default app