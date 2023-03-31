import React, { useState, useMemo, useEffect, Suspense } from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BasicInput from "../../components/inputbox/floatlabel/basicInput";
import Checkbox from "@mui/material/Checkbox";
import toastMessage from "../../common/toastmessage/toastmessage";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/modal/basicmodal";
import TableComponent from "../../components/tables/datatable/tableComponent";

import CommonTableBody from "../../components/tables/datatable/commonTableBody";

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
const tempData = [
  {
    id: 1,
    fromStoreId: 2134,
    storeName: "Chumukedima",
    toStoreId: 5123,
    tostoreTypeId: 1234,
    tostoreName: "Dimapur",
    requestQty: "",
    issuedAmnt: "",
  },
  {
    id: 2,
    fromStoreId: 1502,
    storeName: "Medziohema",
    toStoreId: 3133,
    tostoreTypeId: 7977,
    tostoreName: "Longleng",
    requestQty: "",
    issuedAmnt: "",
  },
];

const Issue = () => {
  console.log("tempData", tempData);
  const classes = useStyles();
  const [tableData, setTableData] = useState(tempData);
  const [cloneData, setCloneData] = useState(tempData);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [selected, setSelected] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const [show, setShow] = useState(false);
  const [showIssuePreviewModal, setIssuePreviewModal] = useState(false);
  const [copy, setCopy] = useState([]);

  const columns = useMemo(() => [
    {
      id: "fromStoreId",
      name: "From Store ID",
      sortable: false,
      type: "none",
    },

    {
      id: "storeName",
      name: "Store Name",
      sortable: false,
      type: "none",
    },
    {
      id: "toStoreId",
      name: "To StoreID",
      sortable: false,
      type: "none",
    },
    {
      id: "tostoreTypeId",
      name: "To StoreType ID",
      sortable: false,
      type: "none",
    },
    {
      id: "tostoreName",
      name: "To Store Name",
      sortable: false,
      type: "none",
    },
    {
      id: "requestQty",
      name: "Request Qty",
      sortable: false,
      placeholder: "Request Qty",
      type: "input",
    },
    {
      id: "issuedAmnt",
      name: "Issued Amount",
      sortable: false,
      placeholder: "Issued Amnt",
      type: "input",
    },
  ]);
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name, row) => {
    console.log("Name", name);
    const selectedIndex = selected.indexOf(name);
    console.log("Selectedindex", selectedIndex);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    console.log("NewSelected", newSelected);
    setSelected(newSelected);
  };

  // Cancel button Call back fucntion
  const handleCancel = () => {
    setSelected([]);
    setSelectedData([]);
    setDisplayData([]);
    const resetValue = cloneData.map((ele) => {
      if (ele.requestQty != "") {
        ele.requestQty = "";
      }
      if (ele.issuedAmnt != "") {
        ele.issuedAmnt = "";
      }
      return ele;
    });
    setTableData(resetValue);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const commonUpdateLogic = (rowId, event, key) => {
    tableData?.filter((issueItem) => {
      if (issueItem.id === rowId)
        return (issueItem[`${key}`] = event.target.value);
    });
  };

  //   Add Button event Listner to show selected List
  const handleSelectedList = () => {
    if (selected && selected.length > 0) {
      const selectedList = [...tableData].filter((elem) => {
        return selected.find((ele) => {
          return ele === elem.id;
        });
      });
      const isEmpty = selectedList?.some(function (object) {
        return object.issuedAmnt == "" || object.requestQty == "";
      });
      if (!isEmpty) {
        const newIssueList = tableData.filter((elem) => {
          return !selected.find((ele) => {
            return ele === elem.id;
          });
        });
        setSelected([]);
        setDisplayData(selectedList);
        setTableData(newIssueList);
      } else {
        toastMessage(
          "Issue List",
          "Fill up the selected List to Transfer",
          "error"
        );
      }
    } else {
      toastMessage(
        "Issue List",
        "Select the Checkbox to transfer the list",
        "error"
      );
    }
  };

  //   Preview Modal
  const handlePreviewModal = () => {
    setIssuePreviewModal(true);
  };
  const PreviewModal = () => {
    return (
      <BasicModal
        title="Selected IssueList Preview"
        show={showIssuePreviewModal}
        close={() => setIssuePreviewModal(false)}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        size="lg"
      >
        <TableComponent
          columns={columns}
          sortField={sortField}
          order={order}
          caption="Prgramme Table"
          checkBoxRequired={false}
          tableTitle="Selected Issue List"
        >
          <CommonTableBody
            data={displayData}
            columns={columns}
            checkBoxRequired={false}
            loading={loading}
          />
        </TableComponent>
      </BasicModal>
    );
  };
  const selectedListView = () => {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
              caption="Issue Table"
              checkBoxRequired={false}
              tableTitle="Selected Issue List"
              actionToolTip="Add"
              colouredHeader={true}
              showTableActionBar={true}
              toolbarRequired={true}
            >
              <CommonTableBody
                data={displayData}
                columns={columns}
                checkBoxRequired={false}
                loading={false}
              />
            </TableComponent>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-warning m-2"
              onClick={() => {
                handlePreviewModal();
              }}
            >
              Preview
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            {PreviewModal()}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {console.log("DisplayLength", displayData.length)}
          {displayData && displayData.length > 0 && selectedListView()}
          <div className="col-12">
            <Suspense fallback={<div>Loading...</div>}>
              <TableComponent
                columns={columns}
                sortField={sortField}
                page={controller.page}
                count={totalRows}
                order={order}
                checkBoxRequired={true}
                multipleSelect={true}
                paginationRequired={true}
                tableTitle="Issue List"
                onPageChange={handlePageChange}
                rowsPerPage={controller.rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                onSelectAllClick={handleSelectAllClick}
                numSelected={selected.length}
                rowCount={tableData?.length}
                actionIcon={faAdd}
                handleActionClick={handleSelectedList}
                overFlowX="hidden"
                width="440"
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
                              onClick={(event) =>
                                handleClick(event, row.id, row)
                              }
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          {columns.map((d, k) => {
                            if (d.type == "input") {
                              return (
                                <TableCell key={k} align="right">
                                  <BasicInput
                                    id={row.id + d.id}
                                    type="text"
                                    className="shadow-none"
                                    placeholder={d.placeholder}
                                    onChange={(e) =>
                                      commonUpdateLogic(row.id, e, d.id)
                                    }
                                  />
                                </TableCell>
                              );
                            } else {
                              return <TableCell key={k}>{row[d.id]}</TableCell>;
                            }
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </TableComponent>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Issue;
