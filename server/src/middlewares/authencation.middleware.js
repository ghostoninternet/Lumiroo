const userDaos = require('../daos/user.daos');

module.exports = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized: No session found' });
    }

    const user = await userDaos.findUserById(req.session.user.id);
    
    if (!user) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Session destruction failed' });
        }
        return res.status(401).json({ message: 'Unauthorized: User no longer exists' });
      });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error while authenticating' });
  }
};
