const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(
        "mongodb+srv://prathameshm660_db_user:Pass%40db%4021@cluster0.bhw3zsv.mongodb.net/zscroll?appName=Cluster0"
      )
      
    .then(() => {
      console.log("DB Connect ho gaya re..........");
    })
    .catch((err) => {
      console.log(`Database me error hai re ${err}`);
    });
}

module.exports = connectDB;
