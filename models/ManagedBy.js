const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const managedBySchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _manager: {
    type: Schema.Types.ObjectId,
    ref: 'Manager'
  }
});

const ManagedBy = mongoose.model('User', managedBySchema);
module.exports = ManagedBy;
