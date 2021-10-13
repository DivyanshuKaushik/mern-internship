const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

// middleware to hash the password before saving to database using bcryptjs
userSchema.pre('save',async function(next){
    // console.log("hasing pass")
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password,12)
    }
    next();
})

// generating token for user authentication
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token}) 
        await this.save()
        return token;
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}

const User = mongoose.model("User",userSchema)

module.exports = User