import React from "react";
import Select, { components } from "react-select";
const Option = (props) => {
  return (
    <>
      <components.Option {...props}>{props.children}</components.Option>
    </>
  );
};

const CustomSelect = ({
  options,
  changeOptionsData,
  fetchingData,
  onChange,
  defaultValue,
}) => {
  return (
    <div>
      <Select
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
