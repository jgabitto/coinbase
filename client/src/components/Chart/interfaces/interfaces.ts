export interface PriceProps {
  price: number;
  date: Date | string;
}

export interface PriceChartProps {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  data: PriceProps[];
}

export type TooltipData = PriceProps;
