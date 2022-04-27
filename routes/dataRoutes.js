const express = require('express')
const router = express.Router()
const { getData, setData, updateData, deleteData } = require('../controllers/dataController')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getData)
    .post(protect, setData)
router.route('/:id')
    .put(protect, updateData)
    .delete(protect, deleteData)

module.exports = router 