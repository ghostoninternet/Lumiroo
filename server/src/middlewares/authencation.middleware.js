// Write authentication middleware
const userDaos = require('../daos/user.daos');

module.exports = async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await userDaos.findUserById(req.session.user.id);
  if (!user) {
    req.session.destroy();
    return res.status(401).json({ message: 'Session invalid or user no longer exists' });
  }

  next();
};

  