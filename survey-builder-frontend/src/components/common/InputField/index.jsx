import React from "react";
import "./style.css";

const InputField = ({ value, handleChange, type, text, name, placeholder }) => {
  return (
    <div>
      <label htmlFor={text} className="form-label">
        {text}
      </label>
      <input
        type={type}
        name={name}
        id={text}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
