const bcrypt = require('bcrypt');
const userDaos = require('../daos/user.daos');
const sessionsDaos = require('../daos/session.daos');
const crypto = require('crypto');
const { NotFoundError, BadRequestError, UserAlreadyExistError, InternalServerError } = require('../errors/customError');
const { ROLE } = require('../constants/model');

const generateRandomHexString = () => {
  return crypto.randomBytes(128).toString('hex');
};

const filterUserFields = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  role: user.role,
  avatarUrl: user.avatarUrl,
});

const signin = async ({ email, password }) => {
  const foundUser = await userDaos.findUserByEmail(email);
  if (!foundUser) throw new NotFoundError('User not found!');

  const passwordCompare = await bcrypt.compare(password, foundUser.password);
  if (!passwordCompare) throw new BadRequestError('Password is incorrect');

  const sessionId = generateRandomHexString() + generateRandomHexString();
  const newSession = await sessionsDaos.createNewSession({
    sessionId,
    userId: foundUser._id,
  })

  return {
    session: newSession.sessionId,
    user: filterUserFields(foundUser),
  }
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

  const sessionId = generateRandomHexString() + generateRandomHexString();
  const newSession = await sessionsDaos.createNewSession({
    sessionId,
    userId: newUser._id,
  })

  return {
    session: newSession.sessionId,
    user: filterUserFields(newUser),
  }
};

const logout = async (sessionId) => {
  const deleteSession = await sessionsDaos.deleteOneSession(sessionId);
  if (deleteSession.deletedCount == 0) throw new InternalServerError('Error logout!')
  return {
    message: "Logout successfully!",
  }
}

module.exports = {
  signin,
  signup,
  logout
};
