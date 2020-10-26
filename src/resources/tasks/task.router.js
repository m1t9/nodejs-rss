const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { toResponse } = require('./task.model');

const { OK, NO_CONTENT } = require('http-status-codes');
const wrapAsync = require('../../utils/wrapAsync');
const { taskIdentification, taskBody } = require('../../utils/shema');
const validator = require('../../utils/validator');

// GET ALL TASKS BY BOARD ID
router.get(
  '/',
  wrapAsync(async (req, res) => {
    const tasks = await taskService.getAll(req.params.boardId);
    await res.status(OK).json(tasks.map(toResponse));
  })
);

// GET TASK BY ID
router.get(
  '/:taskId',
  validator(taskIdentification, 'params'),
  wrapAsync(async (req, res) => {
    const task = await taskService.get(req.params.boardId, req.params.taskId);
    res.status(OK).send(toResponse(task));
  })
);

// CREATE TASK
router.post(
  '/',
  validator(taskBody, 'body'),
  wrapAsync(async (req, res) => {
    const task = await taskService.create(req.params.boardId, req.body);
    res.status(OK).send(toResponse(task));
  })
);

// UPDATE TASK
router.put(
  '/:taskId',
  validator(taskIdentification, 'params'),
  validator(taskBody, 'body'),
  wrapAsync(async (req, res) => {
    const user = await taskService.update(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.status(OK).send(toResponse(user));
  })
);

// DELETE TASK
router.delete(
  '/:taskId',
  validator(taskIdentification, 'params'),
  wrapAsync(async (req, res) => {
    await taskService.remove(req.params.boardId, req.params.taskId);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
