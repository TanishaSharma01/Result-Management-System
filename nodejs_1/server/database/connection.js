const mongoose=require('mongoose');
const DateOnly = require('mongoose-dateonly');

//Connection to db
const connectDB=async()=>{
    try{
        const connectionString='mongodb+srv://admin:admin@cluster0.azvqxg3.mongodb.net/results?retryWrites=true&w=majority';
        const con = await mongoose.connect(connectionString,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            //useFindAndModify:false,
            //useCreateIndex:true            
        });
        console.log(`Mongo DB connected: ${con.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports=connectDB;