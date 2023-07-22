import React from "react";
import Select, { components } from "react-select";
export type menuPosition = "bottom" | "auto" | "top";
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
  disabled: boolean | false;
  menuPlacement?: menuPosition;
}
const customStyles = {
  menu: (provided: any, state: any) => ({
    ...provided,
    zIndex: 10,
  }),
};

const CustomSelect: React.FC<selectProps> = ({
  options,

  onChange,
  defaultValue,
  id,
  name,
  onBlur,
  disabled,
  menuPlacement,
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
        isDisabled={disabled}
        styles={customStyles}
        menuPlacement={menuPlacement}
        menuPortalTarget={document.body}
      />
    </div>
  );
};
export default CustomSelect;
