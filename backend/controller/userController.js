const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const generateTokens = require('../utils/generateTokens')

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(` email : ${email}`)
    const user = await User.findOne({ email })
    console.log(user)
    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateTokens(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.send(401)
        throw new Error('User not found')
    }

})
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name ? req.body.name : user.name
        user.email = req.body.email ? req.body.email : user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateTokens(updatedUser._id)
        })
    } else {
        res.send(401)
        throw new Error('User not found')
    }

})

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists with this emailId')
    }
    const user = await User.create({
        name: name,
        email: email,
        password: password
    })
    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateTokens(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})
    res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message: "User deleted succesfully"})
    }else{
        res.status(404)
        res.json({message: 'User not found..'})
    }
})

const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        res.json({message: 'User not found..'})
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name ? req.body.name : user.name
        user.email = req.body.email ? req.body.email : user.email
        user.isAdmin = req.body.isAdmin ?req.body.isAdmin : user.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.send(401)
        throw new Error('User not found')
    }

})


module.exports = { authUser, getUserProfile, registerUser, updateUserProfile,getUsers, deleteUser, getUserById, updateUser }