const express = require('express')
const User = require('../model/user')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/api/signin', async(req, res) => {
    try{
        const {email,password} = req.body

        // check weather email and password are not empty
        if(!email || !password){
            return res.status(422).send({error:"empty fields"})
        }

        // find user in database
        const getUser = await User.findOne({email})
        if(!getUser){
            return res.status(400).send({error:"user not found"})
        }

        // password validation if user found (req.body.password should match with the pass in db)
        const passMatch = await bcryptjs.compare(password,getUser.password)
        if(!passMatch){
            return res.status(400).send({error:"Invalid Credentials!!"})
        }
        // generating authentication token and storing it in cookies
        let token = await getUser.generateAuthToken();
        res.cookie('jwt',token,{
            expires: new Date(Date.now()+ 300000)
        })

        // console.log(req.body)
        res.status(200).send({message:"Login Successfull!!"})
    }
    catch(err){
        // console.log(err)
        res.status(400).send(err)
    }
})

router.get('/api/logout',async(req,res)=>{
    try{
      
        // const res = await User.findByIdAndUpdate({id},{"tokens":[]})
        // console.log(res)
        res.clearCookie('jwt',{path:'/'})
        res.status(200).send({success:"user Logout Successfully!"})
    } catch(err){
        // console.log(err)
        res.status(400).send(err)
    }
})
module.exports = router