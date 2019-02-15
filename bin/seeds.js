// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const ManagedBy = require("../models/ManagedBy");
const Holiday = require("../models/Holiday");

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    name: "Maxence",
    username: "mc100s",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'carrot@test.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 00,
    startDate: new Date(2000, 01, 01),
    jobTitle: 'Lead Instructor',
    holidayBooked: 0
  },
  {
    name: "Thor",
    username: "tormod",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'thor@test.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 00,
    startDate: new Date(2000, 01, 01),
    jobTitle: 'Software Developer',
    holidayBooked: 0
  },
  {
    name: "Aaron",
    username: "aaron",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'super@test.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 00,
    startDate: new Date(2000, 01, 01),
    jobTitle: 'Software Developer',
    holidayBooked: 0
  },
  {
    name: "Axel",
    username: "axel",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'axel@test.com',
    role: 'EMPLOYEE',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 00,
    startDate: new Date(2000, 01, 01),
    jobTitle: 'Software Developer',
    holidayBooked: 0
  },
  {
    name: "Alec",
    username: "alec",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'alec@test.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 28,
    startDate: new Date(2017, 01, 01),
    jobTitle: 'Web Dev',
    holidayBooked: 0
  },
  {
    name: "Jamie",
    username: "jamie",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'jamie@test.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 28,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'Web Dev',
    holidayBooked: 0
  },
  {
    name: "John Smith",
    username: "john",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'john@test.com',
    role: 'EMPLOYEE',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 28,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'Admin',
    holidayBooked: 0
  },
  {
    name: "Sinan",
    username: "snntylan",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'sinan@test.com',
    role: 'ADMIN',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 28,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'Web Dev',
    holidayBooked: 1
  },
  {
    name: "Peter Parker",
    username: "peter",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'peter@test.com',
    role: 'EMPLOYEE',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 28,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'Photographer',
    holidayBooked: 1
  },
  {
    name: "Tony Stark",
    username: "tony",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'tony@test.com',
    role: 'EMPLOYEE',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 28,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'Billionaire Arms Dealer',
    holidayBooked: 1
  },
  {
    name: "El Chapo",
    username: "elchapo",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'elchapo@test.com',
    role: 'EMPLOYEE',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 28,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'International Narcotics Dealer',
    holidayBooked: 1
  },
  {
    name: "Donald Trump",
    username: "therealdonaldtrump",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'donald@kremlin.ru',
    role: 'EMPLOYEE',
    linkedinUrl: 'https://www.linkedin.com/',
    githubUrl: 'https://github.com/',
    holidayAllowance: 28,
    startDate: new Date(2019, 02, 11),
    jobTitle: 'Russian Spy',
    holidayBooked: 1
  } 
];

Promise.all([
  Holiday.deleteMany(),
  User.deleteMany(),
  ManagedBy.deleteMany()
])
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`Users created: ${usersCreated}`);
  const superUser = usersCreated[0]._id;
  const managerRelationships = usersCreated.map((u) => ({_userId: u._id, _manager: superUser}) );
  return ManagedBy.create(managerRelationships);
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})