const userDaos = require('../daos/user.daos');
const sessionsDaos = require('../daos/session.daos')
const { UnauthorizedError } = require('../errors/customError');

const filterUserFields = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  role: user.role,
  avatarUrl: user.avatarUrl,
});

module.exports = async (req, res, next) => {
  try {
    const sessionId = req.cookies.session;    
    if (!sessionId) {
      throw new UnauthorizedError('No session found!');
    }

    const foundSession = await sessionsDaos.findOneSession(sessionId);
    if (!foundSession) {
      throw new UnauthorizedError('Session is not valid!');
    }

    const foundUser = await userDaos.findUserById(foundSession.userId);
    if (!foundUser) {
      throw new UnauthorizedError('No user found!');
    }

    req.session = {
      sessionId,
      user: {
        ...filterUserFields(foundUser),
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
