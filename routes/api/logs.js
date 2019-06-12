const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Log = require('../../models/Log');

// @route GET api/logs/skill/:skill_id
// @desc Get logs by skill ID
// @access Private
router.get('/skill/:skill_id', auth, async (req, res) => {
  try {
    const logs = await Log.find({ skill: req.params.skill_id })
      .populate('skill', ['title'])
      .populate('milestone', ['title'])
      .populate('user', ['username']);

    if (!logs) {
      return res.status(404).json({ msg: 'No logs found' });
    }

    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/logs/milestone/:milestone_id
// @desc Get logs by milestone ID
// @access Private
router.get('/milestone/:milestone_id', auth, async (req, res) => {
  try {
    const logs = await Log.find({ milestone: req.params.milestone_id })
      .populate('skill', ['title'])
      .populate('milestone', ['title'])
      .populate('user', ['username']);

    if (!logs) {
      return res.status(404).json({ msg: 'No logs found' });
    }

    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/logs/skill/:skill_id
// @desc Create new log for skill
// @access Private
router.post(
  '/skill/:skill_id',
  [
    auth,
    check('hours', 'Invalid input for hours').isInt(),
    check('minutes', 'Invalid input for minutes').isInt({ min: 0, max: 59 }),
    check('seconds', 'Invalid input for seconds').isInt({ min: 0, max: 59 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      milestone,
      description,
      hours,
      minutes,
      seconds,
      startDate
    } = req.body;

    const logFields = {};
    logFields.user = req.user.id;
    logFields.skill = req.params.skill_id;

    if (milestone) logFields.milestone = milestone;
    if (description) logFields.description = description;
    if (startDate) logFields.startDate = startDate;

    logFields.time_spent = {};
    if (hours) logFields.time_spent.hours = hours;
    if (minutes) logFields.time_spent.minutes = minutes;
    if (seconds) logFields.time_spent.seconds = seconds;

    try {
      // Create log
      log = new Log(logFields);

      await log.save();
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/logs/:log_id
// @desc Get log by log ID
// @access Private
router.get('/:log_id', auth, async (req, res) => {
  try {
    const log = await Log.findById(req.params.log_id)
      .populate('skill', ['title'])
      .populate('log', ['title'])
      .populate('user', ['username']);

    if (!log) {
      return res.status(404).json({ msg: 'log not found' });
    }

    // Check user
    if (log.user._id.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'User not authorized'
      });
    }

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/log/:skill_id/:log_id
// @desc Update log by log ID
// @access Private
router.put(
  '/:log_id',
  [
    auth,
    check('hours', 'Invalid input for hours').isInt(),
    check('minutes', 'Invalid input for minutes').isInt({ min: 0, max: 59 }),
    check('seconds', 'Invalid input for seconds').isInt({ min: 0, max: 59 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      milestone,
      description,
      hours,
      minutes,
      seconds,
      startDate
    } = req.body;

    const logFields = {};
    logFields.user = req.user.id;
    logFields.skill = req.params.skill_id;

    if (milestone) logFields.milestone = milestone;
    if (description) logFields.description = description;
    if (startDate) logFields.startDate = startDate;

    logFields.time_spent = {};
    if (hours) logFields.time_spent.hours = hours;
    if (minutes) logFields.time_spent.minutes = minutes;
    if (seconds) logFields.time_spent.seconds = seconds;

    try {
      let log = await Log.findById(req.params.log_id);

      if (!log) {
        return res.status(404).json({ msg: 'Log not found' });
      }

      if (log) {
        // Check user
        if (log.user._id.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
        log = await Log.findByIdAndUpdate(
          req.params.log_id,
          { $set: logFields },
          { new: true }
        );
      }

      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/log/:skill_id/:log_id
// @desc Delete log by log ID
// @access Private
router.delete('/:log_id', auth, async (req, res) => {
  try {
    // Delete log
    await Log.findByIdAndDelete(req.params.log_id);

    res.json({ msg: 'Log deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
