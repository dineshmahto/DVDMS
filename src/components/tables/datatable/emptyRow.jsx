import React from "react";
import { TableRow, TableCell } from "@mui/material";
const EmptyRow = ({ loading, tableData, searchValue }) => {
  return (
    <>
      {!loading && tableData && tableData?.length === 0 && (
        <TableRow>
          <TableCell className="text-center" colSpan={12}>
            <p style={{ fontSize: "0.8rem" }}>
              {searchValue && searchValue != ""
                ? ` Opps No Search Result Found for ${searchValue}`
                : "NO DATA AVAILABE IN TABLE"}
            </p>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default EmptyRow;
