const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema({
  name : {
    type: String, 
    required: true
  },
  username: {type: String, required: true, unique: true}, 
  password: {type: String, required: true},
  email : {
    type: String, 
    required: true, 
    unique: true, 
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
  },
  role: {
    type: String, 
    enum: ["EMPLOYEE", "MANAGER", "ADMIN"],
    default: "EMPLOYEE",
    required: true,
  },
  linkedinUrl : {
    type: String,
    match: /^https?\:\/\// // Must start by "http://" or "https://"
  },
  githubUrl : {
    type: String,
    match: /^https?\:\/\// // Must start by "http://" or "https://"
  },
  holidayAllowance : {
    type: Number,
    required: true,
    default: 0
  },
  startDate : {
    type: Date,
    required: true
  },
  jobTitle : {
    type: String,
    required: true
  },
  holidayBooked : {
    type: Number,
    default: 0
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
