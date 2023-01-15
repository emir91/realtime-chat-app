import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();

app.use(cors());

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello world')
})

server.listen(4000, () => {
    console.log('Server is running on port 4000');
})