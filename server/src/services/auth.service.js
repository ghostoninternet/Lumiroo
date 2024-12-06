const bcrypt = require('bcrypt');
const userDaos = require('../daos/user.daos');
const { NotFoundError, BadRequestError, UserAlreadyExistError } = require('../errors/customError');
const { ROLE } = require('../constants/model');

/**
 * Utility function to filter necessary user fields.
 * @param {Object} user - User object from the database.
 * @returns {Object} Filtered user fields.
 */

const filterUserFields = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  role: user.role,
});

const signin = async ({ email, password }) => {
  const foundUser = await userDaos.findUserByEmail(email);
  if (!foundUser) throw new NotFoundError('User not found!');

  const passwordCompare = await bcrypt.compare(password, foundUser.password);
  if (!passwordCompare) throw new BadRequestError('Password is incorrect');

  return filterUserFields(foundUser);
};

const signup = async ({ username, email, password, gender, phoneNumber, dob, avatarUrl }) => {
  const foundUser = await userDaos.findUserByEmail(email);
  if (foundUser) throw new UserAlreadyExistError();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserData = {
    username,
    email,
    password: hashedPassword,
    gender,
    phoneNumber,
    dob,
    avatarUrl,
    role: ROLE.USER, // Dùng constant ROLE.USER
  };

  const newUser = await userDaos.createNewUser(newUserData);
  return filterUserFields(newUser);
};

module.exports = {
  signin,
  signup,
};
