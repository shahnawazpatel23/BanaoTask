// server.ts
import { createServer } from 'http';
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import app from './app';
import { checkAlertsRealtime } from './controllers/alertController';
import alertRoutes from './routes/alertRoutes'; 
import { getCachedPrices } from './services/priceService';

const PORT = process.env.PORT || 5000;

// Create HTTP server and integrate with Socket.IO
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});



// Pass io instance to real-time alert checker
// checkAlertsRealtime(io);


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
