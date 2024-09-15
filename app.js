const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const {puzzleSchema} = require('./schemas.js')
const Puzzle = require('./models/puzzle');

mongoose.connect('mongodb://127.0.0.1:27017/discover-puzzle')
    .then(() =>{
        console.log("Connection Open")
    })
    .catch(err => {
        console.log("Error.......")
        console.log(err)
    })

// Middleware
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

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
app.post('/puzzles', validatePuzzle, catchAsync(async(req,res) =>{
    const newPuzzle = new Puzzle(req.body.puzzle);
    console.log(newPuzzle)
    await newPuzzle.save();
    res.redirect(`/puzzles/${newPuzzle._id}`)
}))
// GET :: get puzzles list:
app.get('/puzzles', catchAsync(async (req, res) => {
    const puzzles = await Puzzle.find({});
    console.log(puzzles)
    res.render('puzzles/index', {puzzles})
}))
// GET :: show puzzle detail by id
app.get('/puzzles/:id', catchAsync(async(req,res) => {
    const {id} = req.params;
    const puzzle = await Puzzle.findById(id);
    res.render('puzzles/show', {puzzle})
}))
// GET :: get puzzle edit form
app.get('/puzzles/:id/edit', catchAsync(async(req,res)=> {
    const {id} = req.params;
    const puzzle = await Puzzle.findById(id);
    res.render('puzzles/edit', {puzzle})
}))
// PUT :: update puzzle form
app.put('/puzzles/:id', validatePuzzle, catchAsync(async (req, res) => {
    if(!req.body.puzzle) throw new ExpressError('Invalid Puzzle Data', 400)
    const { id } = req.params;
    const puzzle = await Puzzle.findByIdAndUpdate(id, req.body.puzzle, {runValidators: true})
    // console.log(puzzle)
    res.redirect(`/puzzles/${puzzle._id}`);
}))
// DELETE :: delete the puzzle
app.delete('/puzzles/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const puzzle = await Puzzle.findByIdAndDelete(id);
    res.redirect('/puzzles');
}))

// Handle Error
app.all('*', (req,res,next) => {
    next(new ExpressError('Page Not Found',404))
})
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong'
    res.status(statusCode).render('error', {err});
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})