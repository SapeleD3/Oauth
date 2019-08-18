require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//DB config
const db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(()=> console.log(db))
    .catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

const Port = process.env.PORT;
app.listen(Port, console.log(`server is running on port ${Port}`))