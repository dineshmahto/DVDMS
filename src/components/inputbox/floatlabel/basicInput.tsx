import React from "react";
interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string | "";
  floatinglabel?: boolean | false;
  htmlFor: string | "";
  labeltext: string | "";
}

const BasicInput = (props: inputProps) => {
  const { className, floatinglabel, htmlFor, labeltext } = props;
  return (
    <>
      <div className={`${floatinglabel ? "form-floating" : ""}`}>
        <input className={`form-control shadow-none ${className}`} {...props} />
        {floatinglabel === true ? (
          <label htmlFor={htmlFor}>{labeltext}</label>
        ) : null}
      </div>
    </>
  );
};

export default BasicInput;
