/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./Canvas.module.scss";
import { Stage, Layer, Rect, Ellipse, Line } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { canvas } from "@/store/canvas/canvas";
import { useLocalStorage } from "@/hook";

const { container, stage } = styles;

const layersHistoryLimit = 3;

const Canvas = () => {
  const [canvasContainer, setCanvasContainer] = useState({
    width: 0,
    height: 0,
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasContainer({
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight,
      });
    }

    const canvasResize = () => {
      setCanvasContainer({
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight,
      });
    };

    window.addEventListener("resize", canvasResize);
    return () => window.removeEventListener("resize", canvasResize);
  }, [canvasRef]);

  const dispatch = useDispatch();
  const {
    shapeType,
    strokeColor,
    strokeWidth,
    fillColor,
    shapes,
    layersHistory,
    layersNow,
  } = useSelector((store) => store.canvas);

  const [storedLayersHistory, setStoredLayersHistory] = useLocalStorage(
    "storedLayersHistory",
    []
  );
  const [storedLayersNow, setStoredLayersNow] = useLocalStorage(
    "storedLayersNow",
    -1
  );

  useEffect(() => {
    if (!storedLayersHistory[storedLayersNow])
      setStoredLayersNow(storedLayersHistory.length - 1);
    if (!layersHistory.length && storedLayersHistory.length > 0) {
      dispatch(canvas.actions.setLayersHitory(storedLayersHistory));
      dispatch(canvas.actions.setLayersNow(storedLayersNow));
      dispatch(
        canvas.actions.setShapes(
          storedLayersNow < 0 ? [] : storedLayersHistory[storedLayersNow]
        )
      );
    }
  }, []);

  const [shapePoints, setShapePoints] = useState([]);
  const [shape, setShape] = useState({
    type: shapeType,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    points: [],
    strokeColor,
    strokeWidth,
    fillColor,
  });

  const [isDrawing, setIsDrawing] = useState(false);
  const [isStitching, setIsStitching] = useState(false);

  useEffect(() => {
    ["spline", "polygon"].includes(shapeType)
      ? setIsStitching(true)
      : setIsStitching(false);
  }, [shapeType]);

  const onSetStartPoint = (e) => {
    setShapePoints([...shapePoints, e.pageX, e.pageY]);
    setIsDrawing(true);
  };

  const onAdjustShape = (e) => {
    setShapePoints([
      ...shapePoints.slice(
        0,
        shapePoints.length > 2 ? shapePoints.length - 2 : 2
      ),
      e.pageX,
      e.pageY,
    ]);

    const width = shapePoints[0] - shapePoints[shapePoints.length - 2];
    const height = shapePoints[1] - shapePoints[shapePoints.length - 1];
    const x = width < 0 ? shapePoints[0] : shapePoints[shapePoints.length - 2];
    const y = height < 0 ? shapePoints[1] : shapePoints[shapePoints.length - 1];

    const newShape = {
      type: shapeType,
      x: shapeType === "ellipse" ? x + Math.abs(width) / 2 : x,
      y: shapeType === "ellipse" ? y + Math.abs(height) / 2 : y,
      width: Math.abs(width),
      height: Math.abs(height),
      points: [...shapePoints],
      strokeColor,
      strokeWidth,
      fillColor,
    };

    setShape(newShape);
  };

  const initializeShape = () => {
    setShape({
      type: shapeType,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      points: [],
      strokeColor,
      strokeWidth,
      fillColor,
    });
    setShapePoints([]);
    setIsDrawing(false);
  };

  const finishAdjustShape = (isReset) => {
    if (isReset && !isStitching) {
      initializeShape();
      return;
    }

    const newShapes = [...shapes];

    const newLayersHistory =
      layersNow <= layersHistoryLimit
        ? layersHistory.filter((_, index) => index <= layersNow)
        : layersHistory.filter(
            (_, index) => index > 0 && index < layersHistoryLimit
          );

    if (isReset && isStitching) {
      const newShape = {
        ...shape,
        points: shapePoints.slice(0, shapePoints.length - 2),
      };
      newShapes.push(newShape);
    } else {
      newShapes.push(shape);
    }

    dispatch(canvas.actions.setShapes(newShapes));

    newLayersHistory.push(newShapes);
    setStoredLayersHistory(newLayersHistory);
    dispatch(canvas.actions.setLayersHitory(newLayersHistory));

    setStoredLayersNow(layersNow + 1);
    dispatch(canvas.actions.setLayersNow(layersNow + 1));

    initializeShape();
  };

  return (
    <div
      className={classNames(container)}
      ref={canvasRef}
      onMouseDown={(e) => !isStitching && onSetStartPoint(e)}
      onMouseUp={() => !isStitching && finishAdjustShape(false)}
      onClick={(e) => isStitching && onSetStartPoint(e)}
      onMouseMove={(e) => isDrawing && onAdjustShape(e)}
      onDoubleClick={() => isStitching && finishAdjustShape(false)}
      onKeyDown={(e) => e.key === "Escape" && finishAdjustShape(true)}
      tabIndex="0"
    >
      <Stage
        className={classNames(stage)}
        width={canvasContainer.width}
        height={canvasContainer.height}
      >
        <Layer>
          {shapes.map((shape, index) => {
            if (shape?.type === "line") {
              return (
                <Line
                  stroke={shape.strokeColor}
                  strokeWidth={shape.strokeWidth}
                  points={shape.points}
                  key={`${shape.type}-${index}`}
                ></Line>
              );
            }
            if (shape?.type === "spline") {
              return (
                <Line
                  stroke={shape.strokeColor}
                  strokeWidth={shape.strokeWidth}
                  points={shape.points}
                  tension={0.5}
                  key={`${shape.type}-${index}`}
                ></Line>
              );
            }
            if (shape?.type === "ellipse") {
              return (
                <Ellipse
                  fill={shape.fillColor}
                  stroke={shape.strokeColor}
                  strokeWidth={shape.strokeWidth}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  key={`${shape.type}-${index}`}
                ></Ellipse>
              );
            }
            if (shape?.type === "rect") {
              return (
                <Rect
                  fill={shape.fillColor}
                  stroke={shape.strokeColor}
                  strokeWidth={shape.strokeWidth}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  key={`${shape.type}-${index}`}
                ></Rect>
              );
            }
            if (shape?.type === "polygon") {
              return (
                <Line
                  fill={shape.fillColor}
                  stroke={shape.strokeColor}
                  strokeWidth={shape.strokeWidth}
                  points={shape.points}
                  closed={true}
                  key={`${shape.type}-${index}`}
                ></Line>
              );
            }
          })}
          {shapeType === "line" && (
            <Line
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              points={shape.points}
            ></Line>
          )}
          {shapeType === "spline" && (
            <Line
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              points={shapePoints}
              tension={0.5}
            ></Line>
          )}
          {shapeType === "ellipse" && (
            <Ellipse
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
            ></Ellipse>
          )}
          {shapeType === "rect" && (
            <Rect
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill={fillColor}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
            ></Rect>
          )}
          {shapeType === "polygon" && (
            <Line
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              points={shapePoints}
              closed={true}
            ></Line>
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
