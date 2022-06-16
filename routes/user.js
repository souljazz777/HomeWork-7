const users = require('../controller/user')
const {isAuth} = require('../service/auth')
const express = require('express')
const router = express.Router()

router.post('/signup', users.signup)
router.post('/signin', users.signin)
router.get('/profile', isAuth,users.getUser)
router.post('/updatepassword', isAuth,users.updatePassword)
router.patch('/profiles', isAuth, users.editUser)




module.exports = router;