const jwt = require('jsonwebtoken');
const SECRET_KEY = "RESULTAPI";

//Auth middleware
const auth = (req, res, next)=>{
    try {
        let token = req.cookies.access_token;
        if(token){
            //token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
            return next();
        }
        else{
            res.status(404).render('404');
            // res.status(401).json({message: "Unauthorized user"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
        // res.status(401).json({message: "Unauthorized user"});
    }
}

module.exports = auth;