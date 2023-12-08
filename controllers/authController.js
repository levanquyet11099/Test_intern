const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');

const getlogin = (req, res) => {
  res.render('login');
};
const getregister = (req, res) => {
  res.render('register');
};
 
const register = async (req, res) => {
  const { username, password ,confirmPassword} = req.body;
  try {
   
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      //return res.status(400).json({ message: 'Username đã tồn tại' });
      req.flash('error_msg', 'Username đã tồn tại');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    req.flash('success_msg', 'Tài khoản được đăng ký thành công');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Tài khoản không được đăng ký thành công');
    res.redirect('/login');
  }
};
  const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        //return res.status(401).json({ message: 'không có username' });
        req.flash('error_msg','không có username');
        return res.redirect('/login');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        req.flash('error_msg','Sai username or password');
        return res.redirect('/login');
        //return res.status(401).json({ message: 'Sai username or password' });
      }
      //req.session.user = { username: user.username };
      const token = jwt.sign({ userId: user.id }, '110901', { expiresIn: '1h' });
      req.session.user = { username: user.username, token };
      
      req.flash('success_msg','Đăng nhập thành công');
      res.redirect('/api/v1/product/list');
    } catch (error) {
      console.error(error);
      //req.flash('error_msg','không thể đăng nhập');
      res.redirect('/login');
    }
  };
  const logout = (req, res) => {
   
    req.session.destroy((err) => {
      if (err) {
        console.error('Error', err);
        return res.status(500).send('Error');
      }
      res.redirect('/login'); 
    });
  };
  

  module.exports = {
    login,
    register,
    getlogin,
    getregister,
    logout,
  };
  