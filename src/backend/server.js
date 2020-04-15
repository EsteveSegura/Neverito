require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//mongooseConnection
mongoose.connect(process.env.DATABASESTRING || 'mongodb://localhost/neverito', { useNewUrlParser: true, useUnifiedTopology: true })
     .then((db) => console.log('Connected to database'))
     .catch((err) => console.log('Fail conecting to database'))

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
app.listen(process.env.PORT || 1337, () =>{
    console.log(`App running on ${process.env.PORT || 1337}`)
})