const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Puzzle = require('../models/puzzle');
const {isLoggedIn, isAuthor, validatePuzzle} = require('../middleware')

// GET :: get the new puzzle form
router.get('/new',isLoggedIn, (req,res) => {
    res.render('puzzles/new')
})
// POST :: post the new puzzle form
router.post('/', validatePuzzle,isLoggedIn, catchAsync(async(req,res) =>{
    const newPuzzle = new Puzzle(req.body.puzzle);
    newPuzzle.author = req.user._id;
    console.log(newPuzzle)
    await newPuzzle.save();
    req.flash('success','Successfully made a new puzzle')
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
    const puzzle = await Puzzle.findById(id).populate({path: 'reviews', populate: {path: 'author'}}).populate('author');
    if(!puzzle){
        req.flash('error','Cannot find that puzzle')
        return res.redirect(`/puzzles`)
    }
    res.render('puzzles/show', {puzzle})
}))
// GET :: get puzzle edit form
router.get('/:id/edit',isLoggedIn, catchAsync(async(req,res)=> {
    const {id} = req.params;
    const puzzle = await Puzzle.findById(id);
    if(!puzzle){
        req.flash('error','Cannot find that puzzle')
        return res.redirect(`/puzzles`)
    }
    res.render('puzzles/edit', {puzzle})
}))
// PUT :: update puzzle form
router.put('/:id', validatePuzzle,isLoggedIn,isAuthor, catchAsync(async (req, res) => {
    // if(!req.body.puzzle) throw new ExpressError('Invalid Puzzle Data', 400)
    const { id } = req.params;
    const puzzle = await Puzzle.findByIdAndUpdate(id, req.body.puzzle, {runValidators: true})
    req.flash('success','Successfully updated a puzzle')
    // console.log(puzzle)
    res.redirect(`/puzzles/${puzzle._id}`);
}))
// DELETE :: delete the puzzle
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Puzzle.findByIdAndDelete(id);
    req.flash('success','Successfully deleted puzzle')
    res.redirect('/puzzles');
}))

module.exports = router;
