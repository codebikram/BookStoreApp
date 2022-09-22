const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

//secret for JWT token
const JWT_SECRET = process.env.JWT_SECRET_KEY;

//sign up
router.post('/createuser', async (req, res) => {
  let success = false;
  try {
    if (!req.body.name) throw Error('Please enter name');
    if (!req.body.email) throw Error('Please enter email');
    if (!req.body.password) throw Error('Please enter password');
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      //password hashing
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);
      //save user data in mongodb
      let userData = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });
      //jwt token generate and send it
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } else {
      return res
        .status(400)
        .json({ success, error: 'Sorry a user with this email alredy exists' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success, erorr: error.message });
  }
});

//log in
router.post('/login', async (req, res) => {
  let success = false;
  try {
    if (!req.body.email) throw Error('Please enter email');
    if (!req.body.password) throw Error('Please enter password');
    let { email, password } = req.body;
    //find the user from db
    const user = await User.findOne({ email });
    if (user) {
      //check the password matched or not
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (passwordCompare) {
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
      } else {
        return res
          .status(400)
          .json({ success, error: 'Please enter correct details' });
      }
    } else {
      return res
        .status(400)
        .json({ success, error: 'Please enter correct details' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success, error: error.message });
  }
});

module.exports = router;
