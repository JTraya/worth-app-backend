

const PostModel = require('../models/post')
const UserModel = require('../models/user')

module.exports = {
    create,
    index,
    show,
    update,
    deletePost,
}

async function create(req, res) {
    try {
        req.body.owner = req.user._id
        console.log(req.body, '<----- REQ.BODY')
        const createdPost = await PostModel.create(req.body);
        console.log(createdPost, '<----- CREATEDPOST')
        // createdPost.owner = postOwner._id
        // await createdPost.save()
        await createdPost.populate('owner')
        res.status(201).json(createdPost);
        
    } catch (error) {

        res.status(500).json({error: error.message})
        
    }
}

async function index(req, res) {
    try {

        const postDocs = await PostModel.find({}).populate('owner').exec()
        res.status(200).json(postDocs)
        
    } catch (error) {

        res.status(500).json({error: error.message})
        
    }
}

async function show(req, res) {
    console.log(req.params.postId, '<--- REQ')

    try {

        const foundPost = await PostModel.findById(req.params.postId)
        console.log(foundPost)
        if(!foundPost){
            res.status(404);
            throw new Error('Post Not Found')
        }
        res.json(foundPost)
        
    } catch (error) {
        if(res.statusCode === 404){
            res.json({error: error.message})
        } else {
            res.status(500).json({error: error.message})
        }
        
    }
}

async function showGame(req, res){
    
}

async function update(req, res){
    console.log(req.params.postId)
    
    try {

        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.postId,
            req.body,
            { new: true }
        )
        await updatedPost.populate('owner')

        if(!updatedPost){
            res.status(404);
            throw new Error('Track to update not found')
        }

        res.status(200).json(updatedPost)
        
    } catch (error) {
        if(res.statusCode === 404){
            res.json({error: error.message})
        } else {
            res.status(500).json({error: error.message})
        }
        
    }
}

async function deletePost(req, res){
    console.log(req.params.postId, '<---- postId')

    try {

        const deletedPost = await PostModel.findByIdAndDelete(req.params.postId)

        if(!deletedPost){
            res.status(404);
            throw new Error('Track to delete not found')
        }

        res.status(200).json(deletedPost)
        
    } catch (error) {
        if(res.statusCode === 404){
            res.json({error: error.message})
        } else {
            res.status(500).json({error: error.message})
        }
        
    }
}