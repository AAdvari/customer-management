const jwt = require('jsonwebtoken');
const envVars = require('dotenv').config().parsed;

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) 
        return res.status(401).send('Access Denied');
    try{
        const decodedObj = jwt.verify(token,envVars.jwtPrivateKey);
        req.user = decodedObj;
        next();
    }
    catch(err){
        res.status(400).send('Invalid Token');
    }
}