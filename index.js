const path =require('path');
const express = require('express');
const app = express(); 
const userRoute = require('./routes/user.js');
const PORT = 5000;

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use('/user',userRoute);


// server on localhost:5000 
app.listen(PORT,()=>{
console.log(`server starting on port : ${PORT}`);
});