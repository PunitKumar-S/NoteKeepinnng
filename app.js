const express = require('express');
const homeRotuer = require('./routes/home.routes');
const dotenv = require('dotenv');
//
const app = express();
dotenv.config();
app.set('view engine', 'ejs');

//

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// routes
app.use(homeRotuer);

// runnig the server
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running at port 3000");
})
