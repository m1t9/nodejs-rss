const taskService = require('../db/task.db.memory');
const DBmain = require('./inMemoryDb');
const DBboard = DBmain.DBBoards;
const { logger } = require('../handler/logger');

const getAllBoards = async () => DBboard.slice(0);

const getBoard = async id => await DBboard.filter(el => el.id === id)[0];

const createBoard = async board => {
  const newBoard = board;
  await DBboard.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, boardBody) => {
  try {
    const board = await getBoard(id);
    if (!board) return null;
    for (const [key, value] of Object.entries(boardBody)) {
      board[key] = value;
    }
    DBboard[id] = board;
    return board;
  } catch (error) {
    logger.log('error', error.message);
  }
};

const deleteBoard = async id => {
  try {
    const board = await getBoard(id.toString());
    if (!board) return false;
    const index = DBboard.indexOf(board);

    // When somebody DELETE Board, all its Tasks should be deleted as well.
    await taskService.removeTaskByBoardId(board.id);

    if (index < 0) return null;
    DBboard.splice(index, 1);
    return true;
  } catch (error) {
    logger.log('error', error.message);
  }
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
