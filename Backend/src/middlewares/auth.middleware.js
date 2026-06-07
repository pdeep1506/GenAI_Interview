import jwt from 'jsonwebtoken';
import blacklistTokenModel from '../models/blacklist.model.js';

export const authUser = async(req,res, next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            success: false,
            message:"Token not provided"
        })
    }
    const isTokenBlacklisted = await blacklistTokenModel.findOne({
        token
    })
    if(isTokenBlacklisted){
        return res.status(401).json({
            success: false,
            message:"Token is invalid."
        })
    }
    try{

        const decodedData =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData
        next();
    }
    catch(error){
         return res.status(401).json({
            success: false,
            message:"Invalid Token."
        })
    }

}