const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')

// INDEX
breads.get('/', (req, res) => {
    res.render('index', {
        "breads": Bread
    })
//   res.send(Bread)
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
    const  bread = Bread[req.params.arrayIndex]
    if(bread){
        res.send(Bread[req.params.arrayIndex])
    } else {
        res.send('That Bread does not Exists');
    }
  })

module.exports = breads