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
//Index?
baker.get('/', async (req, res) => {
    try {
        const foundBakers = await Baker.find().populate('breads')
        res.send(foundBakers)
    } catch (error) {
        res.render('404', {
            message: error.message
        })
    }
})
// show
baker.get('/:id', async (req, res) =>{
    const foundBaker = await Baker.findById(req.params.id).populate('breads')
    res.render('bakerShow', {
        baker: foundBaker
    })
})

module.exports = baker