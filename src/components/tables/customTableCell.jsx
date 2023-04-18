import React from "react";
import { styled } from "@mui/material/styles";
import { TableBody, TableRow, TableCell } from "@mui/material";
const CustomizedTableCell = styled(TableCell)`
  color: black;
  padding: 10px !important;

  :hover {
    color: #2e8b57;
  }
`;
const CustomTableCell = () => {
  return <CustomizedTableCell />;
};

export default CustomTableCell;
