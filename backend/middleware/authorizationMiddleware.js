const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const validateUser = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            req.userId = decoded.id
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized....')
        }


    } else {
        res.status(401)
        throw new Error('Not authorized....')
    }

})

const isAdmin = asyncHandler(async(req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as admin to access the data')
    }
})

module.exports = {validateUser, isAdmin}