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
  labelText,
}) => {
  return (
    <>
      <div className={`${floatingLabel ? "form-floating" : ""}`}>
        <input
          type={type}
          className={`form-control shadow-none ${className}`}
          id={id}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default BasicInput;
