const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const verifyToken = require('./middleware/verify-token')


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const userRouter = require('./routes/users')
const profileRouter = require('./routes/profiles')
const postRouter = require('./routes/posts');
const { Token } = require('aws-sdk');

// anything with app.use is middlware
app.use(cors({ origin: 'http://localhost:5173'}))
app.use(express.json());

// Routes go here
app.use('/users', userRouter)
app.use(verifyToken)
app.use('/profiles', profileRouter)
app.use('/posts', postRouter)

app.listen(3000, () => {
  console.log('The express app is ready!');
});