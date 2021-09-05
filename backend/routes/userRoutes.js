const express = require('express')
const router = express.Router()
const {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser} = require('../controller/userController')
const {validateUser, isAdmin} = require('../middleware/authorizationMiddleware')

router.route('/').post(registerUser).get(validateUser,isAdmin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(validateUser ,getUserProfile).put(validateUser, updateUserProfile)
router.route('/:id').delete(validateUser, isAdmin, deleteUser)
                    .get(validateUser, isAdmin, getUserById)
                    .put(validateUser, isAdmin, updateUser)

module.exports = router