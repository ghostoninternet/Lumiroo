const usersDao = require('../daos/user.daos');
const usersService = require('../services/profile.service');

const filterUserFields = (user) => ({
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  });
const getProfile = async (req, res) => {
    const result = await usersService.getProfileService(req.session.user.id);
    res.status(200).json({
        result,
    });
}
const updateProfile = async (req, res) => {
    const user = await usersService.updateProfileService(req.session.user.id, req.body);
    req.session.user = user;
    res.status(200).json({
        message: 'Update profile successfully',
        user,
    });
}

exports.getProfile = getProfile;
exports.updateProfile = updateProfile;