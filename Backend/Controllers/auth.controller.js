import {user} from '../Models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../Utils/generateToken.js';
export async function signUp(req,res)
    {
      try
       {
        const {email,password,username}=req.body;
        if(!email||!password||!username)
         {return res.status(400).json({success:false,message:"All Field are Required"})}
        const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email))
         {
          return res.status(400).json({success:false,message:"Invalid Email"})   
         }
        if(password.length<6)
         {
          return res.status(400).json({success:false,message:"Password must have at least 6 Characters"})
         } 
        
        const existingUserByEmail= await user.findOne({email:email});
        if(existingUserByEmail)
         {return res.status(400).json({success:false,message:"User Already Exists"});}
        
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const PROFILE_PICS=['/avatar1.png','/avatar2.png','/avatar3.png'] 
        const image=PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)];
        const newUser = new user({
          email,
          password:hashedPassword,
          username,
          image
        })
        generateTokenAndSetCookie(newUser._id,res);   
        await newUser.save();         
        res.status(201).json({success:true,user:{...newUser._doc,password:""}})
       }
      catch(error)
       {
         console.log("Error In SignUp Controller ",error.message);
         res.status(500).json({success:false,message:"Internal Server Error"});
       }
    }
export async function logIn(req,res)
   {
     try
      {
        const {email,password}=req.body;
        if(!email||!password)
         {return res.status(400).json({success:false,message:"All Fields Are Required"});}  
        const existingUser=await user.findOne({email:email})
        if(!existingUser)
         {return res.status(404).json({success:false,message:"User Doesn't Exist"});}
        const isPasswordCorrect= await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect)
         {return res.status(400).json({success:false,message:"Invalid Credentials"});}
        generateTokenAndSetCookie(existingUser._id,res);
        res.status(200).json({success:true,user:{...existingUser._doc,password:"" }});  
      }
     catch(error)
      {
       console.log("Error In LogIn Controller Message",error.message);
       res.status(500).json({success:false,message:"Internal Server Error"});
      }
   }
export async function LogOut(req,res)
   {
      try
       {
        res.clearCookie('jwt-netflix');
        res.status(200).json({success:true,message:"LoggedOut Successfully"});
       }
      catch(error)
       {
        console.log("Error In LogOut Controller ",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
       }
   }

export async function authCheck(req,res)
 {
   try 
    {
      res.status(200).json({success:true,user:req.user}); 
    }
   catch(error)
    {
      console.log("Error in Auth Check Controller",error.message);
      res.status(500).json({success:false,message:"Internal Server Error"});
    }
  };   