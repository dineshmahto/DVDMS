import React, { memo } from "react";
import { Spinner } from "react-bootstrap";
interface buttonProps {
  id?: string;
  className?: string | "";
  buttonText: string;
  isLoading?: boolean | false;
  loadingText?: any;
  disabled?: boolean | false;
  onClick?: () => void;
  type: any | "submit";
  outlineType?: boolean | false;
  icon?: any;
}

const BasicButton: React.FC<buttonProps> = ({
  id,
  className,
  type,
  isLoading,
  buttonText,
  loadingText,
  disabled,
  onClick,
  outlineType,
  icon,
}) => {
  console.log("isLoading", isLoading);
  return (
    <button
      className={`btn btn-${outlineType ? "outline-" : ""}${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      id={id}
    >
      {isLoading ? null : icon}
      {isLoading ? <Spinner /> : buttonText}
    </button>
  );
};

export default memo(BasicButton);
