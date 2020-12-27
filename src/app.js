const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const giocode = require('./utils/giocode')
const forecast = require('./utils/forecast')
const geocode = require('./utils/giocode')

const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath ))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Romil Jain'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Romil Jain'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Romil Jain'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a Location'
        })     
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: 'You must provide a Location'
            })     
        }

        forecast( latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error: 'You must provide a Location'
                })     
            }
                    
            console.log(req.query.address)
            res.send({
                Forecast: forecastdata,
                Location: location,
                Address: req.query.address
            })

        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'you must provide an search term'
        })
    } 
    console.log(req.query.search)
    res.send({
        products: []
    })
    
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {
    res.render('Error',{
        message: 'Help article not found',
        name: 'Romil Jain'
    })
})

app.get('*', (req, res) => {
    res.render('Error', {
        message: 'The page you are requesting does not exists',
        name: 'Romil Jain'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})