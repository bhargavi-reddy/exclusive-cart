const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword){
    console.log(this.password)
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    // next()
})

const User = mongoose.model('User', userSchema)
module.exports = User