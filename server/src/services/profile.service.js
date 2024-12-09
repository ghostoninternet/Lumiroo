const usersDao = require('../daos/user.daos');
const filterUserFields = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  role: user.role,
});

const getProfileService = async (userId) => {
    const user = await usersDao.getUser(userId);
    const result = {
      name: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      address: user.address,
      birthday: user.dob,
      phone: user.phoneNumber,
      gender: user.gender
    }
    console.log('User data:', result);
    return result;
}
const updateProfileService = async (userId, data) => {
    const user = await usersDao.updateUser(userId, data);
    return filterUserFields(user);
}
module.exports = {
    getProfileService,
    updateProfileService,
}