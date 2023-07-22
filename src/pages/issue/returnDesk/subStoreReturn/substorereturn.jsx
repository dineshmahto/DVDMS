import React, { useState, useMemo, useEffect } from "react";
import BasicInput from "../../../../components/inputbox/floatlabel/basicInput";
import CustomSelect from "../../../../components/select/customSelect";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import SearchField from "../../../../components/search/search";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import {
  faSearch,
  faAdd,
  faPlus,
  faFloppyDisk,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import Basicbutton from "../../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";
import {
  getSubStoreReturnList,
  getSubStoreReturnListResponse,
} from "../../../../store/issue/action";
import { Spinner } from "react-bootstrap";

const SubStoreReturn = () => {
  const dispatch = useDispatch();
  const subStoreReturnListResp = useSelector(
    (state) => state?.issuereturn?.subStoreReturnListResp
  );

  console.log("subStoreReturnListResp", subStoreReturnListResp);
  const [cloneData, setCloneData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [displaySelected, setDisplaySelected] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const [verificationDate, setVerificationDate] = useState(null);
  // columns
  const columns = useMemo(() => [
    {
      id: "tdId",
      name: "REQUEST ID",
      sortable: true,
    },

    {
      id: "subStore",
      name: "SUB STORE NAME",
      sortable: true,
    },
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
      type: "select",
    },
    {
      id: "programName",
      name: "PROGRAMME NAME",
      sortable: true,
    },
    {
      id: "batch",
      name: "BATCH NO",
      sortable: true,
    },

    {
      id: "availableQty",
      name: "AVAILABLE QTY",
      sortable: true,
    },

    {
      id: "expiryDate",
      name: "EXPIRY DATE",
      sortable: true,
    },
    {
      id: "manufactureDate",
      name: "MANUFACTURE DATE",
      sortable: true,
    },
    {
      id: "issueDate",
      name: "ISSUE DATE",
      sortable: true,
    },
    {
      id: "issueQty",
      name: "ISSUE. QTY",
      sortable: true,
    },
    {
      id: "returnQty",
      name: "RETURN. QTY",
      sortable: true,
    },
  ]);

  // returns boolean wether particular index is checked or not
  const isSelected = (name, selectList) => selectList.indexOf(name) !== -1;

  // onclick handle of checkbox
  const handleClick = (list, name, setSelected) => {
    const selectedIndex = list.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(list, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(list.slice(1));
    } else if (selectedIndex === list.length - 1) {
      newSelected = newSelected.concat(list.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        list.slice(0, selectedIndex),
        list.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handlePageChange = (newPage) => {
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (current, pageSize) => {
    console.log(current, pageSize);
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
  };

  const handleChange = (idx, id, e, data, setData) => {
    console.log("Dinesh", idx);
    console.log("Dinesh", id);
    console.log("Dinesh", e);
    const clone = [...data];
    console.log("Dinesh", clone[idx]);
    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };
    setData(clone);
  };

  //   Add Button event Listner to show selected List
  const handleSelectedList = () => {
    if (selected && selected.length > 0) {
      const selectedList = [...tableData].filter((elem) => {
        return selected.find((ele) => {
          return ele === elem.id;
        });
      });
      displayData.concat(selectedList);
      const totalSelectedList = [...displayData, ...selectedList];
      const isEmpty = totalSelectedList?.some(function (object) {
        return object.avlQty == "";
      });
      if (!isEmpty) {
        const newIssueList = tableData.filter((elem) => {
          return !selected.find((ele) => {
            return ele === elem.id;
          });
        });

        setDisplaySelected(selected);
        setDisplayData(totalSelectedList);
        setTableData(newIssueList);
      } else {
        toastMessage(
          "Stock Verification",
          "Fill up the selected List to Transfer",
          "error"
        );
      }
    } else {
      toastMessage("Stock Verification", "Select the Checkbox to add", "error");
    }
  };
  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getSubStoreReturnList({
            ...controller,
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 1000);
    }
    return () => {
      dispatch(getSubStoreReturnListResponse(""));
      clearTimeout();
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (subStoreReturnListResp && subStoreReturnListResp?.status === 200) {
      window.scrollTo(0, 0);
      setSelected([]);
      setTotalRows(subStoreReturnListResp?.data?.pageList?.totalElements);
      setTableData(subStoreReturnListResp?.data?.pageList?.content);
      setCloneData(subStoreReturnListResp?.data?.pageList?.content);
      setLoading(false);
      dispatch(getSubStoreReturnListResponse(""));
    } else if (
      subStoreReturnListResp &&
      subStoreReturnListResp?.status === 400
    ) {
      setLoading(false);
      dispatch(getSubStoreReturnListResponse(""));
    }
  }, [subStoreReturnListResp]);

  const handleSubmit = () => {
    console.log("DisplayData", displayData);
    if (verificationDate === null || verificationDate === "") {
      toastMessage("Sub Store Return", "Select the Verification Date");
    } else if (remarks === "") {
      toastMessage("Sub Store Return", "Enter the Remarks");
    } else {
      const finalData = [...displayData]?.map(({ id, avlQty }) => ({
        id,
        avlQty,
      }));
      console.log("finalData", finalData);
    }
  };

  const handleReset = () => {
    setTableData(cloneData);
    setSelected([]);
    setDisplayData([]);
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">THIRD PARTY RETURN</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start">
        <div className="col-12">
          <div className="row">
            <div className="col-auto">
              <label>Store Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "stateWareHouse",
                  label: "State WareHouse",
                }}
                options={[
                  { value: "stateWareHouse", label: "State WareHouse" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="New Return Drug Details" />
      </div>
      <Paper>
        <div className="row">
          {displayData && displayData.length > 0 ? (
            <>
              <TableComponent
                columns={columns}
                sortField={sortField}
                order={order}
                checkBoxRequired={true}
                handleSorting={handleSortingChange}
              >
                <TableBody>
                  {displayData &&
                    displayData?.length > 0 &&
                    displayData?.map((row, index) => {
                      const isItemSelected = isSelected(
                        row.id,
                        displaySelected
                      );
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={displaySelected.includes(index)}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="none">
                            <Checkbox
                              onClick={() =>
                                handleClick(
                                  displaySelected,
                                  row.id,
                                  setDisplaySelected
                                )
                              }
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          {columns.map((d, k) => {
                            if (d.id === "returnQty") {
                              return (
                                <TableCell
                                  key={k}
                                  padding="none"
                                  style={{
                                    padding: "4px",
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  <BasicInput
                                    value={row[d.id]}
                                    type="text"
                                    onChange={(e) =>
                                      handleChange(
                                        index,
                                        d.id,
                                        e.target.value,
                                        displayData,
                                        setDisplayData
                                      )
                                    }
                                    placeholder="Enter the Quantity"
                                    disabled={!isItemSelected}
                                  />
                                </TableCell>
                              );
                            } else if (d.id === "issueDate") {
                              return (
                                <TableCell
                                  key={k}
                                  padding="none"
                                  style={{
                                    padding: "4px",
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  {moment(row[d.id]).format("DD/MM/YYYY")}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell
                                  key={k}
                                  padding="none"
                                  style={{
                                    padding: "4px",
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  {row[d.id]}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </TableComponent>
              <div className="d-flex justify-content-center mb-1">
                <div className="row">
                  <div className="col-auto">
                    <label>Reamrks</label>
                  </div>
                  <div className="col-auto">
                    <BasicInput
                      type="textarea"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />{" "}
                    <label></label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="me-1">
                  <Basicbutton
                    className="success rounded-0"
                    buttonText="Save"
                    icon={
                      <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                    }
                    onClick={handleSubmit}
                  />
                </div>
                <div>
                  <Basicbutton
                    className="warning rounded-0 me-1"
                    buttonText="Reset"
                    icon={<FontAwesomeIcon icon={faRefresh} className="me-1" />}
                    onClick={handleReset}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="row mb-1">
          <div className="d-flex justify-content-end">
            <SearchField
              className="me-1 mt-1"
              iconPosition="end"
              iconName={faSearch}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
              checkBoxRequired={true}
              handleSorting={handleSortingChange}
            >
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell className="text-center" colSpan={12}>
                      <Spinner />
                    </TableCell>
                  </TableRow>
                ) : (
                  tableData &&
                  tableData?.map((row, index) => {
                    const isItemSelected = isSelected(row.id, selected);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={selected.includes(index)}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="none">
                          <Checkbox
                            onClick={(event) =>
                              handleClick(selected, row.id, setSelected)
                            }
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        {columns.map((d, k) => {
                          if (d.id === "returnQty") {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "4px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                <BasicInput
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      d.id,
                                      e.target.value,
                                      tableData,
                                      setTableData
                                    )
                                  }
                                  type="text"
                                  placeholder="Enter the Quantity"
                                  disabled={!isItemSelected}
                                />
                              </TableCell>
                            );
                          } else if (d.id === "issueDate") {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "4px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                {moment(row[d.id]).format("DD/MM/YYYY")}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "4px",
                                  fontSize: "0.7rem",
                                }}
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

                <EmptyRow loading={loading} tableData={tableData} />
              </TableBody>
            </TableComponent>
            <TablePagination
              page={controller.page + 1}
              count={totalRows}
              rowsPerPage={controller?.rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>

        <div className="row">
          <div className="d-flex justify-content-center">
            <div>
              <Basicbutton
                buttonText="Preview"
                className="primary mb-1 rounded-0"
                onClick={() => handleSelectedList()}
                icon={<FontAwesomeIcon icon={faPlus} className="me-1" />}
              />
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default SubStoreReturn;