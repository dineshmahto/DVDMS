import React from "react";
interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string | "";

  floatingLabel?: boolean | false;
}

const BasicInput = (props: inputProps) => {
  const {
    className,

    floatingLabel,
  } = props;
  return (
    <>
      <div className={`${floatingLabel ? "form-floating" : ""}`}>
        <input className={`form-control shadow-none ${className}`} />
      </div>
    </>
  );
};

export default BasicInput;
