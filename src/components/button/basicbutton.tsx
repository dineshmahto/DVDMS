import React, { memo } from "react";
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
  console.log("Initial Render", buttonText);
  return (
    <button
      className={`btn btn-${outlineType ? "outline-" : ""}${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      id={id}
    >
      {icon}
      {isLoading ? loadingText : buttonText}
    </button>
  );
};

export default memo(BasicButton);
