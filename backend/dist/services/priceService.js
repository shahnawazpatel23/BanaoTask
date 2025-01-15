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
exports.getCachedPrices = exports.fetchCryptoPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const redis_1 = __importDefault(require("../config/redis"));
const fetchCryptoPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { ids: 'bitcoin,ethereum', vs_currencies: 'usd' },
        });
        yield redis_1.default.set('crypto_prices', JSON.stringify(data), 'EX', 60); // Cache for 60 seconds
        console.log('Crypto prices updated in cache:', data);
    }
    catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
});
exports.fetchCryptoPrices = fetchCryptoPrices;
const getCachedPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    const prices = yield redis_1.default.get('crypto_prices');
    return prices ? JSON.parse(prices) : null;
});
exports.getCachedPrices = getCachedPrices;
