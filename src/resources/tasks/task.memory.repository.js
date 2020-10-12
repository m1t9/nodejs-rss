const DBtask = require('../../db/task.db.memory');

const get = async boardId => DBtask.getAll(boardId);

const getTaskById = async (boardId, taskId) =>
  DBtask.getTaskById(boardId, taskId);

const create = async (boardId, task) => DBtask.createTask(boardId, task);

const update = (boardId, taskId, task) =>
  DBtask.updateTask(boardId, taskId, task);

const remove = (boardId, taskId) => DBtask.removeTask(boardId, taskId);

module.exports = { get, getTaskById, create, update, remove };
