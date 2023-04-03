import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import TablePagination from "@mui/material/TablePagination";
// import Pagination from "@mui/material/Pagination";
import { Pagination } from "antd";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& p": {
      margin: "0px !important",
    },
  },
});
interface tableProps {
  caption?: string;
  columns: [];
  handleSorting: (accessor: string) => void;
  sortField: string;
  order: string;
  children: any;
  onPageChange: () => void;
  page: number;
  count: number;
  rowsPerPage: number;
  onRowsPerPageChange: () => void;
  paginationRequired?: boolean | true;
  customWidth?: string | "100%";
  checkBoxRequired?: boolean | false;
  multipleSelect?: boolean | false;
  tableTitle?: string | "";
  onSelectAllClick?: () => void;
  numSelected: number;
  rowCount: number;
  actionIcon?: any;
  handleActionClick?: () => void;
  actionToolTip?: string;
  overFlow: boolean | false;
  colouredHeader?: boolean | false;
  showTableActionBar: boolean | false;
  toolbarRequired?: boolean | false;
  stickyHeader?: boolean | false;
}

const TableComponent: React.FC<tableProps> = ({
  caption,
  columns,
  sortField,
  handleSorting,
  order,
  children,
  onPageChange,
  page,
  count,
  rowsPerPage,
  onRowsPerPageChange,
  paginationRequired,
  customWidth,
  checkBoxRequired,
  tableTitle,
  onSelectAllClick,
  numSelected,
  rowCount,
  actionIcon,
  handleActionClick,
  actionToolTip,
  overFlow,
  colouredHeader,
  showTableActionBar,
  multipleSelect,
  toolbarRequired,
  stickyHeader,
}) => {
  const classes = useStyles();
  console.log("width", customWidth);
  console.log("overflow", overFlow);
  return (
    <Paper
      sx={
        overFlow
          ? {
              width: "100%",
              overflowX: "auto",
            }
          : {
              width: "100%",
              overflowX: "hidden",
            }
      }
    >
      {toolbarRequired && (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          {numSelected > 0 && showTableActionBar ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {tableTitle}
            </Typography>
          )}

          {numSelected > 0 && showTableActionBar ? (
            <Tooltip title={actionToolTip}>
              <FontAwesomeIcon
                icon={actionIcon}
                size="2x"
                onClick={handleActionClick}
              />
            </Tooltip>
          ) : (
            ""
          )}
        </Toolbar>
      )}

      <TableContainer
        sx={{ width: customWidth, maxHeight: overFlow ? 500 : "" }}
      >
        <Table stickyHeader={stickyHeader} aria-label="sticky table">
          <caption>{caption}</caption>
          <TableHead>
            <TableRow hover>
              {checkBoxRequired && multipleSelect && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{
                      "aria-label": `select all ${tableTitle}`,
                    }}
                  />
                </TableCell>
              )}
              {checkBoxRequired && !multipleSelect && (
                <TableCell padding="checkbox"></TableCell>
              )}

              {columns &&
                columns.length > 0 &&
                columns.map(({ name, id, sortable }) => {
                  const sortableIcon = sortable
                    ? sortField === id && order === "asc"
                      ? faArrowUpWideShort
                      : sortField === id && order === "desc"
                      ? faArrowDownWideShort
                      : faArrowUpWideShort
                    : faArrowUpWideShort;
                  return (
                    <TableCell
                      padding="none"
                      style={{
                        backgroundColor: colouredHeader ? "#454545" : "white",
                        color: colouredHeader ? "white" : "black",
                        padding: "10px",
                        fontSize: "0.7rem",
                      }}
                      className="fw-light"
                      key={id}
                      onClick={sortable ? () => handleSorting(id) : () => null}
                    >
                      {name}
                      {sortable ? (
                        <FontAwesomeIcon
                          className="ms-1"
                          icon={sortableIcon}
                          onClick={
                            sortable ? () => handleSorting(id) : () => null
                          }
                        />
                      ) : (
                        ""
                      )}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          {children}
        </Table>
      </TableContainer>
      {paginationRequired && (
        // <TablePagination
        //   className={classes.root}
        //   component="div"
        //   onPageChange={onPageChange}
        //   page={page}
        //   count={count}
        //   rowsPerPage={rowsPerPage}
        //   onRowsPerPageChange={onRowsPerPageChange}
        // />
        <div className="row">
          <div className="d-flex justify-content-end">
            {/* <Pagination
              count={count}
              page={page}
              onChange={onPageChange}
              siblingCount={3}
              defaultPage={1}
              size="medium"
              showFirstButton
              showLastButton
              className="mb-2"
            /> */}

            <Pagination
              current={page}
              total={count}
              showTotal={(count, range) =>
                `${range[0]}-${range[1]} of ${count} items`
              }
              showSizeChanger={true}
              onChange={onPageChange}
              onShowSizeChange={onRowsPerPageChange}
              className="mb-2 me-2"
            />
          </div>
        </div>
      )}
    </Paper>
  );
};

export default TableComponent;
