const { request } = require('express'); 
const express = require('express');
const session = require('express-session')
const multer = require('multer');
const fs = require('fs');

// importing the models for the database schema
const bookData = require('../model/database');
const authorData = require('../model/authorModel'); 

const adminRouter = express.Router();


// model for storing session
const mongodbStore = require('../model/sessionDB');

// session middleware
adminRouter.use(session({
    secret:'this will secure the data',
    resave: false,
    saveUninitialized: false,
    store:mongodbStore
}));

// multer middleware
const fileStoreEngine = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'./public/img');
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+"--"+file.originalname);
    }
})
const upload = multer({
    storage : fileStoreEngine
})

function router(nav,log,adminNav){
    

    adminRouter.get('/addBook',(req,res)=>{
        if (req.session.isAuth === 'admin') {
            bookData.find()
                .then(function (books) {


                    res.render('addBook', {
                        nav:adminNav,
                        title: 'Addbooks',
                        book: books
                    });
                })
        }else if (req.session.isAuth === 'user'){
            res.redirect('/login');
        }else{
            res.redirect('/login');
        }
        
        
            
        
            
        
        
    });
    adminRouter.get('/addAuthor',(req,res)=>{
        
        if (req.session.isAuth === 'admin') {
            authorData.find()
                .then(function (books) {


                    res.render('addAuthor', {
                        nav:adminNav,
                        title: 'Add Author',
                        book: books
                    });
                })
        }else{
            res.redirect('/login');
        }
        
       
            
    
    
    });


    adminRouter.post('/addAuthor/added',upload.single('img'),(req,res)=>{
        
        var item = {
            name: req.body.name,
            work: req.body.work,
            genre: req.body.genre,
            age: req.body.age,
            img: req.file.filename,
            desc: req.body.desc
        }

        var data = authorData(item);
        data.save();
        res.redirect('/admin/addAuthor');
    
    
    });

    // POST request for adding books
    adminRouter.post('/addBook',upload.single('img'),(req,res)=>{



        var item = {
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre,
            img: req.file.filename
        }

        var book = bookData(item);
        book.save();
        res.redirect('/admin/addBook');
        // res.send('the data\'s are been submited');
        
    });
    // get request for update books
    adminRouter.get('/addBook/update/:id',(req,res)=>{
        var id = req.params.id;
        if (req.session.isAuth === 'admin') {
            bookData.findOne({ _id: id }).
                then(function (data) {
                    res.render('updateBook', {
                        data,
                        nav:adminNav,
                        title: 'Library App'
                    })
                })
        }else{
            res.redirect('/');
        }
        
        
    })
    // POST request for update books
    adminRouter.post('/addBook/update/:id&&:pImg',upload.single('img'),(req,res)=>{
        var id = req.params.id;
        var pImg = req.params.pImg;
        console.log(pImg);
        fs.unlink(`./public/img/${pImg}`,(err)=>{
            if(err){
                throw err;
            }
        })

        var item = {
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre,
            img: req.file.filename
        }
        

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
    adminRouter.post('/addBook/delete/:id&&:img',(req,res)=>{
        var id = req.params.id;
        var img = req.params.img;
        
        fs.unlink(`./public/img/${img}`,(err)=>{
            if(err){
                throw err;
            }
        });
        bookData.deleteOne({_id:id})
        .then(function(){
            res.redirect('../');
        })
        
    })

    // get request for update author
    adminRouter.get('/addAuthor/update/:id',(req,res)=>{
        var id = req.params.id;
        if (req.session.isAuth === 'admin') {
            authorData.findOne({ _id: id }).
                then(function (data) {
                    res.render('updateAuthor', {
                        data,
                        nav:adminNav,
                         title: 'Library App'
                    })
                })
        }else{
            res.redirect('/');
        }
        
        
    })

    // POST request for Updating Author
    adminRouter.post('/addAuthor/update/:id&&:img',upload.single('img'),(req,res)=>{
        var id = req.params.id;
        var item = {
            name: req.body.name,
            work: req.body.work,
            genre: req.body.genre,
            desc: req.body.desc,
            img: req.file.filename
        }
        var pImg = req.params.img;
        fs.unlink(`./public/img/${pImg}`,(err)=>{
            if(err){
                throw err;
            }
        });
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
    adminRouter.post('/addAuthor/delete/:id&&:img',(req,res)=>{
        var id = req.params.id;
        fs.unlink(`./public/img/${req.params.img}`,(err)=>{
            if(err){
                throw err;
            }
        });

        authorData.deleteOne({_id:id})
        .then(function(){
            res.redirect('../');
        })
        
    })

   
    return adminRouter;
}


module.exports = router;