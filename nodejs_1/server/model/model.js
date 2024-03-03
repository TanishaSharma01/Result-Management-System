const mongoose=require('mongoose');
const moment = require('moment');
// const DateOnly = require('mongoose-dateonly');

//Result Schema
var schema = new mongoose.Schema({
    rollno:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    dob:{
        type: String, // Store the date as a string
        required: true,
        set: function (value) {
            // Use Moment.js to format the date before storing
            return moment(value).format('YYYY-MM-DD');
        }
    },
    score:{
        type:Number,
        required:true
    }
});

const Resultdb = mongoose.model('resultdb',schema);

module.exports = Resultdb;
