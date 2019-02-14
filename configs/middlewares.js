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
    if(req.user && (req.user.role === 'ADMIN' || req.user.role === 'MANAGER')) {
      next()
    } else {
      res.redirect('/');
    }
  }
}