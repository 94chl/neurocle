import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

const { button, active, disable } = styles;

const Button = ({ onClick, isActive, isDisable, style, children }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(button, {
        [active]: isActive,
        [disable]: isDisable,
      })}
      disabled={isDisable}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
