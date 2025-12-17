const mongoose =require('mongoose');

const foodPartnerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    bussinesName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    number:{
        type:Number
    }

})

const foodPartnerModel=mongoose.model('foodpartner',foodPartnerSchema);
module.exports=foodPartnerModel;