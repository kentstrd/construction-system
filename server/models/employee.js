const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: String,
  skill: String,
  addresses: [String],
  contacts: [String]
});

module.exports = mongoose.model('Employee', employeeSchema);
