const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next)=>{
    const token = req.cookies.token; // cookie-parser exposes this
    if(!token){
        return res.redirect('/user/login-account')
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // make user info available
        next();
    }catch(error){
        return res.status(401).render('login-account', {error : "Session expired. Please log in again."})
    }
}


module.exports = checkAuth;

