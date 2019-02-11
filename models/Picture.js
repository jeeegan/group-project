const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pictureSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  path: {
    type: String, 
    required: true
  },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Picture = mongoose.model("Picture", pictureSchema);
module.exports = Picture;
