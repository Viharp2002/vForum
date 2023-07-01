const jwt = require("jsonwebtoken");
const User = require("../modules/users");

const requireAuth = async(req,res,next)=>{
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({message:"please Login"});
    }

    const token = authorization;

    try {
       const {_id} = jwt.verify(token,process.env.TOKEN);

       req.user = await User.findOne({_id});
       req.id = await User.findOne({_id}).select({_id});
       next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message:"Error"});
    }
};

module.exports = requireAuth;