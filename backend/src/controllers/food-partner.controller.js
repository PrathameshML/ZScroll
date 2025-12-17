const mongoose = require('mongoose');
const foodpartner = require("../models/foodpartner.model");
const foodModel = require("../models/food.model");


const foodPartnerinfo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("GET /api/foodpartner/:id called with id =>", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid food partner id" });
    }

    const foodpartnerinfo = await foodpartner.findById(id);

    if (!foodpartnerinfo) {
      return res.status(404).json({ message: "food partner not found", foodpartnerinfo: null });
    }
      const foodItemsByFoodPartner=await foodModel.find({foodPartner:id})

    res.status(200).json({
      message: "food partner info fetched successfully",
      foodpartnerinfo:{
        ...foodpartnerinfo.toObject(),
        totalMeals: foodItemsByFoodPartner.length,
        videos: foodItemsByFoodPartner
      }
    });
  } catch (err)  {
    console.error("Error fetching food partner info:", err);
    res.status(500).json({ message: "internal server error", error: err.message });
  }

};



module.exports = { foodPartnerinfo };