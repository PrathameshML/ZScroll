const express=require('express');
const { authUserMiddleware } = require('../middlewares/auth.middleware');
const foodPartnerController=require('../controllers/food-partner.controller');
const router=express.Router();

router.get('/:id',authUserMiddleware,foodPartnerController.foodPartnerinfo);

module.exports=router;