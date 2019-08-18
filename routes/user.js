const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')

//login page
router.get('/login', (req, res)=> {
    res.render('login')
})
//register page
router.get('/register', (req, res)=> {
    res.render('register')
})

//register handle
router.post('/register', (req, res)=> {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if(!name || !email || !password || !password2){
        errors.push({msg: 'please fill in all fields'})
    }
    if(password !== password2) {
        errors.push({ msg: 'passwords do not match'})
    }
    if(password.length < 6){
        errors.push({msg: 'password should be atleast 6 character'})
    }

    if (errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        //validation passed
        User.findOne({email: email})
        .then(user => {
            if(user) {
                //user Exist
                errors.push({msg: 'Email is already registered'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User({
                    name,
                    email
                });

                console.log(newUser)
                res.send('Hello')
            }
        })

    }
})

module.exports = router;