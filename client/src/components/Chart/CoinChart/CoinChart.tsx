import React, { useState, useEffect } from "react";
import axios from "axios";
import { scaleLinear, scaleTime } from "@visx/scale";
import { connect } from "react-redux";
import { max, min, extent } from "d3-array";

import { StoreState } from "../../../state/reducers";
import { LineChartData } from "../../../state/actions";
import { fetchLineChartData } from "../../../state/action-creators";
import LineChart from "../LineChart/LineChart";
import { PriceProps } from "../interfaces";
import { getLineChartDataUrl } from "./constants";

export interface CoinChartProps {
  color: string;
  height: number;
  width: number;
  fetchLineChartData: Function;
  lineChartData: LineChartData;
  id: string;
}

const CoinChart: React.FC<CoinChartProps> = ({
  color,
  height,
  width,
  lineChartData,
  fetchLineChartData,
  id,
}) => {
  const [data, setData] = useState<LineChartData>({ prices: [[]] });

  useEffect(() => {
    const getChartInfo = async () => {
      if (id) {
        const url = getLineChartDataUrl(id);
        const response = await axios.get<LineChartData>(url);
        setData(response.data);
      }
    };
    getChartInfo();
  }, [id]);

  const mappedData: any = React.useMemo(() => {
    return data?.prices.length
      ? data.prices.map((ele: any) => ({
          date: new Date(ele[0]),
          price: ele[1],
        }))
      : [];
  }, [data]);

  const getDate = (d: PriceProps) => new Date(d.date);
  const getStockValue = (d: PriceProps) => d.price;

  const dateScale = React.useMemo(() => {
    return scaleTime({
      range: [0, width],
      domain: extent(mappedData, getDate) as [Date, Date],
    });
  }, [mappedData, width]);

  const priceScale = React.useMemo(() => {
    return scaleLinear({
      range: [height, 0],
      domain: [
        min(mappedData, getStockValue) || 0,
        max(mappedData, getStockValue) || 0,
      ],
      nice: true,
    });
  }, [height, mappedData]);

  return (
    <div style={{ position: "relative" }}>
      <svg height={height} width={width}>
        <LineChart
          hideBottomAxis
          hideLeftAxis
          data={mappedData}
          width={width}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          yMax={height}
          xScale={dateScale}
          yScale={priceScale}
          stroke={color}
        />
      </svg>
    </div>
  );
};

const mapStateToProps = ({
  lineChartData,
}: StoreState): { lineChartData: LineChartData } => {
  return { lineChartData };
};

export default connect(mapStateToProps, {
  fetchLineChartData,
})(CoinChart);
