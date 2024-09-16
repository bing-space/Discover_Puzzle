const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Puzzle = require('../models/puzzle');
const {puzzleSchema} = require('../schemas.js')

const validatePuzzle = (req,res, next) => {
    const {error} = puzzleSchema.validate(req.body);
    console.log(error)
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

// GET :: get the new puzzle form
router.get('/new', (req,res) => {
    res.render('puzzles/new')
})
// POST :: post the new puzzle form
router.post('/', validatePuzzle, catchAsync(async(req,res) =>{
    const newPuzzle = new Puzzle(req.body.puzzle);
    console.log(newPuzzle)
    await newPuzzle.save();
    res.redirect(`/puzzles/${newPuzzle._id}`)
}))
// GET :: get puzzles list:
router.get('/', catchAsync(async (req, res) => {
    const puzzles = await Puzzle.find({});
    console.log(puzzles)
    res.render('puzzles/index', {puzzles})
}))
// GET :: show puzzle detail by id
router.get('/:id', catchAsync(async(req,res) => {
    const {id} = req.params;
    const puzzle = await Puzzle.findById(id).populate('reviews');;
    res.render('puzzles/show', {puzzle})
}))
// GET :: get puzzle edit form
router.get('/:id/edit', catchAsync(async(req,res)=> {
    const {id} = req.params;
    const puzzle = await Puzzle.findById(id);
    res.render('puzzles/edit', {puzzle})
}))
// PUT :: update puzzle form
router.put('/:id', validatePuzzle, catchAsync(async (req, res) => {
    if(!req.body.puzzle) throw new ExpressError('Invalid Puzzle Data', 400)
    const { id } = req.params;
    const puzzle = await Puzzle.findByIdAndUpdate(id, req.body.puzzle, {runValidators: true})
    // console.log(puzzle)
    res.redirect(`/puzzles/${puzzle._id}`);
}))
// DELETE :: delete the puzzle
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const puzzle = await Puzzle.findByIdAndDelete(id);
    res.redirect('/puzzles');
}))

module.exports = router;
