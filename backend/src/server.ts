// server.ts
import { createServer } from 'http';
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import app from './app';


const PORT = process.env.PORT || 5000;

// Create HTTP server and integrate with Socket.IO
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*', //allowing request from all origins though our frontend is on 5173 port
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});



server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
