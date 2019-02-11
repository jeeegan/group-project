const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Picture = require('../models/picture');
const { isConnected } = require('../configs/middlewares');
const Holiday = require("../models/Holiday")
const User = require("../models/User")

/* GET home page */
router.get('/', (req, res, next) => {
  if(req.user) {
    User.findOne({ _id: req.user._id })
    .then(user => {
      res.render('index', user);
    }) 
  } else {
    res.redirect('/auth/login');
  }
});

// HOLIDAY REQUEST ROUTES
router.get('/holiday-request', (req, res, next) => {
  if(req.user) {
    User.findOne({ _id: req.user._id })
    .then(user => {
      res.render('holiday-request', user);
    }) 
  }
    else {
      res.redirect('/auth/login');
    }
  });

router.post('/holiday-request', (req, res, next) => {
  Holiday.save({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    employeeComment: req.body.employeeComment
  })
  .then(() => {
  })
  .catch(console.log)
})

router.get('/history', (req, res, next) => {
  res.render('holiday-request')
});

router.get('/my-profile', (req, res, next) => {
  res.render('holiday-request')
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
