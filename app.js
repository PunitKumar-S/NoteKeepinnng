const express = require('express');
const homeRotuer = require('./routes/home.routes');
const userRouter = require('./routes/user.routes');

const connectToDB = require('./config/db');
const dotenv = require('dotenv');

//
const app = express();
dotenv.config();

//
connectToDB();


app.set('view engine', 'ejs');


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// routes
app.use('/',homeRotuer);
app.use('/user', userRouter);

// runnig the server
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running at port 3000");
})
