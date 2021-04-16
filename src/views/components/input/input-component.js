import React from "react";

import "./input-component.css";

function InputComponent({
  inputLabel,
  error,
  errorText,
  inputType,
  inputPlaceholder,
  changeHandler,
  value,
}) {
  return (
    <div className="input-field">
      <div className="form-group">
        <label htmlFor="inputField" style={{ color: error ? "red" : "" }}>
          {inputLabel}
        </label>
        <input
          value={value}
          type={inputType}
          className="form-control"
          placeholder={inputPlaceholder}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
}

export default InputComponent;
