import React from "react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LinePath } from "@visx/shape";
import { AxisScale } from "@visx/axis";
import { Group } from "@visx/group";

import { PriceProps } from "../interfaces";
import {
  AXIS_COLOR,
  AXIS_BOTTOM_LABEL_PROPS,
  AXIS_LEFT_LABEL_PROPS,
} from "./constants";

export interface LineChartProps {
  hideBottomAxis?: boolean;
  stroke: string;
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  width: number;
  yMax: number;
  top?: number;
  left?: number;
  hideLeftAxis?: boolean;
  children?: React.ReactNode;
  tickFormat?: (d: any) => any;
  data: PriceProps[];
  margin: { top: number; right: number; bottom: number; left: number };
}

const LineChart: React.FC<LineChartProps> = ({
  stroke,
  top,
  left,
  width,
  yMax,
  tickFormat,
  margin,
  xScale,
  yScale,
  children,
  hideBottomAxis = false,
  hideLeftAxis = false,
  data,
}) => {
  const getPriceValue = (d: PriceProps) => d?.price;
  const getDate = (d: PriceProps) => new Date(d?.date);

  return data && width > 10 ? (
    <Group left={left || margin.left} top={top || margin.top}>
      <LinePath<PriceProps>
        data={data}
        x={(d) => xScale(getDate(d)) || 0}
        y={(d) => yScale(getPriceValue(d)) || 0}
        strokeWidth={1.5}
        stroke={stroke}
      />
      {!hideBottomAxis && (
        <AxisBottom
          tickLabelProps={() => AXIS_BOTTOM_LABEL_PROPS}
          numTicks={width > 520 ? 10 : 5}
          top={yMax + margin.top}
          stroke={AXIS_COLOR}
          scale={xScale}
          tickStroke={AXIS_COLOR}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          stroke={AXIS_COLOR}
          tickLabelProps={() => AXIS_LEFT_LABEL_PROPS}
          scale={yScale}
          tickStroke={AXIS_COLOR}
          tickFormat={(d) => {
            return tickFormat ? tickFormat(d) : d;
          }}
          numTicks={5}
        />
      )}
      {children}
    </Group>
  ) : null;
};

export default LineChart;
