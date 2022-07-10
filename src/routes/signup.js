const { request } = require('express');
const express = require('express');
const session = require('express-session');
const bcryptjs =require('bcryptjs');
const signupRouter = express.Router();



// model
const signupData = require('../model/signupModel');
// model for storing session
const mongodbStore = require('../model/sessionDB');

// session middleware
signupRouter.use(session({
    secret:'this will secure the data',
    resave: false,
    saveUninitialized: false,
    store:mongodbStore
}));

function router(nav,log,adminNav){

    signupRouter.get('/',(req,res)=>{
        if(!req.session.isAuth){
            res.render('signup',{
                nav:[
                {
                    link:'/login',
                    name: 'Login'
                },
                {   
                    link:'/signup',
                    name: 'Signup'

                }
                ],
                title:'Library',
                heading:'Signup'
            });
        }else if(req.session.isAuth==="admin"){
            res.render('signup',{
                nav:adminNav,
                title:'Library',
                heading:'Signup'
            });
        }else if(req.session.isAuth==="user"){
            res.render('signup',{
                nav,
                title:'Library',
                heading:'Signup'
            });
        }
        

    });

    signupRouter.post('/add',async(req,res)=>{
        var hashPswd = await bcryptjs.hash(req.body.pswd,12);
        var item ={
            name: req.body.name,
            email : req.body.email,
            password : hashPswd,
            address : req.body.adrs,
            address2 : req.body.adrs2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        }

        var data = signupData(item);
        await data.save();
        res.redirect('/login');


    });

    

    return signupRouter;
}

module.exports = router;