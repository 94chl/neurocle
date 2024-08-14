import { createSlice } from "@reduxjs/toolkit";
import { toolEnum } from "../../const";

export const canvas = createSlice({
  name: "canvas",
  initialState: {
    drawableType: toolEnum.rect,
    fillColor: "#000000",
    drawables: [],
    layersHistory: [],
    layersNow: -1,
    layersHistoryLimit: 40,
  },
  reducers: {
    sedrawableType: (state, { payload }) => {
      state.drawableType = payload;
    },
    setColor: (state, { payload }) => {
      state[payload.target] = payload.value;
    },
    setDrawables: (state, { payload }) => {
      state.drawables = payload;
    },
    setLayersHitory: (state, { payload }) => {
      state.layersHistory = payload;
    },
    setLayersNow: (state, { payload }) => {
      state.layersNow = payload;
    },
  },
});
