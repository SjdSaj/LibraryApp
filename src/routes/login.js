const { request } = require('express');
const express = require('express');
const loginRouter = express.Router();

const signupData = require('../model/signupModel');


function router(nav,log,adminNav){

    loginRouter.get('/',(req,res)=>{
        res.render('login',{
            nav,
            title:'Library',
            heading:'Login'
        });

    });

    loginRouter.post('/check',(req,res)=>{
        
        if ((req.body.username === 'admin') && (req.body.pswd === 'admin')) {
            
            res.redirect('/');
            
        } else {
            signupData.findOne({ name: req.body.username, password: req.body.pswd })
                .then(function (data) {
                    if (data == null) {
                        res.redirect('/login');

                    }
                    else if ((req.body.username === data.name) && (req.body.pswd === data.password)) {
                        res.redirect('/');

                    } else {
                        res.redirect('/login');
                    }
                })
        }

        
        
        
        

    });

    

    

    return loginRouter;
}

module.exports = router;