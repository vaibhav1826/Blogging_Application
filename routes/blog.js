const {Router} = require('express');
const route = Router();

route.get("/add-new",(req,res)=>{
    return res.render('addBlogs',{
        user : req.user,
    });
});

route.post("/",(req,res)=>{
        console.log(req.body);
        return res.redirect("/");
    });

module.exports = route;