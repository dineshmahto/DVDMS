import React from "react";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
export type position = "start" | "end";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      "& .MuiButtonBase-root": {},
      "& .MuiInputBase-input": {
        padding: 6,
      },
    },
  },
});

interface searchProps {
  placeholder?: string | "Search";
  iconName?: any;
  iconPosition: position;
  onChange: () => void;
  fullWidth: boolean | false;
  className?: string;
  input?: boolean | false;
  onClick: () => void;
  disabled: boolean | false;
}
const SearchField: React.FC<searchProps> = ({
  placeholder,
  fullWidth,
  onChange,
  iconPosition,
  className,
  onClick,
  disabled,
}) => {
  const classes = useStyles();
  return (
    <TextField
      placeholder={placeholder}
      disabled={disabled}
      className={`${classes.root} ${className}`}
      fullWidth={fullWidth}
      InputProps={{
        endAdornment: (
          <InputAdornment position={iconPosition}>
            <FontAwesomeIcon icon={faSearch} />
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  );
};

export default React.memo(SearchField);
