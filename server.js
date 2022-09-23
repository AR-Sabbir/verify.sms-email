const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const expressLayouts = require('express-ejs-layouts')
const studentRouts = require('./routes/studentRoutes')
const homeRouts = require('./routes/homeRoutes')

// Environment setup

const PORT = process.env.PORT || 4040

// init express

const app = express()

// data manage
app.use(express.json())

app.use(express.urlencoded({extended : false}))


// init ejs

app.set("view engine","ejs")

app.use(expressLayouts)

app.set('layout','layouts/app')

// static folder

app.use(express.static('public'))


// routing

app.use('/student',studentRouts);
app.use(homeRouts)

// server listen

app.listen(PORT, () => {
    console.log(`server running port ${PORT}`.bgGreen.black);
})



