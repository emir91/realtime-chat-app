REALTIME-CHAT-APP

This is a simple chat application where users can join into chat room and send messages to other users in room.

Purpose of this project is to gain some knowledge with the socket.

Technologies and Dependencies used in this project are:

- Node.js/Express

- React

- HarperDB

- socket.io

- axios

- cors

- dotenv

Project consists of client and server side. Server side is done using Node.js, more precisely Express, and client side is done using React. Socket.io is handling realtime communication.

To run locally you have to:

1. clone the repo (https or ssh)

2. run npm install for both client and server side

3. setup env variables for the HarperDB (You will have to create an account with the HarperDB and create a new HarperDB cloud instance, choose a free tier. After that create a db and table for this application, and in config you will find url and password that you have to setup as an env variables)

4. run scripts:
   - npm run dev (server)
   - npm start (client)
