import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import blacklistTokenModel from "../models/blacklist.model.js";
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

    if(isUserAlreadyExist){
        return res.status(400).json({
            success: false,
            message: "Account already exist with this username or email"
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
        message:"User registred successfully",
        data:{
            username: user.username,
            email: user.email
        }
    })
}
/**
 * 
 * @description To login  user function
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
        {id: findUser._id, username: findUser.username},
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
                email: findUser.email
            }
    })
}

/**
 * 
 * @description To logout  user function
 * @field_Require  Token
 * @access Public
 */

export const logoutUserController = async(req,res)=>{
    
    const token = req.cookies.token;
    
    if(token){
        await blacklistTokenModel.create({token});
    }
    res.clearCookie("token")
    res.status(200).json({
        success: true,
            message: "User logout successfully",
    })
}

/**
 * 
 * @description GetMeController
 * @field_Require  
 * @access private
 */
export const getMeController = async(req,res)=>{
    const getUser = await userModel.findById(req.user.id);
    
    res.status(200).json({
        success: true,
        message: "User fatched successfully",
        data:{
            user: {
                id: getUser._id,
                username: getUser.username,
                email: getUser.email
            }
        }
    })
}