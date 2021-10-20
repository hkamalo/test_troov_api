const argon2 = require('argon2');
const { mongoDbConnection } = require('../config/dbconfig');
const UserSchema = require('../schemas/UserSchema');


// initialize the model
const UserModel = mongoDbConnection.model('User', UserSchema);

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
  location,
  email,
  clearPassword
) => {
  const hashedPassword = await hashPassword(clearPassword);

  const newUser = await UserModel.create({
    firstname,
    lastname,
    location: {
      adress: location.adress,
      city: location.city,
      postcode: location.postcode,
      country: location.country,
    },
    email,
    hashedPassword,
  });

  return newUser;
};

const findUserInDB = (inputEmail) =>
  UserModel.findOne({ email: inputEmail }).exec();

const userAlreadyInDB = async (inputEmail) =>
  !!(await findUserInDB(inputEmail));

module.exports = {
  findUserInDB,
  hashPassword,
  verifyPassword,
  createNewUser,
  userAlreadyInDB,
};
