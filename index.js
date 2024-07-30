const path =require('path');  // importing path module 
const express = require('express'); // importing express module

// importing mongoose for connection with database
const mongoose = require('mongoose');

// importing cookie-parser module for access
const cookieparser = require('cookie-parser');

//importing blog file from models/blog.js
const Blog = require('./models/blog.js');

const { checkforauthenticationcookie } = require('./middleware/authenthication.js'); // importing middleware

const app = express(); 

const userRoute = require('./routes/user.js');
 // for redirecting into the user.js

 const blogRoute = require('./routes/blog.js');
 // for redirecting into the blog.js

const PORT = 5000;

// connecting database -- mongodb
mongoose
.connect("mongodb://localhost:27017/blogging_application")
.then((e)=>console.log(`mongodb connected`));

// setting the view engine as ejs 
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

// importing middleware 
app.use(express.urlencoded({ extended :false }));
app.use(cookieparser());
app.use(checkforauthenticationcookie("token"));
app.use(express.static(path.resolve("./public")));

// redirecting it to home page 
app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
});


app.use('/user',userRoute);
app.use('/blog',blogRoute);

// server on localhost:5000  
app.listen(PORT,()=>{
console.log(`server starting on port : ${PORT}`);
});
