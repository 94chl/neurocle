import { configureStore } from "@reduxjs/toolkit";
import { canvas } from "./canvas/canvas";

export const store = configureStore({
  reducer: {
    canvas: canvas.reducer,
  },
});
