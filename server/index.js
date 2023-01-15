import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

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

// Listen for when the client connects via socket.io-client

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
})

server.listen(4000, () => {
    console.log('Server is running on port 4000');
})