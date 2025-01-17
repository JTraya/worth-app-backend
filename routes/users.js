const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

const userRouter = require('../controllers/users')

router.post('/signup', userRouter.signup)
router.post('/login', userRouter.login)


module.exports = router;