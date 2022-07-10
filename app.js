// Nav bar
const nav = [
    {
        link: '/books', name: 'Books'
    },
    // {
    //     link:'/admin/addBook', name:'Add Books'
    // },
    {
        link: '/author', name: 'Author'
    },
    // {
    //     link: '/admin/addAuthor', name: 'Add Author'
    // },
    {
        link: '/logout', name: 'Logout'
    }
]

const adminNav = [
    {
        link: '/books', name: 'Books'
    },
    {
        link:'/admin/addBook', name:'Add Books'
    },
    {
        link: '/author', name: 'Author'
    },
    {
        link: '/admin/addAuthor', name: 'Add Author'
    },
    {
        link: '/logout', name: 'logout'
    }
]

// Login var 
var login = false;

const { request } = require('express');
const express = require('express');
const session = require('express-session');

const authorRouter = require('./src/routes/authorRoute')(nav,login,adminNav);
const booksRouter = require('./src/routes/bookRoutes')(nav,login,adminNav);
const loginRouter = require('./src/routes/login')(nav,login,adminNav);
const signupRouter = require('./src/routes/signup')(nav,login,adminNav);
const adminRouter = require('./src/routes/adminRoute')(nav,login,adminNav);
const app = express();



// importing models
const bookData = require('./src/model/database');
const mongodbStore = require('./src/model/sessionDB');

// const port = process.env.port || 8000;
// For using Styles in express
app.use(express.static('./public'));
// 
// For using Routing handler
app.use(express.urlencoded({extended:true}));
app.use('/books',booksRouter);
app.use('/author',authorRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/admin',adminRouter);
// For setting ejs  
app.set('view engine','ejs');
app.set('views','./src/views')
//

// session middleware
app.use(session({
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


app.get('/',(req,res)=>{

    if(!req.session.isAuth){
        console.log(req.session.isAuth);
        res.redirect('/login');
    }else if(req.session.isAuth==='admin'){
        console.log("this is " + req.session.isAuth);
        bookData.find()
            .then(function (data) {

                res.render('index', {
                    nav:adminNav,
                    title: 'Libarary',
                    data
                });

            })
    } else if (req.session.isAuth === 'user') {
        console.log("this is " + req.session.isAuth);
        bookData.find()
            .then(function (data) {

                res.render('index', {
                    nav,
                    title: 'Libarary',
                    data
                });

            })
    }
    
  
    // bookData.find()
    // .then(function(data){
        
    //         res.render('index', {
    //             nav,
    //             title: 'Libarary',
    //             data
    //         });
        
    // })
    
    
});

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
})



app.listen(3000);
console.log('Server is running on PORT: 3000');