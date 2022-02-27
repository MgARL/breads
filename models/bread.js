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
  },
  baker: {
    type: Schema.Types.ObjectId,
    ref: 'Baker'
  }
})

breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker}`
}

breadSchema.statics.findByBaker = async function(bakerName) {
  let breadArr = await this.find({ baker: bakerName })
  return breadArr
}

const Bread = mongoose.model('Bread', breadSchema)

module.exports = Bread