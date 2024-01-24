// require express to use express
const express = require('express');
const connectDB = require('./config/connect');
const { errorHandler } = require('./middlewares/errorMiddleware');
const { Server } = require('socket.io');
const http = require('http')
// require cors to  handle cross server request
const cors = require('cors')


// initialize the intance of the express to get all the features
const app = express()
// use cors
app.use(cors())
const server = http.createServer(app)


// create the socket server

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['POST', 'GET'],
    }
})

io.on('connection', (socket) => {
    console.log(`user connected on host id:${socket.id.blue}`)
    // join room
    socket.on('join_room', (data) => {
        socket.join(data.chatID);
    })

    socket.on('sent_message', (data) => {
        socket.to(data.chatID).emit('received_message', data.message)
        // console.log(data)
        const roomSize = io.sockets.adapter.rooms.get(data.chatID)?.size || 0;
        console.log(`Users in room ${data.chatID}: ${roomSize}`);
    });
})

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
server.listen(process.env.PORT, () => console.log(`Server started on port:${process.env.PORT.yellow}`))
