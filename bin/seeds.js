// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/group-project', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    name: "Alec",
    username: "abudd1094",
    password: bcrypt.hashSync("password", bcrypt.genSaltSync(bcryptSalt)),
    email: 'abudd1094@gmail.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/in/alecbudd/',
    githubUrl: 'https://github.com/abudd1094',
    holidayAllowance: 15,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'boss',
    holidayBooked: 1
  },
  {
    name: "Jamie",
    username: "jamie",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'jamie@gmail.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 15,
    startDate: new Date(2019, 02, 11),
    jobTitle: '?',
    holidayBooked: 1
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})