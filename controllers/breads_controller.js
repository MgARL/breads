const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')

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
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
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
  .catch(err => res.send('404'))
})
// DELETE
breads.delete('/:id', (req, res) => {
  Bread.deleteOne({ id: req.params.id})
    .then(
      res.status(303).redirect('/breads')
    ).catch(err => console.error(err))
})

// UPDATE
breads.put('/:id', (req, res) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.updateOne({id: req.params.id}, {
    name: req.body.name,
    hasGluten: req.body.hasGluten,
    image: req.body.image
  }).then(
    res.redirect(`/breads/${req.params.id}`)
  )
})

module.exports = breads