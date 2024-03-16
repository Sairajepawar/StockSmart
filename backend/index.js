const express = require('express');
const JWT = require('jsonwebtoken');
const {User, Note,connectDB} = require('./db/index.js');
const {jwtKey} = require('./middleware/verify.js')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const { userMiddleware } = require("./middleware/user.js")
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

// using all required middleware
app.use(cors());
app.use(express.json())

// Account creation route for User
app.post("/register", async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        // as email id's are unique
        const search = await User.findOne({email: email});
        if (search) {
            return res.status(400).json({
                message: "Account already exist please Login ",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name : name,
            email : email,
            password: hashedPassword,
        });
        await user.save();
        return res.status(200).json({
            message: "User registered successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

//Login route for user
app.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({message: "Email is not registered"});
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(403).json({message: "Wrong password"});
        }
        const token = JWT.sign({_id: user._id}, jwtKey, {expiresIn: "7d"});
        res.status(200).json({
            success: true,
            message: "Logged In Successfully",
            user: {name: user.name, email: user.email},
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// route to create notes
app.post("/createNote",userMiddleware,async(req,res)=>{
    const { content } = req.body;
    const token = req.headers.authorization;
    const id = JWT.decode(token); //id of current user
    console.log(id);
    const user = User.findById(id);
    const note = new Note({
        content
    });
    await note.save();
    user.notes.push(note._id);
    await user.save();
    return res.json({
        message:"Note created successfully"
    })
})
app.listen(port, () => {
    console.log(`Server is hosted on port number ${port}`)
})
connectDB();