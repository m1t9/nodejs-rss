const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

const { logger } = require('../../handler/logger');
const createError = require('http-errors');

router.route('/').get(async (req, res) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch (error) {
    logger.log('error', error.message);
  }
});

// GET USER BY ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.get(req.params.id);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(404).send('User not found');
      const time = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      throw new createError(
        404,
        `${time} ROUTER: user METHOD: ${req.method} URL: ${req.originalUrl} MESSAGE: ${res.statusMessage} STATUS: ${res.statusCode}`,
        { status: res.statusCode }
      );
    }
  } catch (error) {
    logger.log('error', error.message);
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
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(400).send('User create error');
      const time = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      throw new createError(
        404,
        `${time} ROUTER: user METHOD: ${req.method} URL: ${req.originalUrl} MESSAGE: ${res.statusMessage} STATUS: ${res.statusCode}`,
        { status: res.statusCode }
      );
    }
  } catch (error) {
    logger.log('error', error.message);
  }
});

// UPDATE USER BY ID
router.route('/:id').put(async (req, res) => {
  try {
    const user = await userService.update(
      req.params.id,
      // new User({
      //   login: req.body.login,
      //   password: req.body.password,
      //   name: req.body.name
      // })
      req.body
    );
    if (user) {
      // res.status(200).json(User.toResponse(await userService.get(req.params.id)));
      res.status(200).json(User.toResponse(user));
    } else if (user === null) {
      res.status(404).send('User not found');
      const time = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      throw new createError(
        404,
        `${time} ROUTER: user METHOD: ${req.method} URL: ${req.originalUrl} MESSAGE: ${res.statusMessage} STATUS: ${res.statusCode}`,
        { status: res.statusCode }
      );
    } else {
      res.status(400).send('User update error');
      const time = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      throw new createError(
        404,
        `${time} ROUTER: user METHOD: ${req.method} URL: ${req.originalUrl} MESSAGE: ${res.statusMessage} STATUS: ${res.statusCode}`,
        { status: res.statusCode }
      );
    }
  } catch (error) {
    logger.log('error', error.message);
  }
});

// DELETE USER
router.route('/:id').delete(async (req, res) => {
  try {
    const user = await userService.remove(req.params.id);
    if (user) {
      res.status(204).send('User delete successfully');
    } else {
      res.status(404).send('User not found');
      const time = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      throw new createError(
        404,
        `${time} ROUTER: user METHOD: ${req.method} URL: ${req.originalUrl} MESSAGE: ${res.statusMessage} STATUS: ${res.statusCode}`,
        { status: res.statusCode }
      );
    }
  } catch (error) {
    logger.log('error', error.message);
  }
});

module.exports = router;
