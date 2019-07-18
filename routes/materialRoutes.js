const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const ensureLogin = require("connect-ensure-login");
const multer = require('../components/multer/multer');

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
router.post('/createMaterial/:id', ensureLogin.ensureLoggedIn('/'), (req, res, next)=>{
  let newMaterial = {
    name: req.body.name,
    category: req.body.category,
    author: req.params.id
  }
  Material.create(newMaterial)
  .then((data)=>{
    console.log(data);
    res.redirect('/editor/'+data._id);
  })
  .catch((err)=>{
    next(err);
  });
});

//Upload single material texture
router.post('/upload/:channel', ensureLogin.ensureLoggedIn('/'), multer.single('texture'), (req, res, next)=>{

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
    next(err);
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