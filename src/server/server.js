const http = require('http');
const socketIo = require('socket.io');
const robot = require('robotjs');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors()); // Allow all origins for simplicity

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {}
});

let teacherSocket = null;  ///eterttret
const students = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinSession', ({ participantId }) => {
    students[participantId] = socket.id;
    console.log(`Student with ID ${participantId} joined`);
  });

  socket.on('giveRemoteAccess', ({ participantId }) => {
    if (students[participantId]) {
      io.to(students[participantId]).emit('remoteAccessGranted');
      console.log(`Remote access granted to student with ID ${participantId}`);
    } else {
      console.log(`Student with ID ${participantId} not found`);
    }
  });

  socket.on('mouseMove', (data) => {
    robot.moveMouse(data.x, data.y);
  });

  socket.on('mouseClick', () => {
    console.log("Rahuljfff");
    robot.mouseClick();
  });

  socket.on('keyTap', (key) => {
    robot.keyTap(key);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    for (const id in students) {
      if (students[id] === socket.id) {
        delete students[id];
        break;
      }
    }
  });
});

server.listen(4000, () => console.log('Server listening on port 4000'));
