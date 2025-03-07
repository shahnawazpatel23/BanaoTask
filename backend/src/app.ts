import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import alertRoutes from './routes/alertRoutes';
import connectDB from './config/db';
import { fetchCryptoPrices, getCachedPrices } from './services/priceService';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', alertRoutes);

app.get('/', getCachedPrices);
connectDB();

setInterval(fetchCryptoPrices, 20000); //fetchcrypto func will get invoked each 20 seconds

export default app;