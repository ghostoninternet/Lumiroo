const { EXPIRES_IN } = require('../constants/model');
const authService = require('../services/auth.service');

const signin = async (req, res) => {
  const { email, password } = req.body;

  const authData = await authService.signin({ email, password });
  res.cookie('session', authData.session, {
    httpOnly: true,
    expires: new Date(Date.now() + EXPIRES_IN),
    secure: true,
    sameSite: 'none',
    path: '/',
  })
  res.status(200).json({
    message: 'Login successful',
    user: authData.user,
  });
};

const signup = async (req, res) => {
  const { username, email, password, gender, phoneNumber, dob, avatarUrl } = req.body;

  const authData = await authService.signup({
    username,
    email,
    password,
    gender,
    phoneNumber,
    dob,
    avatarUrl,
  });

  res.cookie('session', authData.session, {
    httpOnly: true,
    expires: new Date(Date.now() + EXPIRES_IN),
    secure: true,
    sameSite: 'none',
    path: '/',
  })
  res.status(200).json({
    message: 'User registered successfully',
    user: authData.user,
  });
};

const logout = async (req, res) => {
  const logoutData = await authService.logout(req.session.sessionId)
  res.clearCookie('session')
  res.status(200).json(logoutData);
};

module.exports = {
  signin,
  signup,
  logout,
};