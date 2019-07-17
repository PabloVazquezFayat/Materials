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
router.get('/editor', ensureLogin.ensureLoggedIn('/'), (req, res, next)=>{
  res.render('editor');
});

//Upload single material texture
router.post('/upload', ensureLogin.ensureLoggedIn('/'), multer.single('diffuse'), (req, res, next)=>{
  let id = req.headers.referer.split('/')[4]
  Material.findByIdAndUpdate(id, { diffuse: req.file.url })
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