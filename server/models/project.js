const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  projectName: String,
  description: String,
  dateStarted: String,
  dateEnded: String,
  projectType: String,
  address: {
    province: String,
    municipality: String,
    barangay: String
  },
  costDetails: {
    totalCost: String,
    disbursement: [
      {
        cost: { type: String },
        date: { type: String }
      }
    ]
  }
});

module.exports = mongoose.model('Project', projectSchema);
