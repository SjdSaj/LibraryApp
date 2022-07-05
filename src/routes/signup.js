const { request } = require('express');
const express = require('express');
const signupRouter = express.Router();

const signupData = require('../model/signupModel');


function router(nav){

    signupRouter.get('/',(req,res)=>{
        res.render('signup',{
            nav,
            title:'Library',
            heading:'Signup'
        });

    });

    signupRouter.post('/add',(req,res)=>{

        var item ={
            name: req.body.name,
            email : req.body.email,
            password : req.body.pswd,
            address : req.body.adrs,
            address2 : req.body.adrs2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        }

        var data = signupData(item);
        data.save();
        res.redirect('/login');


    });

    

    return signupRouter;
}

module.exports = router;