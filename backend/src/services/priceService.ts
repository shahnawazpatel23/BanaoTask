import axios from 'axios';
import redis from '../config/redis';
import { io } from '../server'
import { checkAlertsRealtime } from '../controllers/alertController';
import { Request, Response } from 'express';

export const fetchCryptoPrices = async () => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: { ids: 'bitcoin,ethereum', vs_currencies: 'usd' },
    });
    io.emit('prices',JSON.stringify(data))

    await redis.set('crypto_prices', JSON.stringify(data), 'EX', 24); // Cache for 24 seconds
    await checkAlertsRealtime(data); 
    console.log('Crypto prices updated in cache:', data);
    
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
  }
};

export const getCachedPrices = async (req: Request, res: Response) => {
  try {
    console.log("reached in get cached");
    
    const prices = await redis.get('crypto_prices');
    if (prices) {
      res.status(200).json(JSON.parse(prices));
    } else {
      res.status(404).json({ message: 'No prices found' });
    }
  } catch (error) {
    console.error('Error retrieving cached prices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

