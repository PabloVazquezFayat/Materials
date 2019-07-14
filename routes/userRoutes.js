const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ensureLogin = require("connect-ensure-login");
const bcrypt = require('bcryptjs');


//Create new user
router.post('/userRoutes', (req, res, next)=>{
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassWord =  bcrypt.hashSync(pass, salt);

  //check if user email is already in use
  User.findOne({email: email})
  .then((data)=>{
    if(data){
      res.redirect('/', {message: 'This is email is in use already, try again!'});
    } else {
      User.create({name: name, email: email ,password: hashedPassWord})
      .then((data)=>{
          console.log('Created user', req.body);
          req.logIn(data, (err, user)=>{
            res.redirect('/profile');
          })
      })
      .catch((err)=>{
          console.log('Error-1------------------------',err);
          next(err);
      });
    }
  })
  .catch((err)=>{
    console.log('Error-2---------------------------' ,err);
  });
});

//get user profile
router.get('/profile', ensureLogin.ensureLoggedIn('/'), (req, res, next)=>{
  console.log(req.user);
  res.render('profile', {user: req.user.name});
});

//log out user
router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/');
});

module.exports = router;