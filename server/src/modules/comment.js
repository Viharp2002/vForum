const mongoose = require("mongoose");

const comment = mongoose.Schema({
   desc:{
    type:String
   },
   uid:{
    type:String
   },
   doubtId:{
    type:String
   }
});

const comments = mongoose.model("comments",comment);
module.exports = comments;