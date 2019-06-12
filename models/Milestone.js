const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MilestoneSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  skill: {
    type: Schema.Types.ObjectId,
    ref: 'skill'
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
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
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  }
});

module.exports = Milestone = mongoose.model('milestone', MilestoneSchema);
