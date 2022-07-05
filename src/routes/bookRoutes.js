const { request } = require('express');
const express = require('express');
const router =  express.Router();
const booksData = require('../model/database');


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

        if (log) {
            booksData.find()
                .then(function (books) {
                    res.render('books', {
                        nav:adminNav,
                        title: 'Libarary',
                        heading: 'BOOKS',
                        books
                    });
                })
        } else {
            booksData.find()
                .then(function (books) {
                    res.render('books', {
                        nav,
                        title: 'Libarary',
                        heading: 'BOOKS',
                        books
                    });
                })
        }


        
    })

    // router.get('/single',(req,res)=>{
    //     res.send('hey , this is single book');
    //     res.end();
    // })

    router.get('/:name', (req, res) => {
        const name = req.params.name;
        if(log){
            booksData.findOne({_id:name})
        .then(function(book){
            res.render('singleBook', {
                nav:adminNav,
                title: 'Library',
                heading: 'BOOK',
                book
            });
        })
        }else{
            booksData.findOne({_id:name})
        .then(function(book){
            res.render('singleBook', {
                nav,
                title: 'Library',
                heading: 'BOOK',
                book
            });
        })
        }
        
        
    });
    return router;

}


module.exports = booksrouter;