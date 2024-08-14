import React from "react";
import { Rect } from "react-konva";

type Props = {
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const RectDrawable: React.FC<React.PropsWithChildren<Props>> = ({
  color,
  x,
  y,
  width,
  height,
}) => {
  return (
    <Rect
      fill={color}
      x={x}
      y={y}
      width={Math.abs(width)}
      height={Math.abs(height)}
      opacity={0.3}
    ></Rect>
  );
};

export default RectDrawable;
