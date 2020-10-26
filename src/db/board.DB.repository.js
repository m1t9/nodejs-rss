const { Board } = require('../resources/boards/board.model');
const { NOT_FOUND_ERROR } = require('../errors/appError');
const ENTITY_NAME = 'board';
const taskRepository = require('./task.DB.repository');

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);
  if (!board) throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  return board;
};

const create = async board => Board.create(board);

const update = async (id, board) => {
  const searchBoard = await Board.findById(id);
  if (!searchBoard) throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });

  await Board.updateOne({ _id: id }, board);
  return get(id);
};

const remove = async id => {
  const searchBoard = await Board.findById(id);
  if (!searchBoard) throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });

  // When somebody DELETE Board, all its Tasks should be deleted as well.
  taskRepository.removeTaskByBoardId(id);

  return Board.findByIdAndDelete(id);
};

module.exports = { getAll, get, create, update, remove };
