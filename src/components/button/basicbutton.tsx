import React, { memo } from "react";
interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string | "";
  buttonText: string;
  isLoading?: boolean | false;
  loadingText?: any;
  onClick?: () => void;
  outlineType?: boolean | false;
  icon?: any;
}

const BasicButton = (props: buttonProps) => {
  const {
    className,
    isLoading,
    buttonText,
    loadingText,
    onClick,
    outlineType,
    icon,
  } = props;
  return (
    <button
      className={`btn btn-${outlineType ? "outline-" : ""}${className}`}
      onClick={onClick}
      {...props}
    >
      {icon}
      {isLoading ? loadingText : buttonText}
    </button>
  );
};

export default memo(BasicButton);
