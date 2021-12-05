"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLineChartDataUrl = void 0;
const getLineChartDataUrl = (id) => `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;
exports.getLineChartDataUrl = getLineChartDataUrl;
