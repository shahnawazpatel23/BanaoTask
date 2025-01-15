import { Server } from 'socket.io';
import { Request, Response } from 'express';
import Alert from '../models/Alert';
import { getCachedPrices } from '../services/priceService';
import { io } from '../server';
import { sendEmail } from '../utils/mailer';

export const createAlert = async (req: Request, res: Response) => {
  try {
    const { crypto, condition, value } = req.body;
    const alert = new Alert({ crypto, condition, value });
    await alert.save();
    res.status(201).json({ message: 'Alert created successfully', alert });
  } catch (error) {
    res.status(500).json({ message: 'Error creating alert', error });
  }
};

const userEmail = '0201it211085@gmail.com' // using my own secondary gmail account
export const checkAlertsRealtime = async (prices: Record<string, { usd: number }>) => {
  try {
    const alerts = await Alert.find({ notified: false });

    for (const alert of alerts) {
      const currentPrice = prices[alert.crypto]?.usd;

      if (
        (alert.condition === 'greater_than' && currentPrice > alert.value) ||
        (alert.condition === 'less_than' && currentPrice < alert.value)
      ) {
        const message = `Alert triggered: ${alert.crypto.toUpperCase()} is now ${
          currentPrice
        } USD`;

        
        io.emit('alertTriggered', {
          
          message: `Alert triggered for ${alert.crypto}. Current price: $${currentPrice}`,
          alert,
        });

        await sendEmail(
          userEmail, 
          "Crypto Alert Triggered",
          message
        );

        // Mark alert as notified
        alert.notified = true;
        await alert.save();
      }
    }
  } catch (error) {
    console.error('Error processing alerts:', error);
  }
};
