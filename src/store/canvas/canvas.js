import { createSlice } from "@reduxjs/toolkit";
import { shapeEnum } from "@/const";

export const canvas = createSlice({
  name: "canvas",
  initialState: {
    shapeType: shapeEnum.rect,
    fillColor: "#000000",
    shapes: [],
    layersHistory: [],
    layersNow: -1,
    layersHistoryLimit: 40,
  },
  reducers: {
    seShapeType: (state, { payload }) => {
      state.shapeType = payload;
    },
    setColor: (state, { payload }) => {
      state[payload.target] = payload.value;
    },
    setShapes: (state, { payload }) => {
      state.shapes = payload;
    },
    setLayersHitory: (state, { payload }) => {
      state.layersHistory = payload;
    },
    setLayersNow: (state, { payload }) => {
      state.layersNow = payload;
    },
  },
});
