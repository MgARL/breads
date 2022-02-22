// require mongoose
const mongoose = require('mongoose')
// creating the shorthand for the schema constructor
const { Schema } = mongoose

const breadSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  hasGluten : Boolean,
  image: { 
    type: String, 
    default: 'http://place-hold.it/500x500.png'
  }
})

const Bread = mongoose.model('Bread', breadSchema)

module.exports = Bread