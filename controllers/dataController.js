const asyncHandler = require('express-async-handler')
const Data = require('../models/dataSchema')
const User = require('../models/userSchema')

// @desc Get Data
// @route Get /api/data
// @access Private
const getData = asyncHandler( async (req, res) => {
    const data = await Data.find({ user: req.user.id })
    res.status(200).json(data)
})

// @desc Set Data
// @route Post /api/data
// @access Private
const setData = asyncHandler( async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const data = await Data.create({
        text: req.body.text,
        user: req.user.id 
    })
    res.status(200).json(data)    
})

// @desc Update Data
// @route Put /api/data/:id
// @access Private
const updateData = asyncHandler( async (req, res) => {
    const data = await Data.findById(req.params.id)
    if(!data) {
        res.status(400)
        throw new Error(`Data not found`)
    }
    
    //Instead of taking the req.user 
    const user = await User.findById(req.user.id)

    //Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //After the func above we know there is someone signed in

    //Make sure the login user matches the data user
    if (data.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedData)
})

// @desc Delete Data
// @route Delete /api/data/:id
// @access Private
const deleteData = asyncHandler( async (req, res) => {
    const data = await Data.findById(req.params.id)
    if(!data) {
        res.status(400)
        throw new Error(`Data not found`)
    }
    const user = await User.findById(req.user.id)

    //Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //After the func above we know there is someone signed in

    //Make sure the login user matches the data user
    if (data.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await Data.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getData,
    setData,
    updateData,
    deleteData,
}