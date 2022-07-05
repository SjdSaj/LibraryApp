const { request } = require('express');
const express = require('express');
const authorRouter = express.Router();
const Database = require('../model/authorModel')

function router(nav){
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

        Database.find()
        .then(function(books){
            res.render('author', {
                nav,
                title: 'Libarary',
                heading: 'Authors',
                books
            });
        })

    });

    authorRouter.get('/:name',(req,res)=>{
        var name = req.params.name;
        Database.findOne({_id:name})
        .then(function(book){
            res.render('singleAuthor', {
                nav,
                title: 'Libarary',
                heading: 'Authors',
                book
            });
        })

    });
    return authorRouter;
};


module.exports = router;