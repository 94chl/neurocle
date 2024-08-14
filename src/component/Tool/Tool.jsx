/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import classNames from "classnames";
import styles from "./Tool.module.scss";
import { Button, CustomInput } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { canvas } from "../../store/canvas/canvas";
import { useLocalStorage } from "../../hook";
import * as Sentry from "@sentry/react";
import { toolEnum } from "const";

const {
  container,
  drawableButtonBox,
  customInputBox,
  controlButtonBox,
  guideBox,
} = styles;

const TOOL_TYPES = Object.values(toolEnum);

const Tool = () => {
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

  const setDrawableButton = (type) => {
    dispatch(canvas.actions.sedrawableType(type));
  };

  const onChangeColor = (e, target) => {
    dispatch(canvas.actions.setColor({ target, value: e.target.value }));
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
      canvas.actions.setDrawables(
        prevIndex > -1 ? layersHistory[prevIndex] : []
      )
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
      canvas.actions.setDrawables(
        nextIndex > -1 ? layersHistory[nextIndex] : []
      )
    );
  };

  const clearDrawables = () => {
    const newLayersHistory = layersHistory.filter(
      (_, index) => index <= layersNow
    );
    newLayersHistory.push([]);

    dispatch(canvas.actions.setDrawables([]));
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
      dispatch(canvas.actions.setDrawables([]));
      dispatch(canvas.actions.setLayersHitory([]));
      setStoredLayersHistory([]);
      dispatch(canvas.actions.setLayersNow(-1));
      setStoredLayersNow(-1);
    }
  };

  const throwError = () => {
    try {
      throw new Error("Sentry: Button Error");
    } catch (e) {
      console.error(e);
      Sentry.captureException(e);
    }
  };

  return (
    <div className={classNames(container)}>
      <Button onClick={throwError}>에러발생</Button>
      <div className={classNames(drawableButtonBox)}>
        <h3>드로잉 타입</h3>
        <div>
          {TOOL_TYPES.map((tooTypeValue) => (
            <Button
              onClick={() => setDrawableButton(tooTypeValue)}
              isActive={drawableType === tooTypeValue}
              key={`TOOL_TYPE_${tooTypeValue}`}
            >
              {tooTypeValue}
            </Button>
          ))}
        </div>
      </div>
      <div className={classNames(customInputBox)}>
        <h3>드로잉 옵션</h3>
        <div>
          <CustomInput
            inputId="fillColor"
            onChange={(e) => onChangeColor(e, "fillColor")}
            value={fillColor}
            inputOption={{ type: "color" }}
          >
            채우기 색상
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
            onClick={() => drawables.length && clearDrawables()}
            isActive={false}
            isDisable={!drawables.length}
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
