import React, { useState, useMemo, Suspense, lazy } from "react";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { Checkbox, Collapse } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
const IntentIssueRejectModal = lazy(() => import("./intentissueconfirmmodal"));
const tempData = [
  {
    intentNo: "42530",
    intentDate: "2022-07-14 00:00:00.0",
    fromStore: "DISTRICT HOSPITAL DIMAPUR",
    progName: ["COVID19", "COVID19", "COVID19", "COVID19", "COVID19"],
    drugName: [
      "ONDENSETRON INJ. 2MG/ML(2ML)",
      "MORPHINE SULPHATE INJ. 10 MG(1 ML VIAL)",
      "METRONIDAZOLE INJ. 500MG/100ML(100ML)",
      "SUCCINYL CHOLINE INJ. 50MG/ML(2ML)",
      "DOBUTAMINE INJ. 250/5ML(5 AMP)",
    ],
    reqQty: ["200", "50", "1000", "50", "50"],
    status: "APPROVED",
    remarks: "",
  },
];
const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const IntentIssue = () => {
  const classes = useStyles();
  const [tableData, setTableData] = useState(tempData);
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const columns = useMemo(() => [
    {
      id: "intentNo",
      name: "INTENT NUMBER",
      sortable: true,
    },
    {
      id: "intentDate",
      name: "INTENT. DATE",
      sortable: true,
    },

    {
      id: "fromStore",
      name: "FROM STORE",
      sortable: true,
    },

    {
      id: "progName",
      name: "PROGRAMME NAME",
      sortable: true,
    },
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "reqQty",
      name: "REQUESTED QTY",
      sortable: true,
    },
    {
      id: "status",
      name: "STATUS",
      sortable: true,
    },
    {
      id: "remarks",
      name: "REMARKS",
      sortable: true,
    },
  ]);

  const [showIssueRejectModal, setIssueRejectModal] = useState(false);

  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleCollapse = (clickedIndex) => {
    if (open.includes(clickedIndex)) {
      const openCopy = open.filter((element) => {
        return element !== clickedIndex;
      });
      setOpen(openCopy);
    } else {
      const openCopy = [...open];
      openCopy.shift();
      openCopy.push(clickedIndex);
      setOpen(openCopy);
    }
  };
  const handleClick = (event, index, row) => {
    if (selected.includes(index)) {
      const openCopy = selected.filter((element) => {
        return element !== index;
      });
      setSelectedRow([]);
      setSelected(openCopy);
    } else {
      setSelectedRow(row);
      const openCopy = [...selected];
      openCopy.shift();
      openCopy.push(index);
      setSelected(openCopy);
      setIssueRejectModal(true);
    }
  };
  // returns boolean wether particular index is checked or not
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleIssueRejectModal = () => {
    setIssueRejectModal(false);
  };
  return (
    <>
      <div className="row">
        <div className="col-12">
          <TableComponent
            columns={columns}
            sortField={sortField}
            page={controller.page}
            count={totalRows}
            order={order}
            checkBoxRequired={true}
            paginationRequired={true}
            onPageChange={handlePageChange}
            rowsPerPage={controller.rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            numSelected={selected.length}
            rowCount={tableData?.length}
          >
            <TableBody>
              {tableData &&
                tableData?.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.id, row)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {row?.intentNo}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {row?.intentDate}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {row?.fromStore}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {row?.progName.length > 1 && (
                          <>
                            <div className="d-flex justify-content-end">
                              <FontAwesomeIcon
                                icon={
                                  open.includes(index)
                                    ? faChevronUp
                                    : faChevronDown
                                }
                                onClick={() => handleCollapse(index)}
                              />
                            </div>
                          </>
                        )}

                        {row?.progName.length > 1 && (
                          <Collapse in={open.includes(index)}>
                            {row?.progName &&
                              row?.progName.map((elem, index) => {
                                return <div className="pt-2 pb-2 ">{elem}</div>;
                              })}
                          </Collapse>
                        )}

                        {row?.progName.length === 1 &&
                          row?.progName.map((elem, index) => {
                            return <div className="">{elem}</div>;
                          })}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {row?.drugName.length > 1 && (
                          <Collapse in={open.includes(index)}>
                            {row?.drugName &&
                              row?.drugName.map((elem, index) => {
                                return <div className="pt-2 pb-2 ">{elem}</div>;
                              })}
                          </Collapse>
                        )}
                      </TableCell>

                      <TableCell padding="none" className={classes.tableCell}>
                        {row?.reqQty.length > 1 && (
                          <Collapse in={open.includes(index)}>
                            {row?.reqQty &&
                              row?.reqQty.map((elem, index) => {
                                return <div className="pt-2 pb-2 ">{elem}</div>;
                              })}
                          </Collapse>
                        )}
                      </TableCell>

                      <TableCell padding="none" className={classes.tableCell}>
                        {row?.status}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {row?.remarks}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </TableComponent>
        </div>
        <Suspense>
          <IntentIssueRejectModal
            showIssueRejectModal={showIssueRejectModal}
            handleIssueRejectModal={handleIssueRejectModal}
          />
        </Suspense>
      </div>
    </>
  );
};

export default IntentIssue;
