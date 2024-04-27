import React from "react";
import classNames from "classnames";
import styles from "./App.module.scss";
import { Canvas, Tool } from "@/component";

const { container } = styles;

function App() {
  return (
    <div className={classNames(container)}>
      <Canvas></Canvas>
      <Tool></Tool>
    </div>
  );
}

export default App;
