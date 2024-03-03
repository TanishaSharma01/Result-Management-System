const express = require('express');
const route= express.Router();

const services=require('../services/render');
const studentcontroller=require('../controller/studentcontroller');

//home
/*
@description Root Route
@method GET /
*/
route.get('/',services.homeRoutes);

//student login
route.get('/student',studentcontroller.get_studentlogin);
route.post('/student',studentcontroller.post_studentlogin);

module.exports=route;