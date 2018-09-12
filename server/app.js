const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Employee = require('./models/employee');
const mongoose = require('mongoose');

/* connect to mongoDB local */
mongoose
  .connect(
    'mongodb://localhost:27017/constructionSystem',
    { useNewUrlParser: true }
  )
  // mongoose
  //   .connect(
  //     'mongodb+srv://admin:TgFHcWlz1Wfgyu1G@cluster.mongodb.net/',
  //     { dbName: 'node-angular', useNewUrlParser: true }
  //   )
  .then(() => {
    console.log('connected to cloud!');
  })
  .catch(() => {
    console.log('connection fail!');
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// ATLAS ADMIN PASSWORD: TgFHcWlz1Wfgyu1G

app.get('/api/employee', (req, res, next) => {
  const employee = [
    {
      id: '1',
      firstName: 'Ray',
      lastName: 'Misterio',
      gender: 'Male',
      skill: 'Carpenter',
      addresses: [{ homeaddress: 'Manila' }, { homeaddress: 'Pasay' }],
      contacts: [{ homenumber: '09209218201' }, { homenumber: '09292927152' }]
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Smith',
      gender: 'Female',
      skill: 'Mason',
      addresses: [{ homeaddress: 'Mindoro' }, { homeaddress: 'Batangas' }],
      contacts: [{ homenumber: '09230291261' }, { homenumber: '09212532622' }]
    }
  ];
  res.status(200).json({
    message: 'Successfully FETCH',
    employee: employee
  });
});

app.post('/api/employe', (req, res, next) => {
  const employe = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    skill: req.body.skill,
    contacts: req.body.contacts,
    addresses: req.body.addresses
  });

  res.status(201).json({
    message: 'Post added Succesfully'
  });
});

app.route('/api/employee/:id').get((req, res) => {
  const requestedEmployeeId = req.params['name'];
  res.send(requestedEmployeeId);
});

app.use(bodyParser.json());
app.route('/api/employee').post((req, res) => {
  res.send(201, req.body);
});

app.route('/api/employee/:id').put((req, res) => {
  res.send(200, req.body);
});

app.route('/api/employee/:id').delete((req, res) => {
  res.sendStatus(204);
});

module.exports = app;
