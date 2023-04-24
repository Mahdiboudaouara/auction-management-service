const express = require("express");
const app = express();
require('dotenv').config()
const cors =require('cors')
const bodyparser = require('body-parser')
app.use(cors());
app.use(express.json())

// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))
const path = require("path");

app.use(express.json())

app.use(express.static(path.join(__dirname, '/public')));


//import routes
const productRoute=require('./routes/product')

//route middlewares 
app.use('/backend/auction',productRoute)

module.exports = { app };
