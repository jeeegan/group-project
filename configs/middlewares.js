const User = require("../models/User");

module.exports = {
  checkConnected: (req,res,next) => { // route protection to force only logged in users
    if (req.user) {
      next()
    } else {
      res.redirect('/auth/login');
    }
  },
  checkManager: (req,res,next) => { // middleware route protection to only allow ADMIN or MANAGER users
    User.findOne({_id: req.user && req.user._id})
      .then((user) => {
      if(user.role === 'ADMIN' || user.role === 'MANAGER') {
        next()
      } else {
        res.redirect('/');
      }
    })
  }
}