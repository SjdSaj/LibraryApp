

const { request } = require('express');
const express = require('express');
const sec = express();
const session = require('express-session');

const mongodbStore = require('../model/sessionDB');












// session middleware
const abc = sec.use(session({
    secret:'this will secure the data',
    resave: false,
    saveUninitialized: false,
    store:mongodbStore
}));
// const isAuth = (req,res,next)=>{
//     if(req.session.isAuth){
//         next()
//     }else{
//         res.redirect('/login')
//     }
// }

module.exports = abc;