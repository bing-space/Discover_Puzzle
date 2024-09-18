const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('../models/review')

const PuzzleSchema = new Schema({
    title: String,
    piece: Number,
    size: String,
    manufacturer: String,
    image: String,
    keyword: Array,
    author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// Query Middleware
PuzzleSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Puzzle', PuzzleSchema);
