let authReq = (req, res, next) =>{
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('./error');
    }
}

module.exports = authReq;