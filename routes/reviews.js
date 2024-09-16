const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review');
const Puzzle = require('../models/puzzle');
const {reviewSchema} = require('../schemas.js')


const validateReview = (req,res, next) => {
    const {error} = reviewSchema.validate(req.body);
    console.log(error)
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

// Post review
router.post('/',validateReview, catchAsync( async (req, res) => {
    const puzzle = await Puzzle.findById(req.params.id)
    const review = new Review(req.body.review)
    puzzle.reviews.push(review)
    await review.save();
    await puzzle.save();
    res.redirect(`/puzzles/${puzzle._id}`)
}))
// Delete review
router.delete('/:reviewId', catchAsync(async(req, res) => {
    const { id, reviewId } = req.params;
    await Puzzle.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(req.params.reviewId) // Will call middleware
    res.redirect(`/puzzles/${id}`)
}))

module.exports = router;
