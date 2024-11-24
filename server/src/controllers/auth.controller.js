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
    user: req.session.user,
  });
};

const signup = async (req, res) => {
  try {
    const { email, password, gender, phoneNumber, dob, avatarUrl, role } = req.body;

    if (!email || !password || !gender || !phoneNumber || !dob || !avatarUrl || !role) {
      throw new BadRequestError('Missing required fields');
    }

    const newUser = await authService.signup({ email, password, gender, phoneNumber, dob, avatarUrl, role });

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      return res.status(409).json({ message: error.message });
    }
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
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