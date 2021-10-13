const jwtoken = require('jsonwebtoken')
const User = require("../model/user")

const authenticate = async(req,res,next)=>{
    try{
        let token = req.cookies.jwt;
        const verifytoken = jwtoken.verify(token,process.env.SECRET_KEY);
        // console.log(token,verifytoken)

        const user = await User.findOne({_id:verifytoken._id,"tokens.token":token })
        // console.log(user)
        if(!user){throw new Error("User not found")}

        req.token = token
        req.user = user
        next();
    }catch(e){
        res.status(400).send("unauthorized")
        // console.log(e);
    }
}

module.exports = authenticate