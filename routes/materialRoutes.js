const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Material = require('../models/Material');
const ensureLogin = require("connect-ensure-login");

//Get materials
router.get('/materials', ensureLogin.ensureLoggedIn('/'), (req, res, next)=>{
  //Return all materails that belong to author/user
  Material.find({author: mongoose.Types.ObjectId(req.user._id)})
  .then((data)=>{
    res.send(data);
  })
  .catch((err)=>{
    next(err);
  });
});

module.exports = router;