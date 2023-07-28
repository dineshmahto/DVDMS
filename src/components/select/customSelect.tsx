import React from "react";
import Select from "react-select";
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
  value?: string;
  menuPortal?: boolean | false;
}
const customStyles = {
  menu: (provided: any, state: any) => ({
    ...provided,
    zIndex: 10000,
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
  value,
  menuPortal,
}) => {
  return (
    <div>
      <Select
        id={id}
        options={options}
        defaultValue={defaultValue || "Select"}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        isDisabled={disabled}
        styles={customStyles}
        menuPlacement={menuPlacement}
        menuPortalTarget={menuPortal ? document.body : null}
      />
    </div>
  );
};
export default CustomSelect;
