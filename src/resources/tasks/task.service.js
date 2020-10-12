const taskRepo = require('./task.memory.repository');

const get = boardId => taskRepo.get(boardId);

const getTaskById = (boardId, taskId) => taskRepo.getTaskById(boardId, taskId);

const create = (boardId, task) => taskRepo.create(boardId, task);

const update = (boardId, taskId, task) =>
  taskRepo.update(boardId, taskId, task);

const remove = (boardId, taskId) => taskRepo.remove(boardId, taskId);

module.exports = { get, getTaskById, create, update, remove };
