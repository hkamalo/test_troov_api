require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// Connection error
connection.connect((err) =>
  err
    ? console.error(`error connecting: ${err.stack}`)
    : console.log(`connected as id ${connection.threadId}`)
);

// app settings
app.set('x-powered-by', false); // for security


// server setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  if (!inTestEnv) {
    console.log(`Server running on port ${PORT}`);
  }
});

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



