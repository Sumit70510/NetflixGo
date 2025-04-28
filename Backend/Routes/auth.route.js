import express from "express";
import {signUp,logIn,LogOut} from "../Controllers/auth.controller.js";
const authRouter=express.Router();

authRouter.post("/signup",signUp)
authRouter.post("/login",logIn)
authRouter.post("/logout",LogOut);

export default authRouter;