const express = require('express')
const app = express()

//config

require('dotenv').config()
const PORT = process.env.PORT

//MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


//ROUTES

app.get('/',(req,res) => {
    res.send('Welcome to and Awesome App about Breads')
})

//Breads 
const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)

//PAGE NOT FOUND 404

app.get('*', (req,res) => {
    res.status(404).send('<h1>Page Not Found Status Code 404</h1><br><a href="http://localhost:3003/">Home</a>')
})

//LISTEN

app.listen(PORT, () =>{
    console.log(`Listening to port: ${PORT}`)
})