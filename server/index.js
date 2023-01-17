import express from 'express';
import http from 'http';
import cors from 'cors';
import { config } from 'dotenv';
import { Server } from 'socket.io';

// Load env variables
config()

const app = express();

app.use(cors());

const server = http.createServer(app);

// Creates an io server and allow for CORS from 
// http://localhost:3000 with GET and POST methods
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
})

const CHAT_BOT = 'ChatBot';
let chatRoom = '';
let allUsers = [];

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // Add a user to a room
    socket.on('join_room', (data) => {
        const { username, room } = data; // data sent from client

        socket.join(room) // join the user to a socket room

        let __createdtime__ = Date.now();

        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__
        });

        // Send welcome message to user that just joined chat
        socket.emit('receive_message', {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            __createdtime__
        });

        // Save the new user to the room
        chatRoom = room;
        allUsers.push({id: socket.id, username, room});
        const chatRoomUsers = allUsers.filter(user => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
    });
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
})