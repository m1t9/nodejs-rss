const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch (error) {
    res.status(401).send('Access token is missing or invalid');
    console.log(error.message);
  }
});

// GET USER BY ID
router.route('/:id').get(async (req, res) => {
  try {
    const user = await userService.get(req.params.id);
    res.status(200).json(User.toResponse(user));
  } catch (error) {
    res.status(404).send(error.message);
    console.log(error.message);
  }
});

// CREATE USER
router.route('/').post(async (req, res) => {
  try {
    const user = await userService.create(
      new User({
        login: req.body.login,
        assword: req.body.password,
        name: req.body.name
      })
    );
    res.status(200).json(User.toResponse(user));
  } catch (error) {
    res.status(400).send('User create error');
    console.log(error.message);
  }
});

// UPDATE USER BY ID
router.route('/:id').put(async (req, res) => {
  try {
    await userService.update(
      req.params.id,
      new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name
      })
    );
    res.status(200).json(User.toResponse(await userService.get(req.params.id)));
  } catch (error) {
    res.status(400).send('User update error');
    console.log(error.message);
  }
});

// DELETE USER
router.route('/:id').delete(async (req, res) => {
  try {
    const user = userService.remove(req.params.id);
    if (user) {
      res.status(204).send('The user has been deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400);
    console.log(error.message);
  }
});

module.exports = router;
