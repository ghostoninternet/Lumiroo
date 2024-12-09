const authService = require('../services/auth.service');

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.signin({ email, password });
  req.session.user = user;
  console.log(req.session);
  res.status(200).json({
    message: 'Login successful',
    user
  });
};

const signup = async (req, res) => {
  const { username, email, password, gender, phoneNumber, dob, avatarUrl } = req.body;

  const newUser = await authService.signup({
    username,
    email,
    password,
    gender,
    phoneNumber,
    dob,
    avatarUrl,
  });

  req.session.user = newUser;

  res.status(201).json({
    message: 'User registered successfully',
    user: newUser,
  });
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    // Xóa cookie chứa session ID trên trình duyệt
    res.clearCookie('connect.sid', {
      path: '/', // Đảm bảo đúng đường dẫn
      httpOnly: true, // Tăng bảo mật
      secure: process.env.NODE_ENV === 'production', // Chỉ sử dụng HTTPS nếu ở môi trường production
    });
    res.status(200).json({ message: 'Logout successful' });
  });
};

module.exports = {
  signin,
  signup,
  logout,
};