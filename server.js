const express = require('express')
const app = express()
const methodOverride = require('method-override')

//config

require('dotenv').config()
const PORT = process.env.PORT

//MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))



//ROUTES

app.get('/',(req,res) => {
    res.redirect('/breads')
})

//Breads 
const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)

//PAGE NOT FOUND 404

app.get('*', (req,res) => {
    res.status(404).render('404')
})

//LISTEN

app.listen(PORT, () =>{
    console.log(`Listening to port: ${PORT}`)
})