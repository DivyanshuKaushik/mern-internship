const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')


router.get("/api/about",authenticate,(req,res)=>{
    res.status(200).send(req.user)
})

module.exports = router