const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const ensureLogin = require("connect-ensure-login");

//Get materials
router.get('/profile', ensureLogin.ensureLoggedIn('/'), (req, res, next)=>{
  //Return all materails that belong to author/user
});

module.exports = router;