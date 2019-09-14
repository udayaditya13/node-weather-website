const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//making paths for setting
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setting stuff 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//to serve up static stuff from public 
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Udayaditya Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'Weather App',
        name : 'Udayaditya Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page',
        phone : '8493939202',
        email : 'something@gmail.com',
        name : 'Udayaditya Singh'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Address is mandatory'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error : error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error : error
                })
            }
            res.send({
                location : location,
                forecast : forecastData,
                address : req.query.address
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Udayaditya Singh',
        error : 'Help Article Not Found'
    })
})
app.get('/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Udayaditya Singh',
        error : 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('server in up!')
})