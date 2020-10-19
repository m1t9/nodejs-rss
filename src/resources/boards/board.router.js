const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

const { logger } = require('../../handler/logger');
const createError = require('http-errors');

// GET ALL BOARDS
router.route('/').get(async (req, res) => {
  try {
    const boards = await boardService.getAll();
    res.status(200).json(boards);
  } catch (error) {
    logger.log('error', error.message);
  }
});

// GET BOARD BY ID
router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.id);
    if (board) {
      res.json(Board.toResponse(board));
    } else {
      res.status(404).send('Board not found');
      const time = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      throw new createError(
        404,
        `${time} ROUTER: board METHOD: ${req.method} URL: ${req.originalUrl} MESSAGE: ${res.statusMessage} STATUS: ${res.statusCode}`,
        { status: res.statusCode }
      );
    }
  } catch (error) {
    logger.log('error', error.message);
  }
});

// CREATE NEW BOARD
router.route('/').post(async (req, res) => {
  try {
    const board = await boardService.create(
      new Board({
        title: req.body.title,
        columns: req.body.columns
      })
    );
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(400).send('Bad request');
      const time = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      throw new createError(
        404,
        `${time} ROUTER: board METHOD: ${req.method} URL: ${req.originalUrl} MESSAGE: ${res.statusMessage} STATUS: ${res.statusCode}`,
        { status: res.statusCode }
      );
    }
  } catch (error) {
    logger.log('error', error.message);
  }
});

// UPDATE BOARD BY ID
router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardService.update(req.params.id, req.body);
    if (board) {
      res.status(200).json(board);
    } else if (board === null) {
      res.status(404).send('Board not found');
      const time = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      throw new createError(
        404,
        `${time} ROUTER: board METHOD: ${req.method} URL: ${req.originalUrl} MESSAGE: ${res.statusMessage} STATUS: ${res.statusCode}`,
        { status: res.statusCode }
      );
    } else {
      res.status(400).send('Bad request');
      const time = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      throw new createError(
        404,
        `${time} ROUTER: board METHOD: ${req.method} URL: ${req.originalUrl} MESSAGE: ${res.statusMessage} STATUS: ${res.statusCode}`,
        { status: res.statusCode }
      );
    }
  } catch (error) {
    logger.log('error', error.message);
  }
});

// DELETE BOARD BY ID
router.route('/:id').delete(async (req, res) => {
  try {
    const del = await boardService.remove(req.params.id);
    if (del) {
      res.status(200).send('The board has been deleted');
    } else {
      res.status(404).send('Board not found');
      const time = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      throw new createError(
        404,
        `${time} ROUTER: board METHOD: ${req.method} URL: ${req.originalUrl} MESSAGE: ${res.statusMessage} STATUS: ${res.statusCode}`,
        { status: res.statusCode }
      );
    }
  } catch (error) {
    logger.log('error', error.message);
  }
});

module.exports = router;
