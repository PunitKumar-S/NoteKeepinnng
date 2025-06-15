const mongoose = require('mongoose');


// i have even tried with and without async
async function connectToDB(){
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Successfully connected to MongoDB')
    }).catch((error)=>{
        console.log(error);
    })
}

module.exports = connectToDB;

