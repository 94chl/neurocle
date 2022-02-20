import React from "react";
import classNames from "classnames";
import styles from "./CustomInput.module.scss";

const { container } = styles;

const Input = ({ style, inputOption, inputId, onChange, value, children }) => {
  return (
    <div className={classNames(container)} style={style}>
      <label htmlFor={inputId}>{children}</label>
      <input id={inputId} onChange={onChange} value={value} {...inputOption} />
    </div>
  );
};

export default Input;
