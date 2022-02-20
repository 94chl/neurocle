/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Tool.module.scss";
import { Button, CustomInput } from "@/component";
import { useDispatch, useSelector } from "react-redux";
import { canvas } from "@/store/canvas/canvas";
import { useLocalStorage } from "@/hook";

const { container, shapeButtonBox, customInputBox, controlButtonBox } = styles;

const Tool = () => {
  const dispatch = useDispatch();
  const {
    shapes,
    shapeType,
    strokeColor,
    strokeWidth,
    fillColor,
    layersHistory,
    layersNow,
  } = useSelector((store) => store.canvas);
  const [fillColorTransparency, setFillColorTransparency] = useState(true);
  const [tempFillColor, setTempFillColr] = useState(fillColor);

  useEffect(() => {
    if (fillColorTransparency) {
      dispatch(
        canvas.actions.setColor({
          target: "fillColor",
          value: "transparent",
        })
      );
    } else {
      dispatch(
        canvas.actions.setColor({
          target: "fillColor",
          value: tempFillColor,
        })
      );
    }
  }, [fillColorTransparency]);

  const [storedLayersHistory, setStoredLayersHistory] = useLocalStorage(
    "storedLayersHistory",
    []
  );
  const [storedLayersNow, setStoredLayersNow] = useLocalStorage(
    "storedLayersNow",
    []
  );

  const setShapeButton = (type) => {
    dispatch(canvas.actions.seShapeType(type));
  };

  const onChangeColor = (e, target) => {
    setTempFillColr(e.target.value);
    if (!fillColorTransparency) {
      dispatch(canvas.actions.setColor({ target, value: e.target.value }));
    }
  };

  const onChangeFillColorOpacity = (e) => {
    setFillColorTransparency(e.target.checked);
  };

  const onChangeStrokeWidth = (e) => {
    const value = parseInt(e.target.value);
    dispatch(
      canvas.actions.setStrokeWidth(value > 50 ? 50 : value < 5 ? 5 : value)
    );
  };

  const undo = () => {
    const prevIndex =
      layersNow >= 0
        ? layersNow > layersHistory.length - 1
          ? layersHistory.length - 1
          : layersNow - 1
        : -1;

    setStoredLayersNow(prevIndex);
    dispatch(canvas.actions.setLayersNow(prevIndex));
    dispatch(
      canvas.actions.setShapes(prevIndex > -1 ? layersHistory[prevIndex] : [])
    );
  };

  const redo = () => {
    const nextIndex =
      layersNow < layersHistory.length - 1
        ? layersNow + 1
        : layersHistory.length - 1;

    setStoredLayersNow(nextIndex);
    dispatch(canvas.actions.setLayersNow(nextIndex));
    dispatch(
      canvas.actions.setShapes(nextIndex > -1 ? layersHistory[nextIndex] : [])
    );
  };

  const clearShapes = () => {
    const newLayersHistory = layersHistory.filter(
      (_, index) => index <= layersNow
    );
    newLayersHistory.push([]);

    dispatch(canvas.actions.setShapes([]));
    dispatch(canvas.actions.setLayersHitory(newLayersHistory));
    setStoredLayersHistory(newLayersHistory);
    dispatch(canvas.actions.setLayersNow(layersNow + 1));
    setStoredLayersNow(layersNow + 1);
  };

  const resetLayers = () => {
    if (window.confirm("초기화 하시겠습니까?")) {
      dispatch(canvas.actions.setShapes([]));
      dispatch(canvas.actions.setLayersHitory([]));
      setStoredLayersHistory([]);
      dispatch(canvas.actions.setLayersNow(-1));
      setStoredLayersNow(-1);
    }
  };

  return (
    <div className={classNames(container)}>
      <div className={classNames(shapeButtonBox)}>
        <Button
          onClick={() => setShapeButton("line")}
          isActive={shapeType === "line"}
        >
          직선
        </Button>
        <Button
          onClick={() => setShapeButton("spline")}
          isActive={shapeType === "spline"}
        >
          곡선
        </Button>
        <Button
          onClick={() => setShapeButton("ellipse")}
          isActive={shapeType === "ellipse"}
        >
          원
        </Button>
        <Button
          onClick={() => setShapeButton("rect")}
          isActive={shapeType === "rect"}
        >
          직사각형
        </Button>
        <Button
          onClick={() => setShapeButton("polygon")}
          isActive={shapeType === "polygon"}
        >
          다각형
        </Button>
      </div>
      <div className={classNames(customInputBox)}>
        <CustomInput
          inputId="strokeColor"
          onChange={(e) => onChangeColor(e, "strokeColor")}
          value={strokeColor}
          inputOption={{ type: "color" }}
        >
          테두리 색상
        </CustomInput>
      </div>
      <div>
        <CustomInput
          inputId="strokeWidth"
          onChange={(e) => onChangeStrokeWidth(e)}
          value={strokeWidth}
          inputOption={{ type: "number", min: 5, max: 50 }}
        >
          테두리 두께
        </CustomInput>
        <CustomInput
          inputId="fillColor"
          onChange={(e) => onChangeColor(e, "fillColor")}
          value={fillColor === "transparent" ? tempFillColor : fillColor}
          inputOption={{ type: "color" }}
        >
          채우기 색상
        </CustomInput>
        <CustomInput
          inputId="fillColorTransparency"
          onChange={(e) => onChangeFillColorOpacity(e)}
          value={0}
          inputOption={{ type: "checkbox", checked: fillColorTransparency }}
        >
          채우기 없음
        </CustomInput>
      </div>
      <div className={classNames(controlButtonBox)}>
        <Button onClick={undo} isActive={false} isDisable={layersNow < 0}>
          undo
        </Button>
        <Button
          onClick={redo}
          isActive={false}
          isDisable={layersNow >= layersHistory.length - 1}
        >
          redo
        </Button>
        <Button
          onClick={() => shapes.length && clearShapes()}
          isActive={false}
          isDisable={!shapes.length}
        >
          clear
        </Button>
        <Button onClick={resetLayers} isActive={false}>
          reset
        </Button>
      </div>
    </div>
  );
};

export default Tool;
