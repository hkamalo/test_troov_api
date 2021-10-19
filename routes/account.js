const accountRouter = require('express').Router();
const UserModel = require('../mongoDB/models/UserModel');

accountRouter.post('/create', async (req, res) => {
  const { firstname, lastname, email, adress, password: clearPassword } = req.body;
  
  // check if this username can be used
  const checkedUserInDB = await UserModel.findUsernameInDB(email);

  if (checkedUserInDB)
    return res.status(401).send('This user already exist');

  try {
    await UserModel.create({ firstname, lastname, email, adress, clearPassword });
    return res.status(200).send('user created');
  } catch (error) {
    return res.status(401).send('error in user creation');
  }
});

module.exports = accountRouter;
