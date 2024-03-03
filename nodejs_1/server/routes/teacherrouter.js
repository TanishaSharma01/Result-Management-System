const express = require('express');
const route= express.Router();

const services=require('../services/render');
const teachercontroller=require('../controller/teachercontroller');
const auth = require('../middlewares/auth');

route.get('/teacher',auth, services.teacherRoutes);
route.get('/add-result',auth,  services.add_result);
route.get('/update-result',auth, services.update_result);
//API
route.post('/api/results',  teachercontroller.create);
route.get('/api/results',  teachercontroller.find);
route.put('/api/results/:id', teachercontroller.update);
route.delete('/api/results/:id', teachercontroller.delete);

module.exports = route;