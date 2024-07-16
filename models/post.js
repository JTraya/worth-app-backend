

const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    game: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    worth: {
        type: String,
        enum: ['Worth!', 'Not Worth.', 'Is it Worth?'],
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post;