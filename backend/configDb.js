import mongoose from "mongoose"

export const connectDB=async()=>
{
    try
    {
        const conn=await mongoose.connect("mongodb+srv://karanrajeshirke11:DYTelRxnuCKoFFyJ@cluster0.isrremi.mongodb.net/")
        console.log(`connected to Mongodb Database ${conn.connection.host}`)
    }
    catch(err){
        console.log("ERROR connnecting to db")
    }
}


