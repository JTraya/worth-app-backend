const UserModel = require('../models/user')


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_LENGTH = 10


module.exports = {
	signup, 
	login 
}

async function login(req, res){
	try {
		console.log(req.body)
		// find the user in the database!
		// check their password
		// if we found a user and their passwords match, they are authorized
		const user = await UserModel.findOne({username: req.body.username})
		console.log(user, " <- user")
		if(user && bcrypt.compareSync(req.body.password, user.password)){
			// create our token aand store the users info in it!

			const token = jwt.sign({ user }, process.env.JWT_SECRET)

			res.status(200).json({token })
		} else {
			// 401 - means unauthorized
			res.status(401).json({error: 'invalid credentials'})
		}
		// if not invalid 

	} catch(err){
		res.status(400).json({error: err.message})
	}
}


async function signup(req, res){

	console.log(req.body, " < req.body,")
	try {
		// check if the username already exists?
		const userDoc = await UserModel.findOne({username: req.body.username})
		// if true send back a response
		if(userDoc) {
			return res.status(400).json({error: "Username already taken."})
		}

        const user = await UserModel.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        })
        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ user, token });

	} catch(err){
		console.log(err)
		res.status(400).json({error: err.message})
	}
}