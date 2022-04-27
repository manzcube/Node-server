const asyncHandler = require('express-async-handler')
const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { TokenExpiredError } = require('jsonwebtoken')


// @desc Register new user
// @route Post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    //Take the values of the inputs
    const { name, email, password } = req.body
    //Check if every field has been filled
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }
    //Check if the user exists
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hasedPw = await bcrypt.hash(password, salt)
    // Creation of user
    const user = await User.create({ name, email, password: hasedPw })

    //If the user was successfully created
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error ('Invalid user data')
    }
})

// @desc Authenticate a user
// @route Post /api/users
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //Check if every field has been filled
    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    //Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }    
})

// @desc get user data
// @route Get /api/users/:id
// @access Private
//Example on how to protect a route using jwt
const getMe = asyncHandler(async (req, res) => {
    // const { _id, name, email } = await User.findById(req.user.id) WHY DO THAT??
    const { _id, name, email } = req.user
    res.status(201).json({
        id: _id,
        name,
        email
    })
})

//Generate JWT 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}