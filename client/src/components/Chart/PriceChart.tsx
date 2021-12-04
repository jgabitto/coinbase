import React from "react";
import { PriceChartProps } from "./interfaces";

const PrimaryChart: React.FC<PriceChartProps> = ({
  data,
  width,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}) => {
  const yMax = Math.max(height - margin.top - margin.bottom, 0);
  const xMax = Math.max(width - margin.left - margin.right, 0);

  return (
    <div style={{ position: "relative", margin: "0 0 1rem" }}>
      <svg width={width} height={height}>
        {/* we will include line chart, and tooltip */}
      </svg>
    </div>
  );
};

export default PrimaryChart;
