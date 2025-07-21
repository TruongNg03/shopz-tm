const authRouter = require('./signIn');
const productRouter = require('./product.js');

function route(app) {
  app.use('/auth', authRouter);
  app.use('/products', productRouter);
}

module.exports = route;
