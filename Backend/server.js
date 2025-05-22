// const express=require('express');
import express from 'express' ;
import authRoutes from './Routes/auth.route.js';
import movieRoutes from './Routes/movie.route.js';
import tvRoutes from './Routes/tv.route.js';
import cookieParser from 'cookie-parser';
import searchRoutes from './Routes/search.routes.js';
import {ConnectDB} from './Config/db.js';
import {ENV_VARS} from "./Config/envVars.js" ;
import {protectRoute} from './middleware/protectRoute.js';
import path from 'path';
const app=express();
const PORT=ENV_VARS.PORT;
const __dirname = path.resolve();
app.use(cookieParser());
app.use(express.json()); 
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute,movieRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes);
app.use("/api/v1/search",protectRoute,searchRoutes);

app.listen(PORT,()=>  
 {
  console.log('Server Started at https://localHost:'+PORT);
  ConnectDB();
 });           

if(ENV_VARS.NODE_ENV==="production")
 {
   app.use(express.static(path.join(__dirname,'/Frontend/dist')));
//    app.get('/*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
// });
 }
