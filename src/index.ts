import express, { Request,Response } from "express";
import cors from "cors";
import "dotenv/config"
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute"

const app= express();
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>console.log("connected to database"));

app.get("/health",async(req:Request,res:Response)=>{
    res.send({message:"Health OK!"})
})

app.use("/api/my/user",MyUserRoute);

app.listen(2000,()=>{
    console.log("server started on port 2000")
})