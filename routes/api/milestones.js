const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Milestone = require('../../models/Milestone');

// @route GET api/milestones/:skill_id
// @desc Get milestones by skill ID
// @access Private
router.get('/:skill_id', auth, async (req, res) => {
  try {
    const milestones = await Milestone.find({ skill: req.params.skill_id })
      .populate('skill', ['title'])
      .populate('user', ['username']);

    if (!milestones) {
      return res.status(404).json({ msg: 'No milestones found' });
    }

    res.json(milestones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/milestones/:skill_id
// @desc Create new milestone by skill ID
// @access Private
router.post(
  '/:skill_id',
  [
    auth,
    check('title', 'Please include a valid milestone title')
      .not()
      .isEmpty(),
    check('hours', 'Invalid input for hours')
      .optional()
      .isInt(),
    check('minutes', 'Invalid input for minutes')
      .optional()
      .isInt({ min: 0, max: 59 }),
    check('seconds', 'Invalid input for seconds')
      .optional()
      .isInt({ min: 0, max: 59 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, hours, minutes, seconds } = req.body;

    // Build milestone object
    const milestoneFields = {};
    milestoneFields.user = req.user.id;
    milestoneFields.skill = req.params.skill_id;

    if (title) milestoneFields.title = title;

    milestoneFields.time_spent = {};
    if (hours) milestoneFields.time_spent.hours = hours;
    if (minutes) milestoneFields.time_spent.minutes = minutes;
    if (seconds) milestoneFields.time_spent.seconds = seconds;

    try {
      // Create milestone
      milestone = new Milestone(milestoneFields);

      await milestone.save();
      res.json(milestone);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/milestones/:skill_id/:milestone_id
// @desc Get milestone by milestone ID
// @access Private
router.get('/:skill_id/:milestone_id', auth, async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.milestone_id)
      .populate('skill', ['title'])
      .populate('user', ['username']);

    if (!milestone) {
      return res.status(404).json({ msg: 'Milestone not found' });
    }

    // Check user
    if (milestone.user._id.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'User not authorized'
      });
    }

    res.json(milestone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/milestones/:skill_id/:milestone_id
// @desc Update milestone by milestone ID
// @access Private
router.put(
  '/:skill_id/:milestone_id',
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

    const { hours, minutes, seconds } = req.body;

    const milestoneFields = {
      ...req.body,
      user: req.user.id,
      skill: req.params.skill_id,
      time_spent: { hours, minutes, seconds }
    };

    try {
      let milestone = await Milestone.findById(req.params.milestone_id);

      if (!milestone) {
        return res.status(404).json({ msg: 'Milestone not found' });
      }

      if (milestone) {
        // Check user
        if (milestone.user._id.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
        milestone = await Milestone.findByIdAndUpdate(
          req.params.milestone_id,
          { $set: milestoneFields },
          { new: true }
        );
      }

      res.json(milestone);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/milestones/:skill_id/:milestone_id
// @desc Delete milestone by milestone ID
// @access Private
router.delete('/:skill_id/:milestone_id', auth, async (req, res) => {
  try {
    // Delete milestone
    await Milestone.findByIdAndDelete(req.params.milestone_id);

    res.json({ msg: 'Milestone deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
