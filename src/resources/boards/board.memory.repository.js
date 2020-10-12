const DBboard = require('../../db/board.db.memory');

const getAll = async () => DBboard.getAllBoards();

const get = async id => DBboard.getBoard(id);

const create = async board => DBboard.createBoard(board);

const update = async (id, board) => DBboard.updateBoard(id, board);

const remove = async id => DBboard.deleteBoard(id);

module.exports = { getAll, get, create, update, remove };
