import express from "express";
import {signUp,logIn,LogOut, authCheck} from "../Controllers/auth.controller.js";
import {protectRoute} from '../middleware/protectRoute.js';

const authRouter=express.Router();

authRouter.post("/signup",signUp)
authRouter.post("/login",logIn)
authRouter.post("/logout",LogOut);
authRouter.get("/authCheck",protectRoute,authCheck);

export default authRouter;