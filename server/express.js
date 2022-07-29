//imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const userRoute = require('./routes/user-route');
const documentRoute = require('./routes/document-route');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//middlewares
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());

// connecting db
mongoose.connect('mongodb://localhost:27017/HTMLtoPDF',{useNewUrlParser: true, useUnifiedTopology: true} , (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Mongoose is active!");
    }
});
// routes
app.use(userRoute);
app.use(documentRoute);

// running port
const port = process.env.PORT || 5000;
const listenPort = async () =>{
    await app.listen(port, ()=>{
        console.log(`localhost:${port} is active!`);
    })
}
listenPort();