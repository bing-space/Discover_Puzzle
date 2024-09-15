const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const engine = require('ejs-mate');
const Puzzle = require('./models/puzzle')

mongoose.connect('mongodb://127.0.0.1:27017/discover-puzzle')
    .then(() =>{
        console.log("Connection Open")
    })
    .catch(err => {
        console.log("Error.......")
        console.log(err)
    })

app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

/**
 * CRUD Section
 */
app.get('/', (req, res) => {
    res.render('home')
})
// GET :: get the new puzzle form
app.get('/puzzles/new', (req,res) => {
    res.render('puzzles/new')
})
// POST :: post the new puzzle form
app.post('/puzzles', async(req,res) =>{
    const newPuzzle = new Puzzle(req.body);
    console.log(newPuzzle)
    await newPuzzle.save();
    res.redirect(`/puzzles/${newPuzzle._id}`)
})
// GET :: get puzzles list:
app.get('/puzzles', async (req, res) => {
    const puzzles = await Puzzle.find({});
    console.log(puzzles)
    res.render('puzzles/index', {puzzles})
})
// GET :: show puzzle detail by id
app.get('/puzzles/:id', async(req,res) => {
    const {id} = req.params;
    const puzzle = await Puzzle.findById(id);
    res.render('puzzles/show', {puzzle})
})
// GET :: get puzzle edit form
app.get('/puzzles/:id/edit', async(req,res)=> {
    const {id} = req.params;
    const puzzle = await Puzzle.findById(id);
    res.render('puzzles/edit', {puzzle})
})
// PUT :: update puzzle form
app.put('/puzzles/:id', async (req, res) => {
    const { id } = req.params;
    const puzzle = await Puzzle.findByIdAndUpdate(id, req.body, {runValidators: true})
    // console.log(puzzle)
    res.redirect(`/puzzles/${puzzle._id}`);
})
// DELETE :: delete the puzzle
app.delete('/puzzles/:id', async (req, res) => {
    const { id } = req.params;
    const puzzle = await Puzzle.findByIdAndDelete(id);
    res.redirect('/puzzles');
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})