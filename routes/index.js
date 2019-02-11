const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Picture = require('../models/picture');
const { checkConnected, checkManager } = require('../configs/middlewares');
const Holiday = require("../models/Holiday");
const User = require("../models/User");

router.get('/', checkConnected, (req, res, next) => {
  User.findOne({ _id: req.user._id })
  .then(user => {
    res.render('index', user);
  }) 
});

router.get('/holiday-request', checkConnected, (req, res, next) => {
  User.findOne({ _id: req.user._id })
  .then(user => {
    res.render('holiday-request', user);
  }) 
});

router.post('/holiday-request', checkConnected, (req, res, next) => {
  const { startDate, endDate, employeeComment } = req.body;
  const newHoliday = new Holiday({ _userId: req.user._id, startDate, endDate, employeeComment});
  newHoliday.save()
  .then(() => {
    res.render('index');
  })
  .catch(console.log)
})

router.get('/history', checkConnected, (req, res, next) => {
  res.render('history')
});

router.get('/my-profile', checkConnected, (req, res, next) => {
  User.findOne({ _id: req.user._id })
  .then(user => {
    res.render('my-profile', user);
  }) 
});

router.get('/add-employee', checkManager, (req, res, next) => { // protected route ADMIN/MANAGER only
  res.render('add-employee')
});

router.get('/approve-holidays', checkManager, (req, res, next) => { // protected route ADMIN/MANAGER only
  res.render('approve-holidays')
});

router.get('/employee-list', checkManager, (req, res, next) => { // protected route ADMIN/MANAGER only
  res.render('employee-list')
});

// setting upload path for multer
const upload = multer({ dest: './public/uploads/' });

router.post('/upload-picture', upload.single('photo'), (req, res) => {

  const pic = new Picture({
    name: req.body.name,
    path: `/upload/${req.file.filename}`, // DEBUG -> this should store in the database not locally
    originalName: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/');
  });
});

module.exports = router;
