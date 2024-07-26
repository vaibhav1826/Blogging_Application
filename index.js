const path =require('path');
const express = require('express');
const app = express(); 
const PORT = 5000;

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.get('',(req,res)=>{
res.render('home');
})

// server on localhost:5000 
app.listen(PORT,()=>{
console.log(`server starting on port : ${PORT}`);
});