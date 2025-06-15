const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const userModel = require('../models/user.model');

router.get('/create-account', (req, res)=>{
    res.render('create_account');
})


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

    const existingUser = userModel.findOne({email})
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

    res.json(newUser);
})


module.exports = router;
