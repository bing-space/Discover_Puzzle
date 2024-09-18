const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const Puzzle = require('../models/puzzle');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')

// Post review
router.post('/',isLoggedIn, validateReview, catchAsync( async (req, res) => {
    const puzzle = await Puzzle.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user._id;
    puzzle.reviews.push(review)
    await review.save();
    await puzzle.save();
    res.redirect(`/puzzles/${puzzle._id}`)
}))
// Delete review
router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(async(req, res) => {
    const { id, reviewId } = req.params;
    await Puzzle.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(req.params.reviewId) // Will call middleware
    res.redirect(`/puzzles/${id}`)
}))

module.exports = router;
