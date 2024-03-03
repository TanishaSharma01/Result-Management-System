var studentModel = require('../model/model');

//Controller for student login

//get student login
const get_studentlogin = (req, res) => {
    res.render('student_login', {error: null});
};

//post student login
const post_studentlogin = async(req, res) =>{
    console.log(req.body);
    const Sturoll = req.body.roll;
    const Studob = req.body.dob2;   

    const individualStudent = await studentModel.findOne({rollno : Sturoll});    
    if(!individualStudent){
      res.render('student_login', {
        error : "Login with correct roll number"
     })
    }  
    
    if(individualStudent==null ||individualStudent.dob!== Studob){
      res.render('student_login', {
        error : "Login with correct roll number and D.O.B."
     })
    }
    res.render('student_dashboard', { one : individualStudent, error: null}); 
       
};

module.exports={
    get_studentlogin,
    post_studentlogin
};