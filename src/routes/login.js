const { request } = require('express');
const express = require('express');
const session = require('express-session');
const mongodbStore = require('../model/sessionDB');
const bcryptjs = require('bcryptjs');
const loginRouter = express.Router();

const signupData = require('../model/signupModel');

// session middleware
loginRouter.use(session({
    secret:'this will secure the data',
    resave: false,
    saveUninitialized: false,
    store:mongodbStore
}));


function router(nav,log,adminNav){

    loginRouter.get('/',(req,res)=>{
        if(!req.session.isAuth){
            res.render('login',{
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
                heading:'Login'
            });
        }
        

    });

    loginRouter.post('/check',async(req,res)=>{

        var username = req.body.username;
        const pswd = req.body.pswd;

        const user = await signupData.findOne({name:username});

        if ((req.body.username === 'admin') && (req.body.pswd === 'admin')) {
            
            req.session.isAuth = 'admin';
            return res.redirect('/');
                
        } 
        

        if(!user){
           return res.redirect('/login'); 
        }else{
            const isMatch =await bcryptjs.compare(pswd,user.password);

            if(!isMatch){
                return res.redirect('/login')
            }else{
                req.session.isAuth = 'user';
                return res.redirect('/')
            }
        }

        // *************************
        // if ((req.body.username === 'admin') && (req.body.pswd === 'admin')) {
            
        //     res.redirect('/');
            
        // } else {
        //     signupData.findOne({ name: req.body.username, password: req.body.pswd })
        //         .then(function (data) {
                    
        //             if (data == null) {
        //                 res.redirect('/login');

        //             }
        //             else if ((req.body.username === data.name) && (req.body.pswd === data.password)) {
        //                 res.redirect('/');

        //             } else {
        //                 res.redirect('/login');
        //             }
        //         })
        // }
  

    });

    

    

    return loginRouter;
}

module.exports = router;