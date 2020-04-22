require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session')
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
app.use(session({
    secret: process.env.SESSION_KEY || 'supersecret1',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 6000000000}
}));

//sets
app.set('trust proxy', 1); //Needed by cookies

//API
app.use('/api', api);

//Listen
app.listen(process.env.PORT || 1337, () =>{
    console.log(`App running on ${process.env.PORT || 1337}`);
});