const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating a connection to mongodb database
const connectDB = async() =>{
    try{
        const connectDB = mongoose.connect("mongodb+srv://karanrajeshirke11:DYTelRxnuCKoFFyJ@cluster0.isrremi.mongodb.net/");
        console.log("Connection established successfully");
    }
    catch{
        console.log("Error while connecting the database");
    }
}

// Defining the schema
const userSchema = new Schema({
    name : String,
    email: String,
    password: String
})

//create models using defined schema
const User = new mongoose.model("User",userSchema);

module.exports = {
    User,
    connectDB
}