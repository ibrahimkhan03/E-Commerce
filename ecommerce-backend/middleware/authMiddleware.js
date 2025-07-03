const jwt = require('jsonwebtoken');

 const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Access Denied'});  
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message: 'Invalid Token'});
    }
};

 const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message: 'You are not authorized to access this resource'});
        }
        next();
    }
};

module.exports = {
    authenticateUser,
    authorizeRoles,
};