const express = require('express')
const app = express()

//config

require('dotenv').config()
const PORT = process.env.PORT


//ROUTES

app.get('/',(req,res) => {
    res.send('Welcome to and Awesome App about Breads')
})

//Breads 
const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)

//LISTEN

app.listen(PORT, () =>{
    console.log(`Listening to port: ${PORT}`)
})