import mongoose from "mongoose";


const userSchem = new mongoose.Schema({
    username:{
        type: String,
        unique:[true, "Username already taken"],
        require: true
    },
    email:{
        type: String,
        unique: [true, "Account already exist with this email address"],
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

const userModel = mongoose.model("users", userSchem)

export default userModel;