const mongoose = require("mongoose");

const db = "mongodb+srv://viharp2002:viharPrajapati@cluster0.fzojtay.mongodb.net/iForum?retryWrites=true&w=majority";

mongoose.connect(db).then(()=>{
   console.log("connection");
}).catch((error)=>{
    console.log(error);
})