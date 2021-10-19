const authentificationRouter = require('./authentification');
const accountRouter = require('./account');
const UserRouter = require('./user');

module.exports = (app) => {
  app.use('/authentification', authentificationRouter);
  app.use('/account', accountRouter);
  app.use('/user', UserRouter);
};
