const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userss = mongoose.Schema({
    email:{
        type: String
    },
    username:{
        type:String
    },
    password:{
        type: String
    },
    cpassword:{
        type:String
    }
})

userss.pre("save",async function(next){
   if (this.isModified("password")) {
     this.password = await bcrypt.hash(this.password,10);
     this.cpassword = await bcrypt.hash(this.cpassword,10);
     next();
    } 
})

const user = new mongoose.model("users",userss);
module.exports = user;