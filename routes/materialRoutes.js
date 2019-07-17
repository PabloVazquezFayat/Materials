const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const ensureLogin = require("connect-ensure-login");
const {uploadCloud,fileDestroy} = require('../components/multer/multer');

//Get single material
router.get('/editor/:id', ensureLogin.ensureLoggedIn('/'), (req, res, next)=>{
  Material.findById(req.params.id)
  .then((data)=>{
    res.render('editor', {material: data});
  })
  .catch((err)=>{
    next(err);
  });
});

//Create single material
router.get('/editor', ensureLogin.ensureLoggedIn('/'), (req, res, next)=>{
  res.render('editor');
});

//Upload single material texture
router.post('/upload/:channel', ensureLogin.ensureLoggedIn('/'), uploadCloud.single('texture'), (req, res, next)=>{

  let id = req.headers.referer.split('/')[4];
  let channel = req.params.channel;
  let data = {};
  data[channel] = req.file.url;

  Material.findByIdAndUpdate(id, data)
  .then(()=>{
    res.redirect('/editor/'+id);
  })
  .catch((err)=>{
    next(err);    
  });
});

//Delete single material texture
router.post('/delete/:material/:channel', ensureLogin.ensureLoggedIn('/'), (req, res, next)=>{

  let id = req.params.material;
  let channel = req.params.channel;
  let data = {};
  data[channel] = null;

  Material.findByIdAndUpdate(id, data)
  .then(()=>{
    res.redirect('/editor/'+id);
  })
  .catch((err)=>{

  });
  
});

//DELETE single material
router.post('/delete/:id', ensureLogin.ensureLoggedIn('/'), (req, res, next) => {
  Material.findByIdAndRemove(req.params.id)
  .then((data)=>{
    res.redirect('/profile');
    console.log(data);
  })
  .catch((err)=>{
    console.log(err);
    next(err);
  });
});

module.exports = router;