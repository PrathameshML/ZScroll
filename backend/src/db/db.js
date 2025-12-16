const mongoose =require('mongoose');

function connectDB(){
mongoose.connect("mongodb://localhost:27017/ZscrollDB")
.then(()=>{
    console.log("DB Connrct ho gaya re..........");
})
.catch((err)=>{
    console.log(`database me error hai re ${err}`);
})
}



module.exports=connectDB;