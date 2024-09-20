const Review = require('../models/review');
const Puzzle = require('../models/puzzle');

module.exports.createReview = async (req, res) => {
    const puzzle = await Puzzle.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user._id;
    puzzle.reviews.push(review)
    await review.save();
    await puzzle.save();
    req.flash('success','Created new review')
    res.redirect(`/puzzles/${puzzle._id}`)
}
module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;
    await Puzzle.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(req.params.reviewId) // Will call middleware
    req.flash('success','Successfully deleted review')
    res.redirect(`/puzzles/${id}`)
}