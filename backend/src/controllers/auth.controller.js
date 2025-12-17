const userModel =require('../models/user.model');
const foodPartnerModel=require('../models/foodpartner.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

async function registerUser(req,res){
    const {fullname,email,password}=req.body;

    const isUSerAlreadyExist=await userModel.findOne({
        email
    })

    if(isUSerAlreadyExist){
        return res.status(400).json({
            message:"user already exist"
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
   },process.env.JWT_SECRET)
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

async function loginUser(req,res){
const {email,password}=req.body;

const user=await userModel.findOne({
    email
})

if(!user){
   return  res.status(400).json({
        message:"invalid email or password"
    })
}
const isPasswordMatched=await bcrypt.compare(password,user.password);
if(!isPasswordMatched){
   return res.status(400).json({
        message:"invalid email or password"
    })
}
const token=jwt.sign({
    id:user._id,
},process.env.JWT_SECRET)
res.cookie("token",token)    

res.status(200).json({
    message:"user logged in successfully",
    user:{
        id:user._id,
        fullname:user.fullname,
        email:user.email
    }

})
}

function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"user logged out successfully"
    })
}


async function registerFoodPartner(req,res){
    const {name,email,password,bussinesName,address,number}=req.body;

    const isFoodPartnerAlreadyExist=await foodPartnerModel.findOne({
        email
    })
    
    if(isFoodPartnerAlreadyExist){
        return res.status(400).json({
         message:"food Partner already exist"
        })
    }
    
        const hashedPassword=await bcrypt.hash(password,10);

        const foodPartner=await foodPartnerModel.create({
            name,
            email,
            password:hashedPassword,
            bussinesName,
            address,
            number

        })
        const token=jwt.sign({
            id:foodPartner._id,
        },process.env.JWT_SECRET)
        res.cookie("token",token)
        
        res.status(201).json({
             message:"food partner register ho gaya jiiii",
             foodPartner:{  
                id:foodPartner._id,
                name:foodPartner.name,
                email:foodPartner.email,
                bussinesName:foodPartner.bussinesName,
                address:foodPartner.address,
                number:foodPartner.number,
             }

        })
        
   

        
}
async function loginFoodPartner(req,res){
    const {email,password}=req.body;
    const foodPartner=await foodPartnerModel.findOne({
        email
    })
    if(!foodPartner){
         return  res.status(400).json({
            message:"invalid email or password"
        })
    }
    const isPasswordMatched=await bcrypt.compare(password,foodPartner.password);
    if(!isPasswordMatched){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }  
    const token=jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)   

    
    return res.status(200).json({
        message:"food partner logged in successfully",
        foodPartner:{
            id:foodPartner._id,
            name:foodPartner.name,
            email:foodPartner.email
        }       
    })         
}
function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"food partner logged out successfully"
    })
}
module.exports={registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner}