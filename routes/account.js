const accountRouter = require('express').Router();
const UserModel = require('../mongoDB/models/UserModel');

accountRouter.post('/create', async (req, res) => {
  const { firstname, lastname, location, email, password: clearPassword } = req.body;

  console.log(location);
  
  // check if this username can be used
  const checkedUserInDB = await UserModel.findUserInDB(email);

  if (checkedUserInDB)
    return res.status(401).send('This user already exist');

  try {
    const newUser = await UserModel.createNewUser(firstname, lastname, location, email, clearPassword);
    return res.status(200).send(`user created :${  newUser}`);
  } catch (error) {
    return res.status(401).send(`error in user creation : ${error}`);
  }
});

module.exports = accountRouter;
