import React from "react";
import Select, { components } from "react-select";
const CustomSelect = ({
  options,
  changeOptionsData,
  fetchingData,
  onChange,
  defaultValue,
  id,
}) => {
  return (
    <div>
      <Select
        id={id}
        options={options}
        defaultValue={defaultValue || "Select"}
        fetchingData={fetchingData}
        changeOptionsData={changeOptionsData}
        onChange={onChange}
      />
    </div>
  );
};
export default CustomSelect;
