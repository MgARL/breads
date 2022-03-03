const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')
const seedArray = require('../models/seedArray')
const Baker = require('../models/baker')

// INDEX
breads.get('/', async (req, res) => {
  try {
    const foundBreads = await Bread.find().populate({
      path:'baker', 
      options: {limit: 2}
    }).limit(10).lean()
    const foundBakers = await Baker.find().lean()
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
breads.get('/:id', async (req, res) => {
try {
  let foundBread = await Bread.findById(req.params.id).populate('baker')
  res.render('show', { bread: foundBread })
} catch (error) {
  res.render('404')
}

})
// DELETE
breads.delete('/:id', async (req, res) => {
try {
  let deletedBread = await Bread.findByIdAndDelete(req.params.id)
  res.status(303).redirect('/breads')

} catch (error) {
  res.render('404')
}
})

// UPDATE
breads.put('/:id', async (req, res) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }

  try {
    let updatedBread = await Bread.findByIdAndUpdate(req.params.id,  req.body, { new: true })
    res.redirect(`/breads/${req.params.id}`)
  } catch (error) {
   res.render('404')
  }
})

// SEED ROUTE

breads.get('/data/seed', async (req, res) =>{
  try {
    let createdBreads = await Bread.insertMany(seedArray)
    res.redirect('/breads')
  } catch (error) {
   console.log(error) 
  }
})

module.exports = breads