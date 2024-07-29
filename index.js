const path =require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');

const { checkforauthenticationcookie } = require('./middleware/authenthication.js'); // importing middleware

const app = express(); 
const userRoute = require('./routes/user.js');
const blogRoute = require('./routes/blog.js');
const PORT = 5000;

mongoose
.connect("mongodb://localhost:27017/blogging_application")
.then((e)=>console.log(`mongodb connected`));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.urlencoded({ extended :false }));
app.use(cookieparser());
app.use(checkforauthenticationcookie("token"));


app.get('/',async(req,res)=>{
    return res.render('home',{
        user: req.user,
    });
});

app.use('/user',userRoute);
app.use('/blog',blogRoute);

// server on localhost:5000 
app.listen(PORT,()=>{
console.log(`server starting on port : ${PORT}`);
});