/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./Canvas.module.scss";
import { Stage, Layer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { canvas } from "../../store/canvas/canvas";
import { useLocalStorage } from "../../hook";
import { toolEnum } from "../../const";
import RectDrawable from "../Drawable/RectDrawable";
import EllipseDrawable from "../Drawable/EllipseDrawable";
import PolygonDrawable from "../Drawable/PolygonDrawable";

const { container, stage } = styles;

const Canvas = () => {
  const [canvasContainer, setCanvasContainer] = useState({
    width: 0,
    height: 0,
  });
  const canvasRef = useRef(null);
  const stageRef = useRef(null);

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
  }, []);

  const dispatch = useDispatch();
  const {
    drawables,
    drawableType,
    fillColor,
    layersHistory,
    layersNow,
    layersHistoryLimit,
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
    if (storedLayersHistory[storedLayersNow] < 0)
      setStoredLayersNow(storedLayersHistory.length - 1);

    if (!layersHistory.length && storedLayersHistory.length) {
      dispatch(canvas.actions.setLayersHitory(storedLayersHistory));
      dispatch(canvas.actions.setLayersNow(storedLayersNow));
      dispatch(
        canvas.actions.setDrawables(
          !storedLayersHistory[storedLayersNow]
            ? []
            : storedLayersHistory[storedLayersNow]
        )
      );
    }
  }, []);

  const [drawablePoints, setDrawablePoints] = useState([]);
  const [drawable, setDrawable] = useState({
    type: drawableType,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    points: [],
    fillColor,
  });

  const isDrawing = useRef(false);

  const initializeDrawable = () => {
    setDrawable({
      type: drawableType,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      points: [],
      fillColor,
    });
    setDrawablePoints([]);
    isDrawing.current = false;
  };

  const drawingDrawable = (e) => {
    if (!isDrawing.current) {
      return;
    }

    const width = drawablePoints[0] - drawablePoints[drawablePoints.length - 2];
    const height =
      drawablePoints[1] - drawablePoints[drawablePoints.length - 1];
    const x =
      width < 0 ? drawablePoints[0] : drawablePoints[drawablePoints.length - 2];
    const y =
      height < 0
        ? drawablePoints[1]
        : drawablePoints[drawablePoints.length - 1];

    const newDrawable = {
      type: drawableType,
      x,
      y,
      width,
      height,
      points: [...drawablePoints],
      fillColor,
    };

    const newDrawablePoints = [
      ...drawablePoints.slice(
        0,
        drawablePoints.length > 2 ? drawablePoints.length - 2 : 2
      ),
      e.pageX,
      e.pageY,
    ];
    setDrawablePoints(newDrawablePoints);
    newDrawable.drawablePoints = newDrawablePoints;

    setDrawable(newDrawable);
  };

  const selectDrawable = () => {
    if (stageRef?.current) {
      const pointerPosition = stageRef.current?.getPointerPosition();
      const element = stageRef.current?.getIntersection(pointerPosition);

      console.log("SELECT", element);
      isDrawing.current = false;
    }
  };

  const finishDrawingDrawable = () => {
    console.log("FINISH");
    if (!isDrawing.current) {
      initializeDrawable();
      return;
    }

    if (drawableType === toolEnum.select) {
      selectDrawable();
      return;
    }

    const newDrawables = [...drawables];
    const newLayersHistory =
      layersNow < layersHistoryLimit - 1
        ? layersHistory.filter((_, index) => index <= layersNow)
        : layersHistory.filter(
            (_, index) =>
              layersHistory.length - layersHistoryLimit + 1 <= index &&
              index < layersHistoryLimit
          );

    const newDrawable = {
      ...drawable,
      points: drawablePoints.slice(0, drawablePoints.length - 2),
    };
    console.log("NEW", newDrawable);
    newDrawables.push(newDrawable);

    dispatch(canvas.actions.setDrawables(newDrawables));

    newLayersHistory.push(newDrawables);
    setStoredLayersHistory(newLayersHistory);
    dispatch(canvas.actions.setLayersHitory(newLayersHistory));

    const nextIndex =
      layersNow + 1 < layersHistoryLimit - 1
        ? layersNow + 1
        : layersHistoryLimit - 1;
    setStoredLayersNow(nextIndex);
    dispatch(canvas.actions.setLayersNow(nextIndex));

    initializeDrawable();
  };

  const startDrawDrawable = (e) => {
    console.log("START DRAW", e);
    if (isDrawing.current === false) {
      isDrawing.current = true;
      drawingDrawable(e);
    } else {
      if (drawableType === toolEnum.polygon) {
        console.log("add polygon point");
      } else {
        initializeDrawable();
      }
    }
  };

  const Drawables = () =>
    drawables.map((drawable, index) => {
      console.log(drawable);
      switch (drawable.type) {
        case toolEnum.ellipse:
          return (
            <EllipseDrawable
              color={drawable.fillColor}
              x={drawable.x}
              y={drawable.y}
              width={drawable.width}
              height={drawable.height}
              key={`${drawable.type}-${index}`}
            ></EllipseDrawable>
          );
        case toolEnum.rect:
          return (
            <RectDrawable
              color={drawable.fillColor}
              x={drawable.x}
              y={drawable.y}
              width={drawable.width}
              height={drawable.height}
              key={`${drawable.type}-${index}`}
            ></RectDrawable>
          );
        case toolEnum.polygon:
          return (
            <PolygonDrawable
              color={drawable.fillColor}
              points={drawable.points}
              closed={true}
              key={`${drawable.type}-${index}`}
            ></PolygonDrawable>
          );
        default:
          return null;
      }
    });

  const DrawingDrawable = () => {
    switch (drawable.type) {
      case toolEnum.ellipse:
        return (
          <EllipseDrawable
            color={drawable.fillColor}
            x={drawable.x}
            y={drawable.y}
            width={drawable.width}
            height={drawable.height}
          ></EllipseDrawable>
        );
      case toolEnum.rect:
        return (
          <RectDrawable
            color={drawable.fillColor}
            x={drawable.x}
            y={drawable.y}
            width={drawable.width}
            height={drawable.height}
          ></RectDrawable>
        );
      case toolEnum.polygon:
        return (
          <PolygonDrawable
            color={drawable.fillColor}
            points={drawable.points}
            closed={true}
          ></PolygonDrawable>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={classNames(container)}
      ref={canvasRef}
      onMouseMove={drawingDrawable}
      onMouseDown={startDrawDrawable}
      onMouseUp={finishDrawingDrawable}
      onKeyDown={(e) => e.key === "Escape" && initializeDrawable()}
      tabIndex="0"
    >
      <Stage
        ref={stageRef}
        className={classNames(stage)}
        width={canvasContainer.width}
        height={canvasContainer.height}
      >
        <Layer>
          <Drawables />

          <DrawingDrawable />
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
