const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const startIssTracker = require('./ws/issTracker');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Start ISS tracking broadcast
startIssTracker(io);

// basic route
app.get('/', (req, res) => {
  res.send('Astral Oddities backend running');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
