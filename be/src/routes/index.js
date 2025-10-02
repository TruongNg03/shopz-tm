const authRouter = require('./signIn');
const productRouter = require('./product.js');
const brandRouter = require('./brand.js');
const categoryRouter = require('./category.js');
const userRouter = require('./user.js');
const feedbackRouter = require('./feedback.js');
const orderRouter = require('./order.js');

function route(app) {
  app.use('/auth', authRouter);
  app.use('/products', productRouter);
  app.use('/brands', brandRouter);
  app.use('/categories', categoryRouter);
  app.use('/users', userRouter);
  app.use('/feedbacks', feedbackRouter);
  app.use('/orders', orderRouter);
}

module.exports = route;
