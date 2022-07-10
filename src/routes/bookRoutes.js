const { request } = require('express');
const express = require('express');
const session = require('express-session');
const router =  express.Router();

// model
const booksData = require('../model/database');
// model for storing session
const mongodbStore = require('../model/sessionDB');

// session middleware
router.use(session({
    secret:'this will secure the data',
    resave: false,
    saveUninitialized: false,
    store:mongodbStore
}));

function booksrouter(nav,log,adminNav) {
    // books Router
    // var books = [
    //     {
    //         title: 'Tom and Jerry',
    //         author: 'Joseph Barera',
    //         genre: 'Cartoon',
    //         img: 'tom.jpg'
    //     },
    //     {
    //         title: 'Harry Potter',
    //         author: 'J K Rowling',
    //         genre: 'Fantacy',
    //         img: 'harry.jpg'
    //     },
    //     {
    //         title: 'Pathumayude aadu',
    //         author: 'Basheer',
    //         genre: 'Noval',
    //         img: 'basheer.jpg'
    //     }
    // ]
    router.get('/', (req, res) => {

        if (req.session.isAuth==='admin') {
            booksData.find()
                .then(function (books) {
                    res.render('books', {
                        nav:adminNav,
                        title: 'Libarary',
                        heading: 'BOOKS',
                        books
                    });
                })
        } else if(req.session.isAuth==='user'){
            booksData.find()
                .then(function (books) {
                    res.render('books', {
                        nav,
                        title: 'Libarary',
                        heading: 'BOOKS',
                        books
                    });
                })
        }else{
            res.redirect('/login');
        }


        
    })

    // router.get('/single',(req,res)=>{
    //     res.send('hey , this is single book');
    //     res.end();
    // })

    router.get('/:name', (req, res) => {
        const name = req.params.name;
        if(req.session.isAuth==='admin'){
            booksData.findOne({_id:name})
        .then(function(book){
            res.render('singleBook', {
                nav:adminNav,
                title: 'Library',
                heading: 'BOOK',
                book
            });
        })
        }else if(req.session.isAuth==='user'){
            booksData.findOne({_id:name})
        .then(function(book){
            res.render('singleBook', {
                nav,
                title: 'Library',
                heading: 'BOOK',
                book
            });
        })
        }else{
            res.redirect('/login');
        }
        
        
    });
    return router;

}


module.exports = booksrouter;