const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')
const seedArray = require('../models/seedArray')
const Baker = require('../models/baker')

// INDEX
breads.get('/', async (req, res) => {
  try {
    const foundBreads = await Bread.find().populate('baker')
    const foundBakers = await Baker.find()
    res.render('index', {
      breads: foundBreads,
      bakers: foundBakers, 
      title: 'Index Page'
    })
  } catch (error) {
    console.error(error)
  }
})
// Joey Breads
breads.get('/baker/:baker', async (req, res) =>{
  try {
    const breadsArr = await Bread.findByBaker(req.params.baker)
    console.log(req.params.baker)
    res.render('bakerBreads', {
      breads : breadsArr,
      baker : req.params.baker
    })
  } catch (error) {
    const { message } = error
    res.render('404', { message: message } )
  }
})
// Create
breads.post('/', async (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  } try {
    const createdBread = await Bread.create(req.body)
    res.redirect('/breads')
    
  } catch (error) {
    const { message } = error
    res.render('404', { message: message })
  }
})

// New
breads.get('/new', async (req, res) => {
  try {
    const foundBakers = await Baker.find()
    res.render('new', { bakers: foundBakers })
    
  } catch (error) {
    console.error(error)
  }
})


// EDIT
breads.get('/:id/edit', async (req, res) => {
  try {
    const foundBread = await Bread.findById(req.params.id)
    const  foundBakers = await Baker.find()
    res.render('edit', {
      bread: foundBread,
      bakers: foundBakers
    })
  } catch (error) {
    console.error(error)
  }
})
// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
  .populate('baker')
  .then( foundBread => {
    res.render('show', {
      bread: foundBread
    })
  })
  .catch(err => res.render('404'))
})
// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
    .then(
      res.status(303).redirect('/breads')
    )
    .catch(err => res.render('404'))
})

// UPDATE
breads.put('/:id', (req, res) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id,  req.body, { new: true })
  .then( updatedBread => {
    res.redirect(`/breads/${req.params.id}`)
  })
  .catch(err => res.render('404'))
})

// SEED ROUTE

breads.get('/data/seed', (req, res) =>{
  Bread.insertMany(seedArray)
    .then(createdBreads => {
      res.redirect('/breads')
    })
})

module.exports = breads