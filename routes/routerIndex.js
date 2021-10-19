const authentificationRouter = require('./authentification');
const accountRouter = require('./account');

module.exports = (app) => {
  app.use('/authentification', authentificationRouter);
  app.use('/account', accountRouter);
};
