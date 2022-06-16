const postcontroller = require('../controller/post')
const {isAuth} = require('../service/auth')
const express = require('express')
const router = express.Router()

router.get('/', postcontroller.getAllPost)
router.post('/', postcontroller.createPosts)
router.delete('/apis', postcontroller.deleteAllPost)
router.delete('/api/:id', postcontroller.deletePost)
router.get('/user/:id', postcontroller.getUser)





module.exports = router