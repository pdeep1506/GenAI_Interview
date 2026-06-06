import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
/**
 * 
 * @description To register new user function
 * @field_Require username,email and Password
 * @access Public
 */
export const registerUserController = async(req,res)=>{

    const {username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Please provide username, email and password"
        })
    }
    const isUserAlreadyExist = await userModel.findOne({
        $or:[{username}, {email}]
    })

    if(isUserAlreadyExist.username == username){
        return res.status(400).json({
            success: false,
            message: "Account already exist with this username"
        })
    }
    else{
        return res.status(400).json({
            success: false,
            message: "Account already exist with this email"
        })
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, email,
        password: hash
    })

    const token = jwt.sign(
        {id: user._id, username: username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        success: true,
        message:"User registred successfully"
    })
}
/**
 * 
 * @description To logi  user function
 * @field_Require  email and Password
 * @access Public
 */

export const loginUserController = async(req,res)=>{
    const { email, password} = req.body

    const findUser = await userModel.findOne({
        email
    })

    if(!findUser){
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = bcrypt.compare(password, findUser.password);

    if(!isPasswordValid){
         return res.status(400).json({
            success: false,
            message: "Invalid user or password"
        })
    }

      const token = jwt.sign(
        {id: user._id, username: username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
    res.cookie("token", token);
    res.status(200).json({
           success: true,
            message: "User login successfully",
            data:{
                id:findUser._id,
                username:findUser.username,
                password: findUser.password
            }
    })
}