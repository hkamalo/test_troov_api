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

const hashPassword = (clearPassword) =>
  argon2.hash(clearPassword, hashingOptions);

const verifyPassword = (clearPassword, hashedPassword) =>
  argon2.verify(hashedPassword, clearPassword, hashingOptions);

// user helpers
const createNewUser = async (
  firstname,
  lastname,
  email,
  adress,
  clearPassword
) => {
  const hashedPassword = await hashPassword(clearPassword);

  const newUser = await UserModel.create({
    firstname,
    lastname,
    email,
    adress,
    hashedPassword,
  });

  return newUser;
};

const findUserInDB = async (email) => {
  await UserModel.findOne({ email }).exec();
};

const userAlreadyInDB = async (email) =>
  !!(await findUserInDB(email));

module.exports = {
  findUserInDB,
  hashPassword,
  verifyPassword,
  createNewUser,
  userAlreadyInDB,
};
