import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      "& .MuiButtonBase-root": {},
      "& .MuiInputBase-input": {
        padding: 8,
      },
    },
  },
});
const CustDatepicker = (props) => {
  const classes = useStyles();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className={classes.root}
          {...props}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: "100%" }} />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export default CustDatepicker;
