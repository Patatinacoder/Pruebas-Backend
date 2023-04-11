import express from 'express';
import session from 'express-session';
import User from '../models/session.js';
import Product from '../models/product.js';

const sessionRouter = express.Router();

// Configuración de sesión
sessionRouter.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false,
}));

// Redirecciona a la página de login al inicio
sessionRouter.get('/', function(req, res, next) {
  res.redirect('/login');
});

// Página de registro
sessionRouter.get('/register', function(req, res) {
  res.render('register');
});


// Registro de usuario
sessionRouter.post('/register', async function(req, res, next) {
  const { username, password } = req.body;
  const user = new User({ username, password, role: 'user' });
  await user.save();
  res.redirect('/login');
});

// Página de login
sessionRouter.get('/login', function(req, res, next) {
  res.render('login');
});

// Login de usuario
sessionRouter.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  User.findOne({ username, password }, function(err, user) {
    if (err) return next(err);
    if (!user) return res.render('login', { error: 'Credenciales incorrectas' });
    req.session.user = user;
    res.redirect('/products');
  });
});

// Logout de usuario
sessionRouter.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) return next(err);
    res.redirect('/login');
  });
});

// Página de productos
sessionRouter.get('/products', function(req, res, next) {
  // Verifica si el usuario está logueado
  if (!req.session.user) {
    return res.redirect('/login');
  }
  // Si el usuario es admin, muestra todos los productos
  if (req.session.user.role === 'admin') {
    Product.find({}, function(err, products) {
      if (err) return next(err);
      res.render('products', { user: req.session.user, products });
    });
  // Si el usuario no es admin, muestra solo algunos productos
  } else {
    Product.find({ category: 'user' }, function(err, products) {
      if (err) return next(err);
      res.render('products_user', { user: req.session.user, products });
    });
  }
});

  export default sessionRouter