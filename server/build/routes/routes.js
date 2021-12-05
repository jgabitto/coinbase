"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLineChartDataUrl = exports.GET_PRICES_DATA_URL = void 0;
exports.GET_PRICES_DATA_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y";
const getLineChartDataUrl = (id) => `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;
exports.getLineChartDataUrl = getLineChartDataUrl;
