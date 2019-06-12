const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
