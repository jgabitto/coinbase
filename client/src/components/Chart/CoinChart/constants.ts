export const getLineChartDataUrl = (id: string): string =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;
