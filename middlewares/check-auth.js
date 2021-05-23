const jwt = require('jsonwebtoken');

const checkAuth = (req,res,next) => {
    try{
        // extracting the token
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token,process.env.JWT_KEY, {expiresIn: '1h'});
        req.userData = decodedToken;
        next();
    }

    catch(error){
        res.status(401).json({
            message : "Invalid or expired token!",
            error
        })
    }
}


module.exports = {
    checkAuth
}