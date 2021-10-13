const express = require('express')
const Data = require('../model/data')
const router = express.Router()
const validator = require('validator');
const authenticate = require('../middleware/authenticate')

router.get('/api/data',authenticate, async (req, res) => {
    const d = await Data.find()
    res.status(200).send(d)
})
router.get("/api/getuser",authenticate,(req,res)=>{
    res.status(200).send(req.user)
})
router.post('/api/adddata',
    async (req, res) => {
        try {
            const { username, email, phone, address } = req.body;

            // check weather any one of the input is empty
            if (!username || !email || !phone || !address) {
                return res.status(422).send({ error: "Empty Fields" })
            }

            if (!validator.isAlphanumeric(username)) {
                return res.status(422).send({ error: "Username Should be AlphaNumeric" })
            }

            if (!validator.isEmail(email)) {
                return res.status(422).send({ error: "Enter a valid email" })
            }

            const findemail = await Data.findOne({ email })
            if (findemail) {
                return res.status(422).send({ error: "Email already exist!!" })
            }

            if (!validator.isLength(`${phone}`, 10, 10)) {
                return res.status(422).send({ error: "Enter a valid phone number" })
            }

            const doc = new Data({ username, email, phone, address })
            const d = await doc.save()

            res.status(201).send({ success: "User Registered Successfully!!" })
        } catch (err) {
            console.log(err)
            res.status(400).send({ error: err })
        }
    })

router.delete('/api/deletedata/:id', async (req, res) => {
    try {

        const { id } = req.params
        const deleted = await Data.findByIdAndDelete(id)

        if (!deleted) {
            res.status(400).send({ error: "User Not Deleted" })
        }
        res.status(202).send({ success: "User Deleted Successfully!!" })

    } catch (err) {
        res.status(400).json({ err });
    }
})

module.exports = router;