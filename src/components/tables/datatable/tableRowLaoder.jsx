import React from "react";
import NormalTableRow from "./normalTableRow";
import StyledTableCell from "./customTableCell";
import { Spinner } from "react-bootstrap";
const TableRowLaoder = () => {
  return (
    <>
      <NormalTableRow>
        <StyledTableCell colSpan={12}>
          <Spinner />
        </StyledTableCell>
      </NormalTableRow>
    </>
  );
};

export default TableRowLaoder;
