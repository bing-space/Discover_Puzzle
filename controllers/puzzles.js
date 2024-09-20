const { model } = require('mongoose');
const Puzzle = require('../models/puzzle');

module.exports.index = async (req, res) => {
    const puzzles = await Puzzle.find({});
    res.render('puzzles/index', {puzzles})
}
module.exports.renderNewForm = (req, res) => {
    res.render('puzzles/new')
}
module.exports.createPuzzle = async (req, res) => { 
    const newPuzzle = new Puzzle(req.body.puzzle);
    newPuzzle.author = req.user._id;
    await newPuzzle.save();
    req.flash('success','Successfully made a new puzzle')
    console.log(newPuzzle);
    // Redirect
    res.redirect(`/puzzles/${newPuzzle._id}`)
}
module.exports.showPuzzle = async (req, res) =>{
    const {id} = req.params;
    const puzzle = await Puzzle.findById(id).populate({path: 'reviews', populate: {path: 'author'}}).populate('author');
    if(!puzzle){
        req.flash('error','Cannot find that puzzle')
        return res.redirect(`/puzzles`)
    }
    res.render('puzzles/show', {puzzle})
}
module.exports.renderEditForm = async (req,res) => {
    const {id} = req.params;
    const puzzle = await Puzzle.findById(id);
    if(!puzzle){
        req.flash('error','Cannot find that puzzle')
        return res.redirect(`/puzzles`)
    }
    res.render('puzzles/edit', {puzzle})
}
module.exports.updatePuzzle = async (req, res) => {
    const { id } = req.params;
    const puzzle = await Puzzle.findByIdAndUpdate(id, req.body.puzzle, {runValidators: true})
    req.flash('success','Successfully updated a new puzzle')
    res.redirect(`/puzzles/${puzzle._id}`);
}
module.exports.deletePuzzle = async (req, res) => {
    const { id } = req.params;
    await Puzzle.findByIdAndDelete(id);
    req.flash('success','Successfully deleted puzzle')
    res.redirect('/puzzles');
}