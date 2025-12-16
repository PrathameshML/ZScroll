const userModel =required('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

async function registerUser(req,res){
    const {fullname,email,password}=req.body;

    const isUSerAlreadyExist=await userModel.findOne({
        email
    })

    if(isUSerAlreadyExist){
        return res.status(400).json({
            message:"user already exist";
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);

   const user=await userModel.create({
    fullname,
    email,
    password:hashedPassword
   })
   const token=jwt.sign({
    id:user._id,
   },"70266c4d02904d9f7a787eaeaac0d706")
   res.cookie("token",token)
   res.status(201).json({
    message:"user registered successfully",
    user:{
        id:user._id, 
        fullname:user.fullname,
        email:user.email 
    }  
   })
}

module.exports={registerUser};