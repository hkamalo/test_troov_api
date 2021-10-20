require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const { sessionConfig } = require('./mongoDB/config/dbconfig');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;


// ------------------------- Security ------------------------------------------- //

// app settings
app.set('x-powered-by', false); // for security

// process setup : improves error reporting
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('beforeExit', () => {
  app.close((error) => {
    if (error) console.error(JSON.stringify(error), error.stack);
  });
});




// ------------------------- Api Lunching ------------------------------------------- //

// session init
app.use(
  session({
    secret: 'abcd',
    maxAge: new Date(Date.now() + 3600000),
    store: MongoStore.create(sessionConfig),
    resave: true,
    cookie: {
      domain: 'localhost',
      sameSite: true,
      httpOnly: true,
    },
  })
);

// init router
require('./routes/routerIndex')(app);

// init server
app.listen(PORT, () =>
console.log(`Server running on port ${PORT} and listen the DB`)
);