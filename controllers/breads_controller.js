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
                bread: Bread[req.params.arrayIndex]})
        } else {
            res.status(404).send('That Bread does not Exists');
        }
  })

module.exports = breads