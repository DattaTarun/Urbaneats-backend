import { Request, Response } from "express";
import user from "../models/user";

const getCurrentUser=async(req:Request, res:Response)=>{
    try{
        const currentUser=await user.findOne({_id:req.userId})
        if(!currentUser)
            {
                return res.status(404).json({message:"User not found"})
            }
            res.json(currentUser)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Something went wrong"})
    }
}


const createCurrentUser=async(req:Request,res:Response)=>{

    try{
        const{auth0Id}=req.body;
        const existingUser=await user.findOne({auth0Id})
        if(existingUser){
            return res.status(200).send();
        }
        const newUser=new user(req.body)
        await newUser.save();
        res.status(201).json(newUser.toObject())
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error creating user"})
    }
}

const updateCurrentUser=async(req:Request,res:Response)=>{
    try{
        const {name,addressLine1,country,city}=req.body;
        const userr=await user.findById(req.userId)
        if(!userr)
            {
                return res.status(400).json({message:"User not found"})
            }
        userr.name=name;
        userr.addressLine1=addressLine1
        userr.city=city
        userr.country=country

        await userr.save()
        res.send(userr)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error Updating User"}) 
    }
}

export default{
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser
}