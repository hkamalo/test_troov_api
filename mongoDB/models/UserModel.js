const argon2 = require('argon2');
const mongoDbconnection = require('../config/dbconfig.js');
const UserSchema = require('../schemas/UserSchema');


// initialize the model
const UserModel = mongoDbconnection.model('User', UserSchema);

// password helpers
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) =>
  argon2.hash(plainPassword, hashingOptions);

const verifyPassword = (plainPassword, hashedPassword) =>
  argon2.verify(hashedPassword, plainPassword, hashingOptions);

// user helpers
const createNewUser = async (inputUsername, inputPassword) => {

 const hashedPassword = await hashPassword(inputPassword);

  const newUser = await UserModel.create({
    username: inputUsername,
    hashedPassword,
  });

  return newUser;
};

const findUsernameInDB = async (inputUsername) => {
  await UserModel.findOne({ username: inputUsername }).exec();
};

const usernameAlreadyInDB = async (newUsername) =>
  !!(await findUsernameInDB(newUsername));
  
module.exports = {
  findUsernameInDB,
  hashPassword,
  verifyPassword,
  createNewUser,
  usernameAlreadyInDB,
};
