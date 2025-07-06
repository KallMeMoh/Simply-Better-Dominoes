const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const config = require('../config.js');

const User = require('../db/models/User.js');
// const Session = require('../db/models/Session.js');
// const Guest = require('../db/models/Guest.js');

exports.POST_Signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).json({
        errors: [{ msg: 'Username or Email already exists' }],
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      hashedPassword,
    });
    await user.save();

    res.status(200).json({ OK: 1 });
  } catch (err) {
    console.error(err);
    if (err.message === 'Invalid username or password') {
      res.status(401).json({ message: err.message });
    } else if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

exports.POST_Login = async (req, res) => {
  //   try {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return res.status(400).json({ errors: errors.array() });
  //     }
  //     const { username, password } = req.body;
  //     const user = await User.findOne({ username });
  //     if (!user) {
  //       return res.status(401).json({ message: 'User does not exist' });
  //     }
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       return res.status(401).json({ message: 'Invalid username or password' });
  //     }
  //     const accessToken = generateAccessToken(user._id);
  //     const refreshToken = generateRefreshToken(user._id);
  //     const tokenDoc = new Token({
  //       userId: user._id,
  //       accessToken,
  //       refreshToken,
  //     });
  //     await tokenDoc.save();
  //     res.status(200).json({ accessToken, refreshToken });
  //   } catch (err) {
  //     console.error(err);
  //     if (err.name === 'ValidationError') {
  //       res.status(400).json({ message: err.message });
  //     } else {
  //       res.status(500).json({ message: 'Internal server error' });
  //     }
  //   }
};

exports.POST_Logout = async (req, res) => {
  //   const logoutAll = req.body.logout_all ?? false;
  //   /////////////
  //   const authHeader = req.headers.authorization;
  //   if (!authHeader || !authHeader.startsWith('Socket '))
  //     return res
  //       .status(401)
  //       .json({ message: 'Missing or malformed authorization header' });
  //   const accessToken = authHeader.split(' ')[1];
  //   if (!accessToken)
  //     return res.status(401).json({ message: 'Missing access token' });
  //   try {
  //     // Delete the token directly
  //     const result = await Token.deleteOne({ accessToken });
  //     if (result.deletedCount === 0) {
  //       return res.status(401).json({ message: 'Invalid access token' });
  //     }
  //     res.json({ message: 'Logged out successfully' });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
};

exports.POST_ChangePassword = async (req, res) => {};
