const express = require('require');
const app = express(); 
const PORT = 5000;



// server on localhost:5000 
app.listen(PORT,()=>{
console.log(`server starting on port : ${PORT}`);
});