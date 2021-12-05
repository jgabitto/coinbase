import { Request, Response, Router } from "express";
import axios from "axios";

import { getLineChartDataUrl } from "./utils";
import { GET_PRICES_DATA_URL } from "./constants";

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

// GET get prices data information
router.get("/get-prices-data", async (req: Request, res: Response) => {
  try {
    const response = await axios.get<CryptoInfo[]>(GET_PRICES_DATA_URL);
    res.status(200).send(response.data);
  } catch (e) {
    console.log(e);
  }
});

// POST get line chart information
router.post("/get-line-chart-data", async (req: Request, res: Response) => {
  try {
    const url = getLineChartDataUrl(req.body.data.id);
    const response = await axios.get<CryptoInfo[]>(url);
    res.status(200).send(response.data);
  } catch (e) {
    console.log(e);
  }
});

export { router };
