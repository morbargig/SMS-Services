
import { Router } from 'express'
const router = Router()
import PhoneNumber, { findOneAndDelete, remove, find } from '../models/phoneNumber'

// const nodemailer = require('nodemailer');

import { json, urlencoded } from 'body-parser'

import sendMassege from '../services/send'

router.use(json())
router.use(urlencoded({ extended: false }))


router.post('/sendSms/:from/:to', function (req, res) {
    let from = req.params.from
    let to = req.params.to
    let text = req.body.text
    sendMassege(from, to, text) 
})
// deleteUser
router.get('/test', function (req, res) {
    res.send("work")
})

router.get('/isItOnline', (req, res) => {
    res.send("server is online")
    console.log("server is online")
})







export default router

    // router.delete('/deleteUser/:phoneNumber', (req, res) => {
    //     // new PhoneNumber({ name: 'morbargig', phoneNumber: '0528612379' }).save()
    //     let key = Object.keys(req.params)[0]
    //     let value = req.params[key]
    //     console.log(key, value)
    //     findOneAndDelete({ [key]: value }, function (err, x) {
    //         res.send(x)
    //     })
    // })
    
    // router.post('/addnewuser', function (req, res) {
    //     console.log(req, req.body)
    //     new PhoneNumber(req.body).save()
    //     res.send('succes!')
    // })
    
    // router.post('/addnewusers', function (req, res) {
    //     console.log(req, req.body.users)
    //     req.body.users.map(r => new PhoneNumber({ phoneNumber: r, _id: r }).save())
    //     res.send('succes!')
    // })
    
    // router.post('/newUsersList', function (req, res) {
    //     console.log(req, "kgjdsnkjnkj", req.body, req.body.users)
    //     remove({}, function (err, result) {
    //         // handle the error if any
    //         if (err) throw err;
    //         console.log("Collection is deleted! " + result);
    //         // close the connection to db when you are done with it
    //     });
    //     req.body.users.map(r => new PhoneNumber({ phoneNumber: r, _id: r }).save())
    //     res.send('succes!')
    // })
    
    
    // router.get('/getUsers', function (req, res) {
    //     find({}).exec(function (err, x) {
    //         res.send(x)
    //     })
    // })