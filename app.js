require('dotenv').config();
const express = require('express');
const mongoDbconnection = require('./MongoDB/config/dbconfig');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
mongoDbconnection.then(() =>
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT} and listen the DB`)
  )
);

// app settings
app.set('x-powered-by', false); // for security

// server setup

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
