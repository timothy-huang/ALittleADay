const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Skill = require('../../models/Skill');

// @route GET api/skills/user/me
// @desc Get current user's skills
// @access Private
router.get('/user/me', auth, async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id }).populate('user', [
      'username'
    ]);

    if (!skills) {
      return res.status(404).json({ msg: 'This user has no skills' });
    }

    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/skills/
// @desc Create a skill
// @access Private
router.post(
  '/',
  [
    auth,
    check('title', 'Please include a valid skill title')
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

    // Build skill object
    const skillFields = {};
    skillFields.user = req.user.id;

    if (title) skillFields.title = title;

    skillFields.time_spent = {};
    if (hours) skillFields.time_spent.hours = hours;
    if (minutes) skillFields.time_spent.minutes = minutes;
    if (seconds) skillFields.time_spent.seconds = seconds;

    try {
      // Create skill
      skill = new Skill(skillFields);

      await skill.save();
      res.json(skill);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/skills/user/:user_id
// @desc Get all skills by user ID
// @access Private
router.get('/user/:id', auth, async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id });

    if (!skills) {
      return res.status(404).json({ msg: 'User skills not found' });
    }

    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/skills/:id
// @desc Get a skill by skill id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }

    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/skills/:id
// @desc Update a skill
// @access Private
router.put(
  '/:id',
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
    const skillFields = {
      ...req.body,
      user: req.user.id,
      time_spent: { hours, minutes, seconds }
    };

    try {
      let skill = await Skill.findById(req.params.id);

      if (!skill) {
        return res.status(404).json({ msg: 'Skill not found' });
      }

      if (skill) {
        // Check user
        if (skill.user._id.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
        skill = await Skill.findByIdAndUpdate(
          req.params.id,
          { $set: skillFields },
          { new: true }
        );
      }

      res.json(skill);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/skills/:id
// @desc Delete a skill by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Delete Skill
    await Skill.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Skill deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
