import { Router } from 'express';
import Product from '../models/product.js';
import cartSchema from '../models/cart.js';
// import { isValidObjectId } from 'mongoose';


const productRouter = Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los productos');
  }
});

productRouter.get('/products', async (req, res) => {
  const perPage = 5;
  const page = req.query.page || 1;
  try {
    const products = await Product.find()
      .skip((perPage * page) - perPage)
      .limit(perPage);
    const count = await Product.countDocuments();
    res.render('products', {
      products,
      current: page,
      pages: Math.ceil(count / perPage)
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los productos');
  }
});

productRouter.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  // if (!isValidObjectId(productId)) {
  //   return res.status(400).send('ID de producto inválida');
  // }
  try {
    const product = await Product.findById(productId);
    if (!product) {

      //agregar res.render a details en ejs
      return res.status(404).send('Producto no encontrado');
    }
    res.status(200).send(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el producto');
  }
});


productRouter.post("/add", async (req, res) => {
  const { title, price, description, stock, category} = req.body;
  const product = new Product({ title, price, description, stock, category});
  const newProduct = await product.save(); // Guarda el nuevo producto y obtiene el objeto con el id asignado
res.status(200).send({message: 'Producto agregado con éxito', product: newProduct});
});


// productRouter.get('/carts/:cid', async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const cart = await cartSchema.findById(cartId).populate('products.product');
//     const products = cart.products.map(p => {
//       const item = p.product;
//       item.quantity = p.quantity;
//       return item;
//     });
//     res.render('cart', { products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error al obtener el carrito');
//   }
// });

// productRouter.delete("/:pid", async (req, res) => {
//   try {
//     await Product.deleteProduct(req.params.pid);
//     res.send({ message: "Producto eliminado exitosamente." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Error al eliminar producto." });
//   }
// });

// productRouter.put("/:pid", async (req, res) => {
//   const productId = req.params.pid;
//   const { title, price, description, stock, category } = req.body;

//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       { title, price, description, stock, category },
//       { new: true }
//     );
//     if (!updatedProduct) {
//       return res.status(404).send({ message: "Product not found" });
//     }
//     res.send(updatedProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Error updating product" });
//   }
// });



export default productRouter;
