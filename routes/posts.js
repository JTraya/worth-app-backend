

const express = require('express')
const router = express.Router()
const postsCtrl = require('../controllers/posts')

router.post('/', postsCtrl.create)

router.get('/', postsCtrl.index)

router.get('/:postId', postsCtrl.show)

router.put('/:postId/edit', postsCtrl.update)

router.delete('/:postId', postsCtrl.deletePost)

module.exports = router;