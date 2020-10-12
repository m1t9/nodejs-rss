const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DBUsers = [new User()];
const DBBoards = [new Board()];
const DBTasks = [new Task(), new Task()];
// const DBUsers = [];
// const DBBoards = [];
// const DBTasks = [];

module.exports = { DBUsers, DBBoards, DBTasks };
