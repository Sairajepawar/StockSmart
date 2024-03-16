const JWT = require('jsonwebtoken')
const {jwtKey} = require('./verify.js')
const {User} = require('../db/index.js')

async function userMiddleware(req,res,next){
    const token = req.headers.authorization;
    try{
        const decoded = await JWT.verify(token,jwtKey);
        const { _id } = decoded;
        const data = await User.findById(_id);
        if(data){
        //     user found
            next();
        }
        else{
            return res.status(404).json({
                error:"User not found"
            })
        }
    }
    catch(err){
        console.log("token failed signature verification");
        return res.send(500).json({
            error : "Invalid Token"
        })
    }
}

module.exports = {
    userMiddleware
}