var Resultdb = require('../model/model');

//create and save new result
exports.create=(req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const result = new Resultdb({
        rollno : req.body.rollno,
        name : req.body.name,
        dob: req.body.dob,
        score : req.body.score
    })

    // save user in the database
    result
        .save(result)
        .then(data => {
            //res.send(data);
            res.redirect('/add-result');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}


//retrieve and return all results/ a single result
exports.find=(req,res)=>{
    //if we have an id, get a single result
    if(req.query.id){
        const id= req.query.id;
        Resultdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + id})
        })
    }
    //if no id provided, get all results
    else{
        Resultdb.find()
        .then(result=>{
        res.send(result);
    })
    .catch(err=>{
        res.status(500).send({ message : err.message || "Error Occurred while retriving user information" });
    })
    }
}

//Update a new identified result by rollno
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({ message : "Data to update can not be empty"});
    }

    const id=req.params.id;
    // console.log(id);
    Resultdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`});
        }
        else{
            res.send(data);
        }
    })
    .catch(err =>{
        res.status(500).send({ message : "Error Update user information"})
    })
}

//Delete a result with specified rollno
exports.delete=(req,res)=>{
    const id=req.params.id;

    Resultdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Result for this id doesn't exist`})
        }else{
            res.send({
                message : "User was deleted successfully!"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
}