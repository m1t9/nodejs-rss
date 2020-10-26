const { Task } = require('../resources/tasks/task.model');
const { NOT_FOUND_ERROR } = require('../errors/appError');
const ENTITY_NAME = 'task';

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId }).exec();
  if (!task) throw new NOT_FOUND_ERROR(ENTITY_NAME, { taskId, boardId });
  return Task.findOne({ _id: taskId, boardId });
};

const create = async (boardId, taskBody) => {
  const { title, order, description, userId, columnId } = taskBody;
  return Task.create({ title, order, description, userId, boardId, columnId });
};

const update = async (id, taskId, body) => {
  // const task = await Task.findOne({ _id : taskId, id }).exec();
  // if (!task) throw new NOT_FOUND_ERROR(ENTITY_NAME, {taskId, id});
  const { title, order, description, userId, boardId, columnId } = body;

  return Task.findOneAndUpdate(
    { _id: taskId, boardId: id },
    { title, order, description, userId, boardId, columnId },
    { new: true }
  );
};

const remove = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId }).exec();
  if (!task) throw new NOT_FOUND_ERROR(ENTITY_NAME, { taskId, boardId });

  return Task.deleteOne({ _id: taskId, boardId });
};

// When somebody DELETE Board, all its Tasks should be deleted as well.
const removeTaskByBoardId = async boardId => {
  return Task.deleteMany({ boardId });
};

// When somebody DELETE User, all Tasks where User is assignee should be updated to put userId=null.
const usersToNull = async userId => {
  return Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  removeTaskByBoardId,
  usersToNull
};
