function checkforauthenticationcookie(cookiename){
    return(req ,res ,next)=>{
        const tokencookievalue = req.cookies[cookiename];
        if(!tokencookievalue){
            next();
        }
        
    try {
        const userpayload =validatetoken(tokencookievalue);
        req.user =userpayload;
        next();
    } catch (error) {}
    next();
    };
}

module.exports ={
checkforauthenticationcookie,
};