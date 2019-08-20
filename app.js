require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const sesssion = require('express-session')
const app = express();

//connect to mongo
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})
    .then(()=> console.log('connected to dbs'))
    .catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(sesssion({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

const Port = process.env.PORT;
app.listen(Port, console.log(`server is running on port ${Port}`))