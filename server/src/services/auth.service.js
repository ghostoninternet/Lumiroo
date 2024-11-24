const bcrypt = require('bcrypt')
const userDaos = require('../daos/user.daos')
const { NotFoundError, BadRequestError, UserAlreadyExistError } = require('../errors/customError');
const { ROLE } = require('../constants/model');

const signin = async ({ email, password }) => {
  const foundUser = await userDaos.findUserByEmail(email);
  if (!foundUser) throw new NotFoundError('User not found!');

  const passwordCompare = await bcrypt.compare(password, foundUser.password);
  if (!passwordCompare) throw new BadRequestError('Password is incorrect');

  // Chỉ trả về các trường cần thiết
  return {
    _id: foundUser._id,
    email: foundUser.email,
    role: foundUser.role,
  };
};

const signup = async ({ email, password, gender, phoneNumber, dob, avatarUrl }) => {
  const foundUser = await userDaos.findUserByEmail(email);
  if (foundUser) throw new UserAlreadyExistError();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserData = {
    email,
    password: hashedPassword,
    gender,
    phoneNumber,
    dob,
    avatarUrl,
    role: 'USER', // Đặt mặc định là USER
  };

  return userDaos.createNewUser(newUserData);
};

const refreshToken = async () => {

}

const logout = async () => {

}

module.exports = {
  signin,
  signup,
  refreshToken,
  logout,
}