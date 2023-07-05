import React from "react";
interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string | "";
  floatingLabel?: boolean | false;
  value?: string | "";
  htmlFor: string | "";
  labelText: string | "";
}

const BasicInput = (props: inputProps) => {
  const { className, floatingLabel, value, type, htmlFor, labelText } = props;
  return (
    <>
      <div className={`${floatingLabel ? "form-floating" : ""}`}>
        <input
          className={`form-control shadow-none ${className}`}
          value={value}
          {...props}
        />
        {floatingLabel ? <label htmlFor={htmlFor}>{labelText}</label> : null}
      </div>
    </>
  );
};

export default BasicInput;
