const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./config/dbConnect')
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')

mongoose.connect()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));

app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)

app.listen(8000, () => {
    console.log('server started')
})