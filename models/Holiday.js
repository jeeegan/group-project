const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const holidaySchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  status: {
    type: String, 
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },
  employeeComment: String,
  managerComment: String,

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Holiday = mongoose.model('User', holidaySchema);
module.exports = Holiday;
