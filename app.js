import  express from "express"
const app = express();
import bodyParser from "body-parser";
import productRouter from "./Routes/productRouter.js";
import cartRouter from "./Routes/cartRouter.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();


app.use(bodyParser.json());
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);



mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to Mongo Atlas'))
  .catch((error) => console.log(error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
export default app