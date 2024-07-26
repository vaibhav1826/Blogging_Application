const {Router} = require('express');
const route = Router();
const users = require('../models/user.js');

route.get('/signin',(req,res)=>{
  return res.render('signin');
});

route.get('/signup',(req,res)=>{
    return res.render('signup');
});

route.post('/signin',async(req,res)=>{
    const {fullName , email , password} =req.body ;
    await users.create({
        fullName, email ,password
    });
    return res.redirect("/");
});
module.exports = route;