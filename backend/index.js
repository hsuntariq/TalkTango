// require express to use express
const express = require("express");
const connectDB = require("./config/connect");
const { errorHandler } = require("./middlewares/errorMiddleware");
const { Server } = require("socket.io");
const http = require("http");
// require cors to  handle cross server request
const cors = require("cors");
const { disconnect } = require("process");

// initialize the intance of the express to get all the features
const app = express();
// use cors
app.use(cors());
const server = http.createServer(app);

// create the socket server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
  },
});



// get the connected users
let connectedUsers = [];


io.on("connection", (socket) => {
  console.log(`user connected on host id:${socket.id.blue}`);
  // populate the connectedUsers with the connected users

  socket.on('user_connected', user => {
    if (!connectedUsers.includes(user.id)) {
      connectedUsers.push(user.id);
    }
    io.emit('user_list', connectedUsers)
    console.log(connectedUsers)
  })

  socket.on('dis', (user) => {
    connectedUsers = connectedUsers.filter((connectedUserId) => connectedUserId !== user.id);
    io.emit('user_list', connectedUsers);
    console.log(connectedUsers);
  });



  // join room
  socket.on("join_room", (data) => {
    const roomSize = io.sockets.adapter.rooms.get(data.chatID)?.size || 0;
    console.log(`User in room ${data.chatID} : ${roomSize} `)
    if (roomSize < 2) {
      socket.join(data.chatID);
    }
  });

  socket.on("sent_message", (data) => {
    console.log(data);

    // Emit "received_message" event to all users in the room
    io.to(data.chatID).emit("received_message", data);
  });



  socket.on("user:call", (data) => {
    console.log(data)
    socket.to(data.chatID).emit("incoming:call", { from: data.from, offer: data.offer });
    // socket.broadcast.emit('incoming:call', { from: data.from, offer: data.offer })
  })

  socket.on("call:accepted", (data) => {
    // console.log(data)
    socket.to(data.chatID).emit("call:accepted", { from: data.from, ans: data.ans })
    // socket.broadcast.emit('call:accepted', { from: data.from, ans: data.ans })
  })


});

// required dotenv to use .env
require("dotenv").config();
// require colors for styling
require("colors");

// connect to the database
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));

// check for the errors
app.use(errorHandler);

// start the server
server.listen(process.env.PORT, () =>
  console.log(`Server started on port:${process.env.PORT.yellow}`)
);
