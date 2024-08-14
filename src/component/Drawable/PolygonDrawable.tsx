import React from "react";
import { Line } from "react-konva";

type Props = {
  color: string;
  points: number[];
};

const PolygonDrawable: React.FC<React.PropsWithChildren<Props>> = ({
  color,
  points,
}) => {
  return <Line fill={color} points={points} closed={true} opacity={0.3}></Line>;
};

export default PolygonDrawable;
