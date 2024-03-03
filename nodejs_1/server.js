const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const cookieParser = require("cookie-parser");

const app = express();

const PORT = 3001;
const connectDB=require('./server/database/connection');

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use(cookieParser());

//set view engine
app.set("view engine", "ejs");
// app.set("views",path.resolve(__dirname, "views/ejs"));

//load assets
app.use('/css',express.static(path.resolve(__dirname, "assets/css")));
app.use('/js',express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use('/',require('./server/routes/router'));
app.use('/',require('./server/routes/teacherrouter'));
app.use('/',require('./server/routes/userrouter'));

//print every request
app.use((req,res,next)=>{
    console.log("HTTP method - "+req.method+" , URL - "+req.url);
    next();
})

app.listen(PORT, ()=>{console.log(`Server is running on http://localhost:${PORT}`)});
