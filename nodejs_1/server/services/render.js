const axios=require('axios');
const PAGE_URL='http://localhost:3001/';

//changes
exports.homeRoutes=(req,res)=>{
    res.render('index');
}

//teacher login
exports.userRoutes=(req,res)=>{
    res.render('teacher_login');
}

//changes
exports.teacherRoutes=(req,res)=>{
    //Make a get request to /api/results
    axios.get(PAGE_URL+'api/results')
    .then(function(response){
        // console.log(response.data);
        res.render('teacher_dashboard', {results:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.add_result=(req,res)=>{
    res.render('add_result');
}

exports.update_result=(req,res)=>{
    axios.get(PAGE_URL+'api/results', {params: {id : req.query.id}})
    .then(function(resultdata){
        res.render('update_result', {result: resultdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
}