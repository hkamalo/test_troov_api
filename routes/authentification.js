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

authentificationRouter.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).send('Could not destroy session');
    res.clearCookie("sessionId", { domain:'localhost' });
    return res.status(200).send('session deleted');
  });
});

module.exports = authentificationRouter;
