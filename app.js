// Nav bar
const nav = [
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
        link: '/login', name: 'Login/Signup'
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
const authorRouter = require('./src/routes/authorRoute')(nav,login,adminNav);
const booksRouter = require('./src/routes/bookRoutes')(nav,login,adminNav);
const loginRouter = require('./src/routes/login')(nav,login,adminNav);
const signupRouter = require('./src/routes/signup')(nav,login,adminNav);
const adminRouter = require('./src/routes/adminRoute')(nav,login,adminNav);
const app = express();

// importing models
const bookData = require('./src/model/database');


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

app.get('/',(req,res)=>{

    bookData.find()
    .then(function(data){
        if(login){
            res.render('index', {
                nav : adminNav,
                title: 'Libarary',
                data
            });
        }else{
            res.render('index', {
                nav,
                title: 'Libarary',
                data
            });
        }
    })
    
    
});

// app.get('/admin')



app.listen(3000);
console.log('Server is running on PORT: 3000');