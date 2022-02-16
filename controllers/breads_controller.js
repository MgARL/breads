const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')

// INDEX
breads.get('/', (req, res) => {
    res.render('index', {
        "breads": Bread,
        "title": 'Index Page'
    })
//   res.send(Bread)
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
        const  bread = Bread[req.params.arrayIndex]
        if(bread){
            res.render('show', {
                bread: Bread[req.params.arrayIndex],
                index: req.params.arrayIndex
            })

         } else {
            res.status(404).render('404');
        }
})
// DELETE
breads.delete('/:indexArray', (req, res) => {
    Bread.splice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
  })

module.exports = breads