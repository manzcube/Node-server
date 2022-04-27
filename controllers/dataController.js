const asyncHandler = require('express-async-handler')

// @desc Get Data
// @route Get /api/data
// @access Private
const getData = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'Get data'})
})

// @desc Set Data
// @route Post /api/data
// @access Private
const setData = asyncHandler( async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'Set Data'})    
})

// @desc Update Data
// @route Put /api/data/:id
// @access Private
const updateData = asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Update Data ${req.params.id}`})
})

// @desc Delete Data
// @route Delete /api/data/:id
// @access Private
const deleteData = asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Delete Data ${req.params.id}`})
})

module.exports = {
    getData,
    setData,
    updateData,
    deleteData,
}