const express = require('express');
const router = express.Router();

// redirecting to /home from /
router.get('/', (req, res)=>{
    res.redirect('/home')
    res.status(301);
})

router.get('/home', (req, res)=>{
    res.render('home')
})

//
module.exports = router;
