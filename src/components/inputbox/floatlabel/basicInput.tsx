import React from "react";
interface inputProps {
  id?: string;
  className?: string | "";
  placeholder: string;
  disabled?: boolean | false;
  onChange?: () => void;
  type: any | "text";
  floatingLabel?: boolean | false;
  labelText?: string;
}

const BasicInput: React.FC<inputProps> = ({
  id,
  type,
  className,
  placeholder,
  onChange,
  disabled,
  floatingLabel,
}) => {
  return (
    <>
      <div className={`${floatingLabel ? "form-floating" : ""}`}>
        <input
          type={type}
          className={`form-control ${className}`}
          id={id}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
        />
        {floatingLabel && <label htmlFor={id}>{floatingLabel}</label>}
      </div>
    </>
  );
};

export default BasicInput;
