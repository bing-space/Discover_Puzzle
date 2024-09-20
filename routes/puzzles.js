const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validatePuzzle} = require('../middleware')
const puzzles = require('../controllers/puzzles')

// GET:: get puzzles list
// POST:: create new puzzle - post the puzzle form
router.route('/')
    .get(catchAsync(puzzles.index))
    .post(validatePuzzle, isLoggedIn, catchAsync(puzzles.createPuzzle))

// GET:: render the new puzzle form
router.get('/new',isLoggedIn, puzzles.renderNewForm)

// GET:: get puzzle detail page
// PUT:: update puzzle data
// DELETE:: deletes puzzle
router.route('/:id')
    .get(catchAsync(puzzles.showPuzzle))
    .put(isLoggedIn, isAuthor, validatePuzzle, catchAsync(puzzles.updatePuzzle))
    .delete(isLoggedIn,isAuthor, catchAsync(puzzles.deletePuzzle))
    
// GET:: render the puzzle form with data
router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(puzzles.renderEditForm))

module.exports = router;
