const router = require('express').Router();
const { toResponse } = require('./board.model');
const boardService = require('./board.service');

const { OK, NO_CONTENT } = require('http-status-codes');
const wrapAsync = require('../../utils/wrapAsync');
const { id, boardBody } = require('../../utils/shema');
const validator = require('../../utils/validator');

// GET ALL BOARDS
router.get(
  '/',
  wrapAsync(async (req, res) => {
    const boards = await boardService.getAll();
    await res.status(OK).json(boards.map(toResponse));
  })
);

// GET BOARD BY ID
router.get(
  '/:id',
  validator(id, 'params'),
  wrapAsync(async (req, res) => {
    const board = await boardService.get(req.params.id);
    res.status(OK).send(toResponse(board));
  })
);

// CREATE NEW BOARD
router.post(
  '/',
  validator(boardBody, 'body'),
  wrapAsync(async (req, res) => {
    const board = await boardService.create(req.body);
    res.status(OK).send(toResponse(board));
  })
);

// UPDATE BOARD BY ID
router.put(
  '/:id',
  validator(id, 'params'),
  validator(boardBody, 'body'),
  wrapAsync(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    res.status(OK).send(toResponse(board));
  })
);

// DELETE BOARD BY ID
router.delete(
  '/:id',
  validator(id, 'params'),
  wrapAsync(async (req, res) => {
    await boardService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
