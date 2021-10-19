const authentificationRouter = require('./authentification');

module.exports = (app) => {
  app.use('/authentification', authentificationRouter);
};
