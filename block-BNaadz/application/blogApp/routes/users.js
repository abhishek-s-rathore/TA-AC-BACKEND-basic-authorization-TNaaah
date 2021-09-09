var express = require('express');
var router = express.Router();
var User = require('../models/User');
var auth = require('../middlewares/auth');

router.get('/signup', function (req, res, next) {
  var error = req.flash('error') || null;
  res.render('signup', { error });
});

router.post('/signup', function (req, res, next) {
  User.create(req.body, (err, user) => {
    if (err) {
      if (err.code === 11000) {
        req.flash('error', 'This Email is already registered...');
        return res.redirect('/users/signup');
      }
      if (err.name === 'ValidationError') {
        req.flash('error', 'Enter a valid and strong Password...');
        return res.redirect('/users/signup');
      }
    }
    res.redirect('/users/signin');
  });
});

router.get('/signin', function (req, res, next) {
  var error = req.flash('error') || null;
  res.render('signin', { error });
});

router.post('/signin', function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email or Password is missing..');
    return res.redirect('/users/signin');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'Email Does not exist...');
      return res.redirect('/users/signin');
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'Wrong Password...');
        return res.redirect('/users/signin');
      }
      // Persist Logged In User Information
      req.session.userId = user._id;
      res.redirect('/blogs');
    });
  });
});

router.get('/logout', auth.loggedInUser, (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/signin');
});

module.exports = router;
