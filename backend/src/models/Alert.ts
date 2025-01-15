import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  
  crypto: { type: String, required: true },
  condition: { type: String, enum: ['greater_than', 'less_than'], required: true },
  value: { type: Number, required: true },
  notified: { type: Boolean, default: false },
});

const Alert = mongoose.model('Alert', AlertSchema);

export default Alert;