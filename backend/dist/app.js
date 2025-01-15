"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const alertRoutes_1 = __importDefault(require("./routes/alertRoutes"));
const db_1 = __importDefault(require("./config/db"));
const priceService_1 = require("./services/priceService");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', alertRoutes_1.default);
(0, db_1.default)();
setInterval(priceService_1.fetchCryptoPrices, 60000); // Fetch prices every minute
exports.default = app;
