const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Puzzle = require('../models/puzzle')
const { title, piece, size } = require('./seedHelpers')


mongoose.connect('mongodb://127.0.0.1:27017/discover-puzzle')
    .then(() => {
        console.log("Connection Open")
    })
    .catch(err => {
        console.log("Error.......")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Puzzle.deleteMany({}) // Delete Everything
    for (let i = 0; i < 20; i++) {
        const random1000 = Math.floor(Math.random() * 10);
        const createPuzzle = new Puzzle({
            title: `${sample(title)}`,
            piece: `${sample(piece)}`,
            size:  `${sample(size)}`
        })
        await createPuzzle.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})