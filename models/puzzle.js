const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PuzzleSchema = new Schema({
    title: String,
    piece: Number,
    size: String,
    manufacturer: String,
    image: String,
    keyword: Array
});

module.exports = mongoose.model('Puzzle', PuzzleSchema);
