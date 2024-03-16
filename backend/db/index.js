const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating a connection to mongodb database
const connect = async() =>{
    try{
        const connection = mongoose.connect("mongodb database link");
        console.log("Connection established successfully");
    }
    catch{
        console.log("Error while connecting the database");
    }
}

// Defining the schema
const userSchema = new Schema({
    name : String,
    emailId: String,
    password: String
})

//create models using defined schema
const User = new mongoose.model("User",userSchema);

module.exports = {
    User,
}