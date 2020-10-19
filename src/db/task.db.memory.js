const Task = require('../resources/tasks/task.model');
const DB = require('./inMemoryDb');
let DBtask = DB.DBTasks;
const { logger } = require('../handler/logger');

const getAll = async boardId => DBtask.filter(el => el.boardId === boardId);

const getTaskById = async (boardId, taskId) => {
  try {
    const tasks = await getAll(boardId);
    return tasks.filter(el => el.id === taskId)[0];
  } catch (error) {
    logger.log('error', error.message);
  }
};

const createTask = async (boardId, taskBody) => {
  try {
    const task = new Task(taskBody);
    task.boardId = boardId;
    await DBtask.push(task);
    const newTask = await getTaskById(task.boardId, task.id);
    if (!newTask) {
      return null;
    }
    return newTask;
  } catch (error) {
    logger.log('error', error.message);
  }
};

const updateTask = async (boardId, taskId, taskBody) => {
  try {
    const task = await getTaskById(boardId.toString(), taskId.toString());
    if (!task) return null;

    for (const [key, value] of Object.entries(taskBody)) {
      task[key.toString()] = value;
    }

    DBtask[taskId.toString()] = task;
    return task;
  } catch (error) {
    logger.log('error', error.message);
  }
};

const removeTask = async (boardId, taskId) => {
  try {
    const index = DBtask.indexOf(await getTaskById(boardId, taskId));
    if (index < 0) return false;
    DBtask.splice(index, 1);
    return true;
  } catch (error) {
    logger.log('error', error.message);
  }
};

// When somebody DELETE Board, all its Tasks should be deleted as well.
const removeTaskByBoardId = async boardId => {
  DBtask = DBtask.filter(el => el.boardId !== boardId);
};

// When somebody DELETE User, all Tasks where User is assignee should be updated to put userId=null.
const usersToNull = async id => {
  DBtask.filter(el => el.userId === id).map(el => (el.userId = null));
};

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  removeTask,
  removeTaskByBoardId,
  usersToNull
};
