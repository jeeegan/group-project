const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Picture = require('../models/picture');



/* GET home page */
router.get('/', (req, res, next) => {
  if(req.user) {
    res.render('index');
  }else {
    res.redirect('/auth/login');
  }
});

router.get('/holiday-request', (req, res, next) => {
});

router.get('/history', (req, res, next) => {
});

router.get('/my-profile', (req, res, next) => {
});

const upload = multer({ dest: './public/uploads/' });

router.post('/upload-picture', upload.single('photo'), (req, res) => {

  const pic = new Picture({
    name: req.body.name,
    path: `/upload/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/');
  });
});


module.exports = router;
