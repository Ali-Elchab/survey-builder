import React from "react";

const Button = ({ text, handleOnClick, className }) => {
  return (
    <button
      className={`btn btn-primary ${className}`}
      onClick={(e) => {
        e.preventDefault();
        handleOnClick(e);
      }}
    >
      {text}
    </button>
  );
};

export default Button;
