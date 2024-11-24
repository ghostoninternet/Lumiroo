const bcrypt = require('bcrypt')
const userDaos = require('../daos/user.daos')
const { NotFoundError, BadRequestError, UserAlreadyExistError } = require('../errors/customError');
const { ROLE } = require('../constants/model');

const signin = async ({ email, password }) => {
  // Tìm người dùng bằng email
  const foundUser = await userDaos.findUserByEmail(email);
  if (!foundUser) throw new NotFoundError('User not found!');

  // So sánh mật khẩu
  const passwordCompare = await bcrypt.compare(password, foundUser.password);
  if (!passwordCompare) throw new BadRequestError('Password is incorrect');

  return foundUser; // Trả về thông tin người dùng
};

const signup = async ({ email, password, gender, phoneNumber, dob, avatarUrl, role }) => {
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
    role: ROLE.USER,
  };

  const newUser = await userDaos.createNewUser(newUserData);
  return newUser;
};

const refreshToken = async () => {

}

const logout = async () => {

}

module.exports = {
  signin,
  signup,
  refreshToken: async () => null,
  logout: async () => null,
}