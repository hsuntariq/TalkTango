// require express to use express
const express = require("express");
const connectDB = require("./config/connect");
const { errorHandler } = require("./middlewares/errorMiddleware");
const { Server } = require("socket.io");
const http = require("http");
// require cors to  handle cross server request
const cors = require("cors");



// initialize the intance of the express to get all the features
const app = express();
// use cors
app.use(cors());
const server = http.createServer(app);


mongoose.connect('mongodb+srv://yousaf:test123@cluster0.g4i5dey.mongodb.net/test?retryWrites=true&w=majority');


app.get('/',(req,res)=>{
  res.send('hello')
})



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

  socket.on("user_connected", (user) => {
    if (!connectedUsers.includes(user.id)) {
      connectedUsers.push(user.id);
    }
    io.emit("user_list", connectedUsers);
  });

  socket.on("dis", (user) => {
    connectedUsers = connectedUsers.filter(
      (connectedUserId) => connectedUserId !== user.id
    );
    io.emit("user_list", connectedUsers);
  });

  socket.on("incoming_call", (data) => {
    socket.broadcast.emit("alert", data);
  });
  socket.on("call_declined", (data) => {
    // console.log(data)
    socket.broadcast.emit("declined", data);
  });

  socket.on("answer", (data) => {
    console.log(data);
    socket.broadcast.emit("answered", data);
  });
  socket.on("request_incoming", (data) => {
    // console.log(data)
    socket.broadcast.emit("new_request", data);
  });
  socket.on("accept", (data) => {
    // console.log(data)
    socket.broadcast.emit("friend_accepted", data);
  });

  // join room
  socket.on("join_room", (data) => {
    const roomSize = io.sockets.adapter.rooms.get(data.chatID)?.size || 0;
    console.log(`User in room ${data.chatID} : ${roomSize} `);
    if (roomSize < 2) {
      socket.join(data.chatID);
    }
  });

  socket.on("sent_message", (data) => {
    console.log(data);
    // Emit "received_message" event to all users in the room
    socket.broadcast.emit("received_message", data);
  });
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
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/friends", require("./routes/friendRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/tiktok", require("./routes/tiktokRoutes"));
app.use("/api/story", require("./routes/storyRoutes"));
app.use("/", require("./routes/paymentRoutes"));
// check for the errors
app.use(errorHandler);

// start the server
server.listen(process.env.PORT, () =>
  console.log(`Server started on port:${process.env.PORT.yellow}`)
);
