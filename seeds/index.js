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
            size:  `${sample(size)}`,
            manufacturer: 'Manufacturer Name',
            imageUrl: 'https://images.unsplash.com/photo-1598983868388-46f2c98b2e77?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            keyword: ['cartoon','snoopy','peanuts']
        })
        await createPuzzle.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})