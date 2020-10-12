const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const taskServiceRep = require('../../db/task.db.memory');

// GET ALL TASKS BY BOARD ID
router.route('/').get(async (req, res) => {
  try {
    const tasks = await taskServiceRep.getAll(req.params.boardId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
  }
});

// GET TASK BY ID
router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await taskServiceRep.getTaskById(
      req.params.boardId,
      req.params.taskId
    );
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.log(error.message);
  }
});

// CREATE TASK
router.route('/').post(async (req, res) => {
  try {
    const task = await taskService.create(
      req.params.boardId,
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.body.boardId,
        columnId: req.body.columnId
      })
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(400).send('Bad request');
    console.log(error.message);
  }
});

// UPDATE TASK
router.route('/:taskId').put(async (req, res) => {
  try {
    const task = await taskServiceRep.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    if (task) {
      res.status(200).json(task);
    } else if (task === null) {
      res.status(404).send('Task not found');
    } else {
      res.status(400).send('Bad request');
    }
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE TASK
router.route('/:taskId').delete(async (req, res) => {
  try {
    const task = await taskServiceRep.removeTask(
      req.params.boardId,
      req.params.taskId
    );
    if (task) {
      res.status(204).send('The task has been deleted');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
