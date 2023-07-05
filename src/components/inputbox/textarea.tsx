import React from "react";
interface textAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string | "";
  floatingLabel?: boolean | false;
  value?: string | "";
}

const BasicTextAreaField = (props: textAreaProps) => {
  const { className, floatingLabel, value } = props;
  return (
    <>
      <div className={`${floatingLabel ? "form-floating" : ""}`}>
        <textarea
          className={`form-control shadow-none ${className}`}
          value={value}
          {...props}
        />
      </div>
    </>
  );
};

export default BasicTextAreaField;
