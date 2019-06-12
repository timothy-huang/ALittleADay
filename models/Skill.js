const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  time_spent: {
    hours: {
      type: Number,
      default: 0
    },
    minutes: {
      type: Number,
      default: 0
    },
    seconds: {
      type: Number,
      default: 0
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Skill = mongoose.model('skill', SkillSchema);
