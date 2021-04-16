import React from "react";

function SelectComponent({
  selectLabel,
  changeSelectHandler,
  children,
  error,
  value,
}) {
  return (
    <div>
      <label style={{ color: error ? "red" : "" }}>{selectLabel}</label>
      <select
        className="custom-select"
        id="selectGender"
        value={value}
        onChange={changeSelectHandler}
      >
        {children}
      </select>
    </div>
  );
}

export default SelectComponent;
