const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('chatMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('aiMessage', async (message) => {
        if (message.includes('@Vanea')) {
            try {
                const response = await axios.get(`https://api-wr8p.onrender.com/Vanea?query=${encodeURIComponent(message)}`);
                io.emit('message', `Vanea: ${response.data}`);
            } catch (error) {
                console.error('Error calling AI API:', error);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Route all requests to the main index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
