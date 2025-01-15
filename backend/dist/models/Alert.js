"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AlertSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    crypto: { type: String, required: true },
    condition: { type: String, enum: ['greater_than', 'less_than'], required: true },
    value: { type: Number, required: true },
    notified: { type: Boolean, default: false },
});
const Alert = mongoose_1.default.model('Alert', AlertSchema);
exports.default = Alert;
