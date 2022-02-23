import { createSlice } from "@reduxjs/toolkit";

export const canvas = createSlice({
  name: "canvas",
  initialState: {
    shapeType: "rect",
    strokeColor: "#000000",
    strokeWidth: 5,
    fillColor: "#000000",
    fillColorTransparency: true,
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
    setFillColorTransparency: (state) => {
      state.fillColorTransparency = !state.fillColorTransparency;
    },
    setStrokeWidth: (state, { payload }) => {
      state.strokeWidth = payload;
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
