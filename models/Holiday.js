const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const holidaySchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Holiday = mongoose.model('User', holidaySchema);
module.exports = Holiday;
