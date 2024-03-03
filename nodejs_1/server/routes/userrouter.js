const express = require('express');
const route= express.Router();

const services=require('../services/render');
const usercontroller = require('../controller/usercontroller');

//Sign up(Can be only done through postman or database)
route.post('/signup', usercontroller.handleUserSignup);

//Login
route.get('/login', services.userRoutes);

route.post('/login', usercontroller.handleUserLogin);

//Logout
route.get('/logout', usercontroller.handleUserLogout);

module.exports=route;