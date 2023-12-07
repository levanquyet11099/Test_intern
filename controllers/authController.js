const bcrypt = require('bcrypt');
const User = require('../models/users');

const getlogin = (req, res) => {
  res.render('login');
};
const getregister = (req, res) => {
  res.render('register');
};
 
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username đã tồn tại' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
};
  const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'không có username' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Sai username or password' });
      }
      req.session.user = { username: user.username };
      res.redirect('/api/v1/product/list');
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  };
  
  module.exports = {
    login,
    register,
    getlogin,
    getregister,
  };
  