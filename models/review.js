const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    funRating: Number,
    difficultyRating: Number,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Review', reviewSchema);