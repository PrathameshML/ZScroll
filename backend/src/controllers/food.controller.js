const foodModel=require('../models/food.model')
const storageService=require('../services/storage.service')
const {v4 :uuid}=require('uuid')
const likeModel=require('../models/likes.model')
const saveModel=require('../models/save.model')

// comment model is optional — project may not include comments yet
let commentModel = null
try {
  commentModel = require('../models/comment.model')
} catch (err) {
  commentModel = null
}


async function createFood(req,res){
    console.log(req.foodPartner)
    
    console.log(req.body)
    console.log(req.file)

const fileUploadResult=await storageService.uploadFiles(req.file.buffer,uuid())
console.log(fileUploadResult)
const foodItem=await foodModel.create({
    name:req.body.name,
    description:req.body.description,
    video:fileUploadResult.url,
    foodPartner:req.foodPartner._id
})
res.status(201).json({
    message:"food created succesfullt",
    food:foodItem
})

}


async function getFoodItem(req,res){
  // return all food items with counts and whether current user has liked/saved them
  const userId = req.user ? req.user._id : null
  const foodItems=await foodModel.find({}).populate('foodPartner','_id name address').lean()

  const enriched = await Promise.all(foodItems.map(async (item) => {
    const saveCount = await saveModel.countDocuments({ food: item._id })
    const commentCount = commentModel ? await commentModel.countDocuments({ food: item._id }) : (item.commentCount || 0)
    const liked = userId ? !!(await likeModel.findOne({ food: item._id, user: userId })) : false
    const saved = userId ? !!(await saveModel.findOne({ food: item._id, user: userId })) : false

    // ensure we include the canonical counts on the item
    return Object.assign(item, {
      saves: saveCount,
      comments: commentCount,
      liked,
      saved
    })
  }))

  res.status(200).json({
    message:"Food items fetched successfully",
    foodItems: enriched
  })
}


async function likeFood(req,res){
    const {foodId}=req.body;
    const user=req.user;


    const isAlreadyLinked=await likeModel.findOne({
        food:foodId,
        user:user._id
    })

    if(isAlreadyLinked){
   await likeModel.deleteOne({
user:user._id,
food:foodId
   })
   await foodModel.findByIdAndUpdate(foodId,{
    $inc:{likeCount:-1}
   })
   return res.status(200).json({
    message:"Food unliked successfully"

   })
}
const like=await likeModel.create({
    food:foodId,    
    user:user._id
})

  await foodModel.findByIdAndUpdate(foodId,{
    $inc:{likeCount:1}
   })

res.status(201).json({
    message:"food liked successfully",
    like
})

}

async function addComment(req,res){
  if (!commentModel) return res.status(501).json({ message: 'Comments not implemented' })
  const { foodId, text } = req.body
  const user = req.user
  if(!text || !foodId) return res.status(400).json({ message: 'Missing foodId or text' })

  const comment = await commentModel.create({ food: foodId, user: user._id, text })
  await foodModel.findByIdAndUpdate(foodId, { $inc: { commentCount: 1 } })

  res.status(201).json({ message: 'Comment added', comment })
}

async function getComments(req,res){
  if (!commentModel) return res.status(501).json({ message: 'Comments not implemented' })
  const { id } = req.params
  const comments = await commentModel.find({ food: id }).populate('user', '_id name').sort({ createdAt: -1 })
  res.status(200).json({ message: 'Comments fetched', comments })
}

async function getSavedFood(req,res){
  const user = req.user
  const saved = await saveModel.find({ user: user._id }).populate({ path: 'food', populate: { path: 'foodPartner', select: 'name' } })
  const items = saved.map(s => s.food)
  res.status(200).json({ message: 'Saved items fetched', items })
}


async function saveFoodItem(req,res){
  const {foodId}=req.body;
  const user=req.user;

  const isAlreadySaved=await saveModel.findOne({
    food:foodId,
    user:user._id
  })

  if(isAlreadySaved){
    await saveModel.deleteOne({
      user:user._id,
      food:foodId
    })
    await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: -1 } })
    return res.status(200).json({ message: "Food unsaved successfully", saved: false })
  }

  const save=await saveModel.create({
    food:foodId,
    user:user._id
  })
  await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: 1 } })
  res.status(201).json({ message: "Food saved successfully", saved: true })
}


module.exports={
    createFood,
    getFoodItem,
    likeFood,
    saveFoodItem,
    addComment,
    getComments,
    getSavedFood
}
