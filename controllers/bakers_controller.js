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
        const foundBakers = await Baker.find().populate({
            path:'breads',
            options: { limit: 2}
        })
        res.send(foundBakers)
    } catch (error) {
        res.render('404', {
            message: error.message
        })
    }
})
// show
baker.get('/:id', async (req, res) =>{
    const foundBaker = await Baker.findById(req.params.id).populate({
        path:'breads',
        options: { limit: 5}
    })
    res.render('bakerShow', {
        baker: foundBaker
    })
})

// delete
baker.delete('/:id', async (req, res) => {
    try {
        const deletedBaker = await Baker.findByIdAndDelete(req.params.id)
        res.status(303).redirect('/breads')
    } catch (error) {
        console.log(error)
    }
})

module.exports = baker