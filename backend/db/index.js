const mongoose = require('mongoose');
const {Mongoose} = require("mongoose");

const Schema = mongoose.Schema;


// creating a connection to mongodb database
const connectDB = async() =>{
    try{
        const con = mongoose.connect(process.env.MONGOURL);

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
    password: String,
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
});


const noteSchema = new Schema({
    content: String,
    mainUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

//create models using defined schema
const User = new mongoose.model("User",userSchema);
const Note = new mongoose.model("Notes",noteSchema);

module.exports = {
    User,
    Note,
    connectDB
}