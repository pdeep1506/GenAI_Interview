import jwt from 'jsonwebtoken';


export const authUser = (req,res, next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            success: false,
            message:"Token not provided"
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