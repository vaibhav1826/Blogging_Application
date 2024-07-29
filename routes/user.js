const {Router} = require('express');
const route = Router();
const users = require('../models/user.js');

route.get('/signin',(req,res)=>{
  return res.render('signin');
});

route.get('/signup',(req,res)=>{
    return res.render('signup');
});

route.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/");
})
route.post('/signin',async(req,res)=>{
    const {email , password} = req.body ;
    try {
        const token = await users.matchpasswordandgeneratetoken(email,password);
    return res.cookie("token",token).redirect("/");

    } catch (error) {
        return res.render("signin",{
            error: "Incorrect email and  password" ,
        });
    }
});


route.post('/signup',async(req,res)=>{
    const {fullName, email , password} = req.body ;
    await users.create({
        fullName, email ,password
    });
    return res.redirect("/");
});

module.exports = route;