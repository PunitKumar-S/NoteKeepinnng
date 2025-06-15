const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth.middleware');

// redirecting to /home from /
router.get('/', checkAuth, (req, res)=>{
    res.redirect('/home')
    res.status(301);
})

router.get('/home', checkAuth,(req, res)=>{
    res.render('home')
})

//
module.exports = router;
