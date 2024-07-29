function checkforauthenticationcookie(cookiename){
    return(req ,res ,next)=>{
        const tokencookievalue = req.cookies[cookiename];
        if(!tokencookievalue){
            return next();
        }
        
    try {
        const userpayload =validatetoken(tokencookievalue);
        req.user =userpayload;
    } catch (error) {}
     return next();
    };
}

module.exports ={
checkforauthenticationcookie,
};