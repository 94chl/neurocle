import React from "react";
import { Ellipse } from "react-konva";

type Props = {
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const EllipseDrawable: React.FC<React.PropsWithChildren<Props>> = ({
  color,
  x,
  y,
  width,
  height,
}) => {
  return (
    <Ellipse
      radiusX={Math.abs(width) / 2}
      radiusY={Math.abs(height) / 2}
      fill={color}
      x={x + Math.abs(width) / 2}
      y={y + Math.abs(height) / 2}
      width={Math.abs(width)}
      height={Math.abs(height)}
      opacity={0.3}
    ></Ellipse>
  );
};

export default EllipseDrawable;
