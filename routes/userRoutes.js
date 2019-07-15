const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Material = require('../models/Material');
const ensureLogin = require("connect-ensure-login");
const bcrypt = require('bcryptjs');
const passport = require('passport');


//Create new user
router.post('/signup', (req, res, next)=>{
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassWord =  bcrypt.hashSync(pass, salt);

  //check if user email is already in use
  User.findOne({email: email})
  .then((data)=>{
    if(data){
      req.flash('error', 'This email is already in use, try again!');
      res.redirect('/');
    } else {
      User.create({name: name, email: email ,password: hashedPassWord})
      .then((data)=>{
          console.log('Created user', req.body);
          req.logIn(data, (err, user)=>{
            res.redirect('/profile');
          })
      })
      .catch((err)=>{
          console.log(err);
          next(err);
      });
    }
  })
  .catch((err)=>{
    console.log(err);
  });
});

//get user log in
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));

//log out user
router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/');
});

//get user profile if logged in
router.get('/profile', ensureLogin.ensureLoggedIn('/'), (req, res, next)=>{
  Material.find({author: mongoose.Types.ObjectId(req.user._id)})
  .then((data)=>{
    res.render('profile', {user: req.user.name, material:data});
  })
  .catch((err)=>{
    next(err);
  });
});

module.exports = router;