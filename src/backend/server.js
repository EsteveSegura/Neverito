require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//mongooseConnection

//ApiRoute
const api = require('./routes/api');

//Init
const app = express();

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//API
app.use('/api', api)

//Listen
app.listen(process.env.PORT || 3000, () =>{
    console.log(`App running on ${process.env.PORT || 3000}`)
})