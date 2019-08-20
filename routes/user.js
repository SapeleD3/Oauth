const express = require('express')
const router = express.Router();

const bcrypt = require('bcryptjs')

const mem = require('../models/User')

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
        mem.findOne({email : email})
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
                const newUser = new mem({
                    name,
                    email,
                    password
                });
                
                //Hash Passworrd
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash ) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'you can now log in');
                        res.redirect('/users/login')
                    })
                    .catch(err => console.log(err))
                }))
            }
        })

    }
})

module.exports = router;