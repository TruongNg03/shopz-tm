const authRouter = require('./signIn');
const productRouter = require('./product.js');
const brandRouter = require('./brand.js');
const typeProductRouter = require('./typeProduct.js');
const userRouter = require('./user.js');

function route(app) {
  app.use('/auth', authRouter);
  app.use('/products', productRouter);
  app.use('/brands', brandRouter);
  app.use('/type-products', typeProductRouter);
  app.use('/users', userRouter);
}

module.exports = route;
