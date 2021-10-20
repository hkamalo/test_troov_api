const authentificationRouter = require('express').Router();
const UserModel = require('../mongoDB/models/UserModel');

authentificationRouter.post('/login', async (req, res) => {
  const { email: inputEmail, password: clearPassword } = req.body;

  // check the inputs validity
  const checkedUserInDB = await UserModel.findUserInDB(inputEmail);

  if (!checkedUserInDB)
    return res.status(401).send(' email Invalid Credentials');

  const { hashedPassword } = checkedUserInDB;

  const isPasswordCorrect = await UserModel.verifyPassword(
    clearPassword,
    hashedPassword
  );

  if (!isPasswordCorrect)
    return res.status(401).send('password Invalid Credentials');

  // if inputs are correct
  req.session.userId = checkedUserInDB.id;
  req.session.save(() => {
    res.status(200).send('Valid Credentials');
  });
});

module.exports = authentificationRouter;
