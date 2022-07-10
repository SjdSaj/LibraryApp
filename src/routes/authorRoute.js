const { request } = require('express');
const express = require('express');
const session = require('express-session');
const authorRouter = express.Router();

// model
const Database = require('../model/authorModel')
// model for storing session
const mongodbStore = require('../model/sessionDB');

// session middleware
authorRouter.use(session({
    secret:'this will secure the data',
    resave: false,
    saveUninitialized: false,
    store:mongodbStore
}));




function router(nav,log,adminNav){
    // var authors = [
    //     {
    //         title: 'Tom and Jerry',
    //         author: 'Joseph Barera',
    //         img:'joseph.jpg'
    //     },
    //     {
    //         title: 'Harry Potter',
    //         author: 'J K Rowling',
    //         img:'rowling.jpg'
    //     },
    //     {
    //         title: 'Pathumayude aadu',
    //         author: 'Basheer',
    //         img:'basheer.jpg'
    //     }
        
        
   // ]
    authorRouter.get('/',(req,res)=>{

        if (req.session.isAuth === 'admin') {
            Database.find()
                .then(function (books) {
                    res.render('author', {
                        nav:adminNav,
                        title: 'Libarary',
                        heading: 'Authors',
                        books
                    });
                })

        }else if(req.session.isAuth === 'user'){
            Database.find()
                .then(function (books) {
                    res.render('author', {
                        nav,
                        title: 'Libarary',
                        heading: 'Authors',
                        books
                    });
                })
        }else{
            res.redirect('/login');
        }
        
    });

    authorRouter.get('/:name',(req,res)=>{
        var name = req.params.name;
        if (req.session.isAuth === 'admin') {
            Database.findOne({ _id: name })
                .then(function (book) {
                    res.render('singleAuthor', {
                        nav:adminNav,
                        title: 'Libarary',
                        heading: 'Authors',
                        book
                    });
                })
        }else if(req.session.isAuth === 'user'){
            Database.findOne({ _id: name })
                .then(function (book) {
                    res.render('singleAuthor', {
                        nav,
                        title: 'Libarary',
                        heading: 'Authors',
                        book
                    });
                })
        }else{
            res.redirect('/login');
        }
        

    });
    return authorRouter;
};


module.exports = router;