const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

// GET ALL BOARDS
router.route('/').get(async (req, res) => {
  try {
    const boards = await boardService.getAll();
    res.status(200).json(boards);
  } catch (error) {
    console.log(error.message);
  }
});

// GET BOARD BY ID
router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.id);
    if (board) {
      return res.json(Board.toResponse(board));
    }
    res.status(404).send('Board not found');
  } catch (error) {
    console.log(error.message);
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
    }
  } catch (error) {
    console.log(error.message);
  }
});

// UPDATE BOARD BY ID
router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardService.update(req.params.id, req.body);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).send('Board not found');
    }
  } catch (error) {
    console.log(error.message);
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
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
