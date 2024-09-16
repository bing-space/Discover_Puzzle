const Joi = require('joi');

module.exports.puzzleSchema = Joi.object({
    puzzle: Joi.object({
        title: Joi.string().required(),
        piece: Joi.number().required().min(0),
        size: Joi.string().required(),
        image: Joi.string().required(),
        manufacturer: Joi.string().required(),
        keyword: Joi.string().required()
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        funRating: Joi.number().required().min(1).max(5),
        difficultyRating: Joi.number().required().min(1).max(5)
    }).required()
})