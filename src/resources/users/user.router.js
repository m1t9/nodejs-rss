const router = require('express').Router();
const { toResponse } = require('./user.model');
const userService = require('./user.service');

const { OK, NO_CONTENT } = require('http-status-codes');
const wrapAsync = require('../../utils/wrapAsync');
const { id, userBody } = require('../../utils/shema');
const validator = require('../../utils/validator');

// GET ALL USERS
router.get(
  '/',
  wrapAsync(async (req, res) => {
    const users = await userService.getAll();
    await res.status(OK).json(users.map(toResponse));
  })
);

// GET USER BY ID
router.get(
  '/:id',
  validator(id, 'params'),
  wrapAsync(async (req, res) => {
    const user = await userService.get(req.params.id);
    res.status(OK).send(toResponse(user));
  })
);

// CREATE USER
router.post(
  '/',
  validator(userBody, 'body'),
  wrapAsync(async (req, res) => {
    const user = await userService.create(req.body);
    res.status(OK).send(toResponse(user));
  })
);

// UPDATE USER BY ID
router.put(
  '/:id',
  validator(id, 'params'),
  validator(userBody, 'body'),
  wrapAsync(async (req, res) => {
    const user = await userService.update(req.params.id, req.body);
    res.status(OK).send(toResponse(user));
  })
);

// DELETE USER
router.delete(
  '/:id',
  validator(id, 'params'),
  wrapAsync(async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
