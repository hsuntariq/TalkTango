// require express to use express
const express = require('express');
const connectDB = require('./config/connect');
const { errorHandler } = require('./middlewares/errorMiddleware');
// require cors to  handle cross server request
const cors = require('cors')


// initialize the intance of the express to get all the features
const app = express()
// use cors
app.use(cors())

// required dotenv to use .env
require('dotenv').config();
// require colors for styling
require('colors');

// connect to the database
connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/chats', require('./routes/chatRoutes'))

// check for the errors
app.use(errorHandler)

// start the server
app.listen(process.env.PORT, () => console.log(`Server started on port:${process.env.PORT.yellow}`))
