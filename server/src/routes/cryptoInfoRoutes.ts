import { Request, Response, Router } from "express";
import axios from "axios";

const router = Router();

export interface CryptoInfo {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  platform: object | null;
  quote: {
    [currency: string]: object;
  };
}

// GET get crypto information
router.get("/prices", async (req: Request, res: Response) => {
  try {
    const response = await axios.get<CryptoInfo[]>(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y"
    );
    res.status(200).send(response.data);
  } catch (e) {
    console.log(e);
  }
});

export { router };
