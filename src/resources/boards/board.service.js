const boardRepo = require('../../db/board.DB.repository');

const getAll = () => boardRepo.getAll();

const get = id => boardRepo.get(id);

const create = board => boardRepo.create(board);

const update = (id, board) => boardRepo.update(id, board);

const remove = id => boardRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
