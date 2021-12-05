import { ChartColors } from "../styles";

export const AXIS_COLOR = ChartColors.primary;

export const AXIS_LEFT_LABEL_PROPS = {
  fill: AXIS_COLOR,
  fontFamily: '"Inter", sans-serif',
  fontSize: 10,
  dx: "-0.25em",
  dy: "0.25em",
  textAnchor: "end" as const,
};

export const AXIS_BOTTOM_LABEL_PROPS = {
  fill: AXIS_COLOR,
  fontFamily: '"Inter", sans-serif',
  fontSize: 10,
  textAnchor: "middle" as const,
};
