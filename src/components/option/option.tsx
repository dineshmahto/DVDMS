import React from "react";
interface optionProps {
  onChange?: () => void;
  data: [];
  label?: string;
  className?: string | "";
  id?: string;
  disabled?: boolean | false;
}
const SelectOption: React.FC<optionProps> = ({
  onChange,
  data,
  label,
  className,
  id,
  disabled,
}) => {
  return (
    <select
      className={`form-select shadow-none ${
        className != "undefined" ? className : ""
      }`}
      aria-label={label}
      onChange={onChange}
      id={id}
      disabled={disabled}
    >
      <option value="None" defaultValue="None">
        Open this select
      </option>
      {data?.map((item: any, key: any) => (
        <option key={`${item.value}-${key}`} value={item.value} selected={item}>
          {item.value}
        </option>
      ))}
    </select>
  );
};
export default React.memo(SelectOption);
