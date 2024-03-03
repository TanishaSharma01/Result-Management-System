var userModel= require('../model/usermodel');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const SECRET_KEY = "RESULTAPI";
const cookieParser = require("cookie-parser");

//User Signup
const handleUserSignup=async(req,res)=>{

    const {name, email, password} = req.body;
    console.log(req.body);

    try{
        //Existing user check
        const existingUser = await userModel.findOne({ email: email });
        if(existingUser){
            return res.status(400).json({ message: "User Already Exists. "});
        }

        //Hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        //User Generation
        console.log(req.body);
        const user= await userModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        console.log(user);
        // res.send(user);

        //Token Generate
        const token=jwt.sign({ email: user.email, id: user._id}, SECRET_KEY);
        res.status(201).json({user: user, token: token});

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error."});
    }
}

//User Login
const handleUserLogin=async(req,res)=>{
    const{email, password}= req.body;
    try {
        //Existing user check
        const existingUser = await userModel.findOne({ email: email });
        if(!existingUser){
            return res.render("teacher_login", {error: 'User Not Found!'});
            // return res.status(404).json({ message: "User not found. "});
        }

        const matchPassword= await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            // return res.status(400).json({message: "Invalid credentials."});
            return res.render("teacher_login", {error: 'Invalid password'});
        }

        const token=jwt.sign({ email: existingUser.email, id: existingUser._id}, SECRET_KEY);

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(201).redirect("/teacher");

        // res.status(201).json({user: existingUser, token: token});

    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: "Internal Server Error."});
        res.render("teacher_login", { error: 'An error occurred' });
    }
}

//User Logout
const handleUserLogout=async(req,res)=>{
    try{
       return res
      .clearCookie("access_token")
      .status(200)
      .redirect('/login');
    }catch(error){
        console.log(error);
        res.status(404).render('404');
    }
}

module.exports = {handleUserSignup, handleUserLogin, handleUserLogout};