const accountRouter = require('express').Router();
const UserModel = require('../mongoDB/models/UserModel');

accountRouter.post('/create', async (req, res) => {
  const { username: givenUsername, password: givenPassword } = req.body;

  // check if this username can be used
  const checkedUserInDB = await UserModel.findUsernameInDB(givenUsername);

  if (checkedUserInDB)
    return res.status(401).send('This username already exist');

  try {
    await UserModel.create({ givenUsername, givenPassword });
    return res.status(200).send('user created');
  } catch (error) {
    return res.status(401).send('error in user creation');
  }
});

module.exports = accountRouter;
