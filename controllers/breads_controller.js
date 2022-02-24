const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')
const seedArray = require('../models/seedArray')

// INDEX
breads.get('/', (req, res) => {
  Bread.find()
    .then(foundBreads => {
      res.render('index', {
        "breads": foundBreads,
        "title": 'Index Page'
      })
    })
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
    console.log(message)
    res.render('404', { message: message })
  }
})

// New
breads.get('/new', (req, res) => {
  res.render('new')
})


// EDIT
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
  .then( foundBread => {
    res.render('edit', {
      bread: foundBread
    })
  })
})
// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
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
    console.log(updatedBread)
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