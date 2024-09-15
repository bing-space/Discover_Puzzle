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