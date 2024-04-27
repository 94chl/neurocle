/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import classNames from "classnames";
import styles from "./Tool.module.scss";
import { Button, CustomInput } from "@/component";
import { useDispatch, useSelector } from "react-redux";
import { canvas } from "@/store/canvas/canvas";
import { useLocalStorage } from "@/hook";

const {
  container,
  shapeButtonBox,
  customInputBox,
  controlButtonBox,
  guideBox,
} = styles;

const Tool = () => {
  const dispatch = useDispatch();
  const {
    shapes,
    shapeType,
    strokeColor,
    strokeWidth,
    fillColor,
    fillColorTransparency,
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

  const setShapeButton = (type) => {
    dispatch(canvas.actions.seShapeType(type));
  };

  const onChangeColor = (e, target) => {
    dispatch(canvas.actions.setColor({ target, value: e.target.value }));
  };

  const onChangeFillColorOpacity = () => {
    dispatch(canvas.actions.setFillColorTransparency());
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

    const nextIndex =
      layersNow + 1 < layersHistoryLimit - 1
        ? layersNow + 1
        : layersHistoryLimit - 1;
    dispatch(canvas.actions.setLayersNow(nextIndex));
    setStoredLayersNow(nextIndex);
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

  const throwError = () => {
    try {
      throw new Error("Sentry Test Error");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classNames(container)}>
      <Button onClick={throwError}>에러발생</Button>
      <div className={classNames(shapeButtonBox)}>
        <h3>드로잉 타입</h3>
        <div>
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
      </div>
      <div className={classNames(customInputBox)}>
        <h3>드로잉 옵션</h3>
        <div>
          <CustomInput
            inputId="strokeColor"
            onChange={(e) => onChangeColor(e, "strokeColor")}
            value={strokeColor}
            inputOption={{ type: "color" }}
          >
            테두리 색상
          </CustomInput>
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
            value={fillColor}
            inputOption={{ type: "color" }}
          >
            채우기 색상
          </CustomInput>
          <CustomInput
            inputId="fillColorTransparency"
            onChange={onChangeFillColorOpacity}
            value={0}
            inputOption={{ type: "checkbox", checked: fillColorTransparency }}
          >
            채우기 없음
          </CustomInput>
        </div>
      </div>
      <div className={classNames(controlButtonBox)}>
        <h3>편집</h3>
        <div>
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
      <div className={classNames(guideBox)}>
        <h3>사용 정보</h3>
        <ul>
          <li>
            <span>esc:</span>
            <span>진행 중인 작업 취소</span>
          </li>
          <li>
            <span>더블클릭:</span>
            <span>진행 중인 작업(곡선, 다각형)을 해당 위치에서 완료</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tool;
