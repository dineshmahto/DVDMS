import React from "react";
import { TableRow, TableCell, TableBody } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
//import { Spinner } from "react-bootstrap";
interface commonTableBodyProps {
  data: [];
  columns: [];
  emptyRows?: number;
  handleClick: (event: any, row: any) => void;
  checkBoxRequired?: boolean | false;
  isSelected: (name: string) => boolean | false;
  loading?: boolean | true;
}
const CommonTableBody: React.FC<commonTableBodyProps> = ({
  data,
  columns,
  emptyRows,
  handleClick,
  checkBoxRequired,
  isSelected,
  loading,
}) => {
  return (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell className="text-center" colSpan={12}>
            {/* <Spinner /> */}
          </TableCell>
        </TableRow>
      ) : (
        data &&
        data.length > 0 &&
        data.map((row: any, index: any) => {
          let isItemSelected;
          let labelId;
          if (checkBoxRequired) {
            isItemSelected = isSelected(row.id);
            labelId = `enhanced-table-checkbox-${index}`;
          }

          return (
            <TableRow
              hover
              key={`${row.id}-${index}`}
              onClick={(event: any) => handleClick(event, row)}
              aria-checked={checkBoxRequired ? isItemSelected : undefined}
              tabIndex={-1}
              selected={checkBoxRequired ?? isItemSelected}
            >
              {checkBoxRequired && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </TableCell>
              )}

              {columns.map((d: any, k: any) => {
                {
                  return (
                    <TableCell
                      padding="none"
                      style={{ padding: "10px", fontSize: "0.8rem" }}
                      key={k}
                    >
                      {row[d.id]}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          );
        })
      )}
      {!loading && data && data.length == 0 && (
        <TableRow>
          <TableCell className="text-center" colSpan={12}>
            <p style={{ fontSize: "0.8rem" }}>NO DATA AVAILABE IN TABLE</p>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default CommonTableBody;
