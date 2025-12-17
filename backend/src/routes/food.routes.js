const express=require('express');
const router=express.Router();
const foodController=require("../controllers/food.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const multer =require("multer")



const upload=multer({
     storage:multer.memoryStorage(),
})


// POST/api/food/{protected}
router.post('/',
authMiddleware.authFoodPartnerMiddleware,
upload.single("video"),
foodController.createFood)



//GET /api/food {protected}
router.get('/',
authMiddleware.authUserMiddleware,
foodController.getFoodItem

)


//post 
router.post("/like",
authMiddleware.authUserMiddleware,
foodController.likeFood
)


router.post('/save',
  authMiddleware.authUserMiddleware,
  foodController.saveFoodItem
)

// comments
router.post('/comment',
  authMiddleware.authUserMiddleware,
  foodController.addComment
)

router.get('/:id/comments',
  authMiddleware.authUserMiddleware,
  foodController.getComments
)

// saved items for user
router.get('/saved/list',
  authMiddleware.authUserMiddleware,
  foodController.getSavedFood
)




module.exports=router;