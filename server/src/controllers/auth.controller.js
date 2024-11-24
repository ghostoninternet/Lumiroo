const authService = require('../services/auth.service')

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.signin({ email, password });

  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
};

const signup = async (req, res) => {
  const { email, password, gender, phoneNumber, dob, avatarUrl } = req.body;

  const newUser = await authService.signup({
    email,
    password,
    gender,
    phoneNumber,
    dob,
    avatarUrl,
  });

  req.session.user = {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  };

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

const refreshToken = async (req, res, next) => {

}

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};

module.exports = {
  signin,
  signup,
  refreshToken,
  logout,
}