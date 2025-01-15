"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAlerts = exports.createAlert = void 0;
const Alert_1 = __importDefault(require("../models/Alert"));
const priceService_1 = require("../services/priceService");
const createAlert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, crypto, condition, value } = req.body;
        const alert = new Alert_1.default({ userId, crypto, condition, value });
        yield alert.save();
        res.status(201).json({ message: 'Alert created successfully', alert });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating alert', error });
    }
});
exports.createAlert = createAlert;
const checkAlerts = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const alerts = yield Alert_1.default.find({ notified: false });
        const prices = yield (0, priceService_1.getCachedPrices)();
        if (!prices)
            return;
        for (const alert of alerts) {
            const currentPrice = (_a = prices[alert.crypto]) === null || _a === void 0 ? void 0 : _a.usd;
            if ((alert.condition === 'greater_than' && currentPrice > alert.value) ||
                (alert.condition === 'less_than' && currentPrice < alert.value)) {
                console.log(`Alert triggered for user ${alert.userId}`);
                alert.notified = true;
                yield alert.save();
            }
        }
    }
    catch (error) {
        console.error('Error checking alerts:', error);
    }
});
exports.checkAlerts = checkAlerts;
