// create server
const express =require('express');
const cookieParser=require('cookie-parser');
const authRoutes=require('./routes/auth.routes')
const foodRoutes=require('./routes/food.routes')
const foodPartnerRoutes=require('./routes/food-partner')
const cors=require('cors');

const app=express();
// enable CORS for frontend
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes); 
app.use('/api/food-partner',foodPartnerRoutes);

app.get('/',(req,res)=>{
    res.send("kaisa he bhai");
})


module.exports=app;

