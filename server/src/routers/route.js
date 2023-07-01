const express = require('express');
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
app.use(express.json());

const User = require("../modules/users");
const Technology = require("../modules/technologies");
const Doubt = require("../modules/doubts");
const Comment = require("../modules/comment");
const requireAuth = require("../middlewares/auth");

const router = new express.Router();

const createToken = (_id)=>{
  return jwt.sign({_id},process.env.TOKEN);
}

//add doubts in database
router.post("/doubtPosting",requireAuth,async(req,res)=>{
    try {
      const{question,desc,techname} = req.body;
      const user = req.id;
      const uid = user._id;
      
      if (!question || !desc) {
         throw new Error("fill up");
      }

      const doub = new Doubt({
        techname,question,desc,uid
      });
      await doub.save();

      res.status(201).json("ok");
    } catch (error) {
      console.log(error);
      res.status(401).json({message:error.message});
    }
})

//add comments in database
router.post("/commentPosting/:_id",requireAuth,async(req,res)=>{
  try {
    const{desc} = req.body;
    const id = req.id;
    const uid = id._id;
    const doubtId = req.params;

    
    if (!desc) {
      throw new Error("fill up");
    }
    const vihar = new Comment({
      desc,uid,doubtId
    });

    await vihar.save();
    res.status(201).json("ok");
  } catch (error) {
    console.log(error);
    res.status(401).json({message:error.message});
  }
})

//for displaying in Comment.js's jumbotron
router.get("/fetchDoubt/:_id",async(req,res)=>{
    try {
       const {_id} = req.params;

       let ans = await Doubt.find({_id:_id},{ question: 1, desc: 1, _id:0 })
        
       res.status(201).json(ans);
    } catch (error) {
      console.log(error);
      res.status(401).json({message:error.message});
    }
})

//this retrives doubts
router.get("/doubtGetting/:techname",async(req,res)=>{
    try {
      const{techname} = req.params;

      let doubtss = await Doubt.find({techname:techname});

      res.status(201).json(doubtss);
    } catch (error) {
      console.log(error);
      res.status(401).json({message:error.message});
    }
})

//this retrives comments
router.get("/commentGetting/:doubtId",async(req,res)=>{
  try {
    const{doubtId} = req.params;

    let comm = await Comment.find({doubtId:doubtId});
    res.status(201).json(comm);
  } catch (error) {
    console.log(error);
    res.status(401).json({message:error.message});
  }
});

//this is different from above route...it simply sends username in Comment.js
router.get("/commentGettingWithUname/:doubtId",async(req,res)=>{
  try {
    const{doubtId} = req.params;

    let comm = await Comment.find({doubtId:doubtId});
    let _id = comm[0].uid;

    let uname = await User.find({_id:_id});
    res.status(201).json(uname[0].username);
  } catch (error) {
    console.log(error);
    res.status(401).json({message:error.message});
  }
})

//insert new technologies via admin
router.post("/technologies",async(req,res)=>{
  try {
    const {techname,techfounder} = req.body;

    if (!techname || !techfounder) {
      throw new Error("fill up");
    }

    const tech = new Technology(req.body);
    await tech.save();

    res.status(201).json("ok");
  } catch (error) {
    console.log(error);
    res.status(401).json({message:error.message});
  }
})

//technologies shown in Home.js
router.get("/techShow",async(req,res)=>{
  try {
    let techno = await Technology.find();
    res.status(201).json(techno);
  } catch (error) {
    console.log(error);
    res.status(401).json({message:error.message});
  }
}) 

//signup
router.post("/signup",async(req,res)=>{
  try {
    const {email,username,password,cpassword} = req.body;

    if(!email || !username || !password || !cpassword){
      throw new Error("fill up");
    }
    if (password!==cpassword) {
      throw new Error("passwords both should match");
    }

    const usermail = await User.findOne({email:email});

    if(!usermail){
        const userr = new User(req.body);
        const token = createToken(userr._id);

        await userr.save();

        res.status(201).json({token});
    }else{
       throw new Error("email is already there");
    }

  } catch (error) {
    // console.log(error);
    res.status(401).json({message:error.message});
  }
})

//login
router.post("/login",async(req,res)=>{
  try {
    const {email,password} = req.body;

    if (!email || !password) {
      throw new Error("fill up");
    }

    const mail = await User.findOne({email:email});

    if (mail) {
      const compare = await bcrypt.compare(password,mail.password);
      if (compare) {
        const token = createToken(mail._id);
        res.status(201).json({token});
      }else{
        throw new Error("invalid user");
      }
    }else{
      throw new Error("user invalid");
    }
  } catch (error) {
    // console.log(error);
    res.status(401).json({message:error.message});
  }
})

//change password of user
router.post("/changepass",requireAuth,async(req,res)=>{
  try {
      const password = req.body.password;
      const npassword = req.body.npassword;
      const ncpassword = req.body.ncpassword;

      if(!password || !npassword || !ncpassword)
      {
          throw new Error("fill all");
      }
      if(npassword!==ncpassword)
      {
          throw new Error("password both should macthed");  
      }
      const userAvail = req.user;
      const compare = await bcrypt.compare(password,userAvail.password);
      
      if(!compare)
      {
          throw new Error("old");
      }

    const  bnpassword = await bcrypt.hash(npassword,10);
      const bncpassword = await bcrypt.hash(ncpassword,10);

      const updatePassword = await User.updateOne({_id: userAvail._id},{$set:{password:bnpassword}})
      const updateCpassword = await User.updateOne({_id: userAvail._id},{$set:{cpassword:bncpassword}})
      


      res.status(201).json({msg:'success'});
  } catch (error) {
      console.log(error);
      res.status(401).json({msg: error.message});
  }
})

//change email,username of user
router.post("/changeemail",requireAuth,async(req,res)=>{
  try {
      const email = req.body.email;
      const username = req.body.username;
      const user = req.user;
       
      if(!email || !username)
      {
          throw new Error("Fill please");
      }
  
      await User.updateOne({_id: user._id},{$set:{email:email,username:username}}); 
      
      res.status(201).json({msg:'success'});
  } catch (error) {
      console.log(error);
      res.status(422).json({msg: error.message});
  }
})

//showing profile data(username,email)
router.get('/profile',requireAuth,async(req,res)=>{
  try {
      res.status(201).json(req.user);
  } catch (error) {
      console.log(error);
      res.status(422).json({msg: error.message});
  }
})

module.exports = router;