import express from 'express';
import http from 'http';
import cors from 'cors';
import { config } from 'dotenv';
import { Server } from 'socket.io';

import harperSaveMessages from './services/harper-save-message.js'
import harperGetMessages from './services/harper-get-messages.js'

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
    socket.on('join_room', async (data) => {
        const { username, room } = data; // data sent from client

        socket.join(room) // join the user to a socket room

        // Get last 100 messages sent in the chat room
        const last100Messages = await harperGetMessages(room)

        socket.emit('last_100_messages', last100Messages)

        let __createdtime__ = Date.now();

        // Send message to all users currently in the room, apart from the user that just joined
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

        socket.on('send_message', async (data) => {
            const { message, user, room, __createdtime__ } = data
    
            io.in(room).emit('receive_message', data) // Send to all users in room, including sender
            
            await harperSaveMessages(message, user, room, __createdtime__) // Save message in db
        })
    });
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
})
