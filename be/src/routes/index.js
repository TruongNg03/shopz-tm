const authRouter = require('./signIn');

function route(app) {
  app.use('/auth', authRouter);
}

module.exports = route;
