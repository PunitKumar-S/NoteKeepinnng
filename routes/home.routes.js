const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth.middleware');
const noteModel = require('../models/note.model');

// redirecting to /home from /
router.get('/', checkAuth, (req, res)=>{
    res.redirect('/home')
    res.status(301);
})

router.get('/home', checkAuth,(req, res)=>{
    res.render('home')
})


// all the notes
router.get('/home/notes', checkAuth,async(req, res)=>{
    const notes = await noteModel.find();
    res.render('notes', {notes})
})

//
router.post('/home/add-note', checkAuth,async(req, res)=>{
    //create a new note
    const newNote = await noteModel.create({
        title: "title",
        content: "content here"
    })

    //
    res.redirect('/home/notes')
})

// single note page
router.get('/home/note/:id', checkAuth,async (req, res)=>{
    const note = await noteModel.findById(req.params.id);
    res.render('note', {note});
})
router.post('/home/note/:id', checkAuth,async(req, res)=>{
    const {title, content} = req.body;
    if (title && content == ""){
        return res.status(400).json({
            message:"Title or content be empty"
        })
    }
    const note = await noteModel.findByIdAndUpdate(req.params.id, {
        title,
        content
    },{
        new: true,
        runValidators: true,
    });

    // redirect to notes routes
    res.redirect('/home/notes');
})

// delete note
router.post('/home/delete-note/:id', checkAuth ,async (req, res)=>{
    await noteModel.findByIdAndDelete(req.params.id);
    res.redirect('/home/notes')
})


//
module.exports = router;
