const mongoose = require("mongoose");

const tech = mongoose.Schema({
    techname:{
        type:String
    },
    techfounder:{
        type:String
    }
});

const technologies = new mongoose.model("technologies",tech);
module.exports = technologies;