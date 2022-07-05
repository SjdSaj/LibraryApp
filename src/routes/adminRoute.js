const { request } = require('express'); 
const express = require('express');

// importing the models for the database schema
const bookData = require('../model/database');
const authorData = require('../model/authorModel'); 

const adminRouter = express.Router();


function router(nav,log,adminNav){
    

    adminRouter.get('/addBook',(req,res)=>{
        
        bookData.find()
        .then(function(books){

            
            res.render('addBook',{
                nav,
                title:'Addbooks',
                book:books
            });
        })
        
            
        
            
        
        
    });
    adminRouter.get('/addAuthor',(req,res)=>{
        
        
        authorData.find()
        .then(function(books){

            
            res.render('addAuthor',{
                nav,
                title:'Add Author',
                book:books
            });
        })
       
            
    
    
    });


    adminRouter.post('/addAuthor/added',(req,res)=>{
        
        var item = {
            name: req.body.name,
            work: req.body.work,
            genre: req.body.genre,
            age: req.body.age,
            img: req.body.img,
            desc: req.body.desc
        }

        var data = authorData(item);
        data.save();
        res.redirect('/admin/addAuthor');
    
    
    });

    // POST request for adding books
    adminRouter.post('/addBook',(req,res)=>{
        var item = {
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre,
            img: req.body.img
        }

        var book = bookData(item);
        book.save();
        res.redirect('/admin/addBook');
        // res.send('the data\'s are been submited');
        
    });
    // get request for update books
    adminRouter.get('/addBook/update/:id',(req,res)=>{
        var id = req.params.id;
        bookData.findOne({_id:id}).
        then(function(data){
            res.render('updateBook',{
                data,
                nav,title:'Library App'
            })
        })
        
    })
    // POST request for update books
    adminRouter.post('/addBook/update/:id',(req,res)=>{
        var id = req.params.id;
        var item = {
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre,
            img: req.body.img
        }
        console.log(item)

        bookData.updateOne({_id:id},{$set:{
            name:item.name,
            author:item.author,
            genre:item.genre,
            img:item.img
        }}).then(function(){
            res.redirect('../');
        })
        
    })

    // POST request for delete book
    adminRouter.post('/addBook/delete/:id',(req,res)=>{
        var id = req.params.id;
        

        bookData.deleteOne({_id:id})
        .then(function(){
            res.redirect('../');
        })
        
    })

    // get request for update author
    adminRouter.get('/addAuthor/update/:id',(req,res)=>{
        var id = req.params.id;
        authorData.findOne({_id:id}).
        then(function(data){
            res.render('updateAuthor',{
                data,
                nav,title:'Library App'
            })
        })
        
    })

    // POST request for Updating Author
    adminRouter.post('/addAuthor/update/:id',(req,res)=>{
        var id = req.params.id;
        var item = {
            name: req.body.name,
            work: req.body.work,
            genre: req.body.genre,
            desc: req.body.desc,
            img: req.body.img
        }
        // console.log(item)

        authorData.updateOne({_id:id},{$set:{
            name:item.name,
            work:item.work,
            genre:item.genre,
            desc: item.desc,
            img:item.img
        }}).then(function(){
            res.redirect('../#textarea');
        })
        
    })

    // POST request for delete Author
    adminRouter.post('/addAuthor/delete/:id',(req,res)=>{
        var id = req.params.id;
        

        authorData.deleteOne({_id:id})
        .then(function(){
            res.redirect('../');
        })
        
    })

   
    return adminRouter;
}


module.exports = router;