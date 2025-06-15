const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const userModel = require('../models/user.model');

const jwt = require('jsonwebtoken');

router.get('/create-account', (req, res)=>{
    res.render('create_account');
})

// creating account
router.post('/create-account', body('email').trim().isEmail().isLength({min: 13}),
body('username').trim().isLength({min : 3}),
body('password').trim().isLength({min : 8}),
async (req, res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({
            error: error.array(),
            message: "Invalid data",
        })
    }

    const {username, email, password} = req.body;

    const existingUser = await userModel.findOne({email})
    if (existingUser){
        return res.status(409).json({
            message: "Email already in use"
        })
    }

    hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        email,
        password: hashPassword,
    })

    //
    res.json({
        message: 'Account created successfully',
        user: {
            username: newUser.username,
            email: newUser.email,
        }
    });

})


// login
router.get('/login-account', (req, res)=>{
    res.render('login_account')
})

router.post('/login-account', body('email').trim().isEmail().isLength({min : 13}),
body('password').trim().isLength({min : 8}),async (req, res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({
            error: error.array(),
            message: "Invalid Data"
        })
    }

    // extract creds from req
    const {email, password} = req.body;

    // get user
    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message: "email or password is incorrect"
        })
    }

    // match the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(400).json({
            message: "username or password is incorrect"
        })
    }

    // remember
    const remember = req.body.remember; // 'on' if checked
    const TOKEN_EXPIRATION = remember ? '30d' : '1h'; // might store this in .env

    // JWT
    const token = jwt.sign({
        userId: user._id,
        email: user.email,
        username: user.username,
    },process.env.JWT_SECRET, {expiresIn: TOKEN_EXPIRATION})

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production", // idk
        maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : undefined, // 30 days or session only
    });
    res.redirect('/home') // redirect the user to the home page
})


module.exports = router;
