const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const dataRoutes = require('./routes/dataRoutes')
const colors = require('colors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()
//Initialize express
const app = express()

//Parse incoming request to JSON => Based on body-parser => sets the request body into req.body
app.use(express.json())
//Parse incoming requests with urlencoded payloads => Based on body-parser => sets the request body into req.body
app.use(express.urlencoded({ extended: false }))

//Data Routes
app.use('/api/data', dataRoutes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})