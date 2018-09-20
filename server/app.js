const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Employee = require('./models/employee'); // employee schema

const Project = require('./models/project');

const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* connect to mongoDB local */
mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb://localhost:27017/construction-system',
    { useNewUrlParser: true }
  )
  // mongoose
  //   .connect(
  //     'mongodb+srv://admin:TgFHcWlz1Wfgyu1G@cluster.mongodb.net/',
  //     { dbName: 'node-angular', useNewUrlParser: true }
  //   )
  .then(() => {
    console.log('connected!!');
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

// FETCH EMPLOYEE DETAILS
app.get('/api/employee', (req, res, next) => {
  Employee.find().then(employee => {
    res.status(200).json({ message: 'Successfully FETCH', employee: employee });
  });
});

// ADD EMPLOYEE TO DB

app.post('/api/employee', (req, res, next) => {
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    skill: req.body.skill,
    addresses: req.body.addresses,
    contacts: req.body.contacts
  });
  employee.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Employee added Succesfully',
      employeeId: result._id
    });
  });
});

// delete data to db
app.delete('/api/employee/:id', (req, res, next) => {
  console.log(req.params.id);
  Employee.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Post Deleted' });
  });
});

app.route('/api/employee/:id').get((req, res) => {
  const requestedEmployeeId = req.params['name'];
  res.send(requestedEmployeeId);
});

app.use(bodyParser.json());
app.route('/api/employee').post((req, res) => {
  res.status(201).send(req.body);
});

app.route('/api/employee/:id').put((req, res) => {
  res.send(200, req.body);
});

app.route('/api/employee/:id').delete((req, res) => {
  res.sendStatus(204);
});

// get project from mongo

app.get('/api/project', (req, res, next) => {
  const project = [
    {
      id: 'c8e6449f-ae5d-499c-937b-13277338d1e1',
      projectName: 'Building Project',
      description: 'Building Project no.1',
      dateStarted: '1997-07-13',
      dateEnded: '2001-01-17',
      projectType: 'Local Access Road',
      address: {
        province: 'Batangas',
        municipality: 'Bauan',
        barangay: 'Manghinao proper'
      },
      costDetails: {
        totalCost: '₱123,124.00',
        disbursement: [
          {
            cost: '₱123,124.00',
            date: '1997-07-23'
          }
        ]
      }
    }
  ];
  // res.status(201).json({
  //   message: 'GET FROM PROJECT DATA',
  //   project: project
  // });
  Project.find().then(project => {
    res.status(200).json({ message: 'Succesfully Get', project: project });
  });
});

// ADD PROJECT TO DB
app.post('/api/project', (req, res, next) => {
  const project = new Project({
    projectName: req.body.projectName,
    description: req.body.description,
    dateStarted: req.body.dateStarted,
    dateEnded: req.body.dateEnded,
    address: {
      province: req.body.address.province,
      municipality: req.body.address.municipality,
      barangay: req.body.address.barangay
    },
    costDetails: {
      totalCost: req.body.costDetails.totalCost,
      disbursement: req.body.costDetails.disbursement
    }
  });
  project.save().then(newProject => {
    console.log(newProject);
    res.status(201).json({
      message: 'Project added Succesfully',
      projectId: newProject._id
    });
  });
});

// ROUTES TO USE PROJECT API TO ANGULAR

app.route('/api/project/:id').get((req, res) => {
  const requestedProjectId = req.params['name'];
  res.send(requestedProjectId);
});

app.use(bodyParser.json());
app.route('/api/project').post((req, res) => {
  res.status(201).send(req.body);
});

app.route('/api/project/:id').put((req, res) => {
  res.send(200, req.body);
});

app.route('/api/project/:id').delete((req, res) => {
  res.sendStatus(204);
});

module.exports = app;
