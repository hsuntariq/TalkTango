const AsyncHandler = require('express-async-handler');
const user = require('../models/userModel');
const jwt = require('jsonwebtoken')
const authMiddleware = AsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            let decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user.findById(decode.id);
            next();
            console.log(req.user)
        } catch (error) {
            throw new Error('Not authorized,wrong token')
        }
    } else {
        throw new Error('not authorized, no token');
    }
     
})


module.exports = authMiddleware;