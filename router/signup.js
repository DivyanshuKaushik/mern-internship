const express = require('express')
const User = require('../model/user')
const router = express.Router()

// router.get('/signup',(req,res)=>{
//     res.status(200).send("Hello lets signup")
// })

router.post('/api/signup', async(req, res) => {
    try{
        const {name,email,phone,password,cpassword} = req.body;

        // check weather any one of the input is empty
        if(!name || !email || !phone || !password || !cpassword){
            return res.status(422).send({error:"Empty Fields"})
        }

        //check weather if user has already signed up
        const findemail = await User.findOne({email:req.body.email})
        if(findemail){
            return res.status(422).send({error:"Email already exist!!"})
        }

        // check weather password and confirm password matches
        if(password!=cpassword){
            return res.status(422).send({error:"password and confirm password should be same"})
        }

        // post data to the database
        const doc = new User({name,email,phone,password})
        const d = await doc.save()

        res.status(201).send({success:"User Registered Successfully!!"})
        // console.log(req.body)
        // res.status(201).send(req.body)
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router;