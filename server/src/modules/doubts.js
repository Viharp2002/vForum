const mongoose = require("mongoose");

const doubt = mongoose.Schema({
    techname:{
     type:String
    },
   question:{
     type:String
   },
   desc:{
    type:String
   },
   uid:{
    type:String
   }
});

const doubts = mongoose.model("doubts",doubt);
module.exports = doubts;