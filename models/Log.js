const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  skill: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'skill'
  },
  milestone: {
    type: Schema.Types.ObjectId,
    ref: 'milestone'
  },
  description: {
    type: String
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

module.exports = Log = mongoose.model('log', LogSchema);
