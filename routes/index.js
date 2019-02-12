const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Picture = require('../models/picture');
const { checkConnected, checkManager } = require('../configs/middlewares');
const Holiday = require("../models/Holiday");
const ManagedBy = require("../models/ManagedBy");
const User = require("../models/User");
const bcrypt = require("bcrypt")

const bcryptSalt = 10;

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
    res.redirect('/');
  })
  .catch(console.log)
})

router.get('/history', checkConnected, (req, res, next) => {
  Holiday.find({ _userId: req.user._id })
  .then(holidays => {
    res.render('history', {holidays});
  }) 
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

router.post('/add-employee', checkManager, (req, res, next) => {
  const { name, username, password, email, role, linkedinUrl, githubUrl, holidayAllowace, startDate, jobTitle } = req.body;
  const newUser = new User({name, username, password: bcrypt.hashSync(password, bcrypt.genSaltSync(bcryptSalt)), email, role, linkedinUrl, githubUrl, holidayAllowace, startDate, jobTitle});
  newUser.save()
  .then((user) => {
    const newUser = user._id;
    const currManager = req.user._id;
    const newManagedBy = new ManagedBy({_userId: newUser, _manager: currManager});
    newManagedBy.save();
  })
  .then(() => {
    res.redirect('/');
  })
  .catch(console.log)
})

router.get('/approve-holidays', checkManager, (req, res, next) => { // protected route ADMIN/MANAGER only
  ManagedBy.find({ _manager: req.user._id })
  .then(users => {
    Holiday.find({_userId : users})
  })
  .then(user => {
    console.log(user)
    res.render('approve-holidays', {user});
  }); 
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
