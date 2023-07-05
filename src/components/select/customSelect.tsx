import React from "react";
import Select, { components } from "react-select";
interface defaultValue {
  value: string;
  label: string;
}
interface selectProps {
  options: [];
  onChange: (val: any) => void;
  defaultValue?: defaultValue;
  id?: string;
  name: string;
  onBlur: (e: any) => void;
}
const CustomSelect: React.FC<selectProps> = ({
  options,

  onChange,
  defaultValue,
  id,
  name,
  onBlur,
}) => {
  return (
    <div>
      <Select
        id={id}
        options={options}
        defaultValue={defaultValue || "Select"}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
      />
    </div>
  );
};
export default CustomSelect;
