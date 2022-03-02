// dependencies
const mongoose = require('mongoose')
const { Schema } = mongoose
const Bread = require('./bread')

// Schema
const bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: String
},{
    toJSON: {
        virtuals: true
    }
})

bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})
bakerSchema.post('findOneAndDelete', async function(){
    let deleteStatus = await Bread.deleteMany({ baker: this._conditions._id })
    console.log(deleteStatus)
})

// model and export

const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker