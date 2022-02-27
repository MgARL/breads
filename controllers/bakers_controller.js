const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker')
const bakerSeed = require('../models/baker_seed')

// controllers

// seed route

baker.get('/data/seed', async (req, res) => {
    try {
        await Baker.insertMany(bakerSeed)
        res.redirect('/breads')
    } catch (error) {
        console.error(error)
    }
})

module.exports = baker