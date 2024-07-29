const {Router} = require('express');
const route = Router();

route.get("/add-new",(req,res)=>{
    return res.render('addBlogs',{
        user : req.user,
    })
});

module.exports = route;