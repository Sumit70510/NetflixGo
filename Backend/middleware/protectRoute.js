import jwt from 'jsonwebtoken';
import {user} from '../Models/user.model.js';
import {ENV_VARS} from '../Config/envVars.js';
export const protectRoute=async(req,res,next)=>
 {
    try 
     {
       const token=req.cookies['jwt-netflix'];
       if(!token)
        {return res.status(401).json({success:false,message:'unauthorized -- No Token Provided'})}
       const decoded=jwt.verify(token,ENV_VARS.JWT_SECRET);
       if(!decoded)
        {return res.status(401).json({success:false,message:'unauthorized -- Invalid Token'})}
       //now we can extract id from token
       const User=await user.findById(decoded.userId).select("-password");
       if(!User)
         {return res.status(404).json({success:false,message:"User Not Found"});}
       req.user=User;
       next();
     }
    catch(error)
     {
       console.log('Error in Protect Route Middleware : ',error.message);
       res.status(500).json({success:false,message:"Internal Server Error"});  
     }
 };