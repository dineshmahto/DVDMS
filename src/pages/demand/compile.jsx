import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import "./notification.css";
import SearchField from "../../components/search/search";
import { faList, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import BasicModal from "../../components/modal/basicmodal";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "../../components/tables/datatable/tablepagination";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getCompileDemand,
  getCompileDemandResp,
  saveCompileDemand,
  saveCompileDemandResp,
} from "../../store/demand/action";
import toastMessage from "../../common/toastmessage/toastmessage";
import CustomSelect from "../../components/select/customSelect";
import TableRowLaoder from "../../components/tables/datatable/tableRowLaoder";
import StyledTableCell from "../../components/tables/datatable/customTableCell";
import EmptyRow from "../../components/tables/datatable/emptyRow";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
  SORTINGORDER,
} from "../../common/constant/constant";
import BasicInput from "../../components/inputbox/floatlabel/basicInput";
import NormalTableRow from "../../components/tables/datatable/normalTableRow";
import Basicbutton from "../../components/button/basicbutton";
import dayjs from "dayjs";
import BackButon from "../../components/button/backButon";
import handleSortingFunc from "../../components/tables/datatable/sortable";
import StyledTableRow from "../../components/tables/datatable/customTableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BasicTextAreaField from "../../components/inputbox/textarea";
const AlertDialog = lazy(() => import("../../components/dialog/dialog"));
const CompileDemand = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log("state", state);
  const compileDemandResponse = useSelector(
    (state) => state?.demand?.compileDemandResp
  );
  const saveCompileDmdResponse = useSelector(
    (state) => state?.demand?.saveCompileDmdResp
  );
  console.log("compileDemandResponse", compileDemandResponse);
  console.log("saveCompileDmdResp", saveCompileDmdResponse);
  let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [compileData, setCompiledData] = useState([]);
  const [compile, setCompile] = useState(false);
  console.log(typeof tableData, tableData?.length);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState(SORTINGORDER.ASC);
  const [selected, setSelected] = useState([]);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [previewList, setPreviewList] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);

  const [notificationId, setNotificationId] = useState("");
  const [totalElements, setTotalElements] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [dynamicColumn, setDynamicColumn] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [financilaYear, setFinancialYear] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [mergedList, setMergedList] = useState([]);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [redirectDialog, showRedirectDialog] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");
  const columns = useMemo(() => [
    {
      id: "programName",
      name: "PROGRAM NAME",
      sortable: false,
    },
    {
      id: "name",
      name: "DRUG NAME",
      sortable: false,
    },

    {
      id: "requestQty",
      name: "REQUEST QTY",
      sortable: false,
    },
    {
      id: "compileQty",
      name: "COMPILE QTY",
      sortable: false,
    },
  ]);

  const compiledColumns = [
    {
      id: "prevDetails",
      name: "VIEW PRVS REQST",
      sortable: false,
    },
    {
      id: "name",
      name: "STORE NAME",
      sortable: false,
    },
    {
      id: "reqNo",
      name: "REQUEST NUMBER",
      sortable: false,
    },

    {
      id: "requestDate",
      name: "REQUEST DATE",
      sortable: false,
    },
    {
      id: "demanded",
      name: "TOTAL NO OF DRUGS(DEMANDED)",
      sortable: false,
    },
    {
      id: "notDemanded",
      name: "TOTAL NO OF DRUGS(NOT DEMANDED)",
      sortable: false,
    },
  ];

  const updateTable = (newPage) => {
    const offset = newPage * controller.rowsPerPage;
    console.log("offset", offset);
    console.log("totalElements", totalElements);
    const currentPageData = [...totalElements].slice(
      offset,
      offset + controller.rowsPerPage
    );
    setLoading(false);
    setTableData(currentPageData);
  };

  const handlePageChange = (newPage) => {
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
    updateTable(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    console.log("e", e);
    const offset = 1 * e;
    const currentPageData = [...totalElements].slice(offset, offset + e);
    setController({
      ...controller,
      rowsPerPage: e,
      page: 1,
    });
    setLoading(false);
    setTableData(currentPageData);
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      if (state != "" && state != null) {
        setLoading(true);

        dispatch(getCompileDemand({ id: state?.id }));
      }
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getCompileDemandResp(""));
    };
  }, []);

  useEffect(() => {
    if (
      compileDemandResponse &&
      compileDemandResponse?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      if (compileDemandResponse?.data?.status === SERVER_STATUS_CODE.SUCCESS) {
        // compiled data
        setCompiledData(compileDemandResponse?.data?.getCompileDemand);

        setProgramList(compileDemandResponse?.data?.getDemandQty.compileData);

        setTotalElements(compileDemandResponse?.data?.getDemandQty.compileData);

        setNotificationId(compileDemandResponse?.data?.getDemandQty?.Id);
        const totalPageCount = Math.ceil(
          [...compileDemandResponse?.data?.getDemandQty.compileData]?.length /
            controller?.rowsPerPage
        );
        setTotalPages(totalPageCount);
        console.log("totalpageCOunt", totalPageCount);

        const offset = controller.page * controller.rowsPerPage;

        console.log("offset", offset);
        const currentPageData = [
          ...compileDemandResponse?.data?.getDemandQty.compileData,
        ].slice(offset, offset + controller.rowsPerPage);
        console.log(
          "data",
          compileDemandResponse?.data?.getDemandQty.compileData
        );
        console.log("currentPageData", currentPageData);
        setTableData(currentPageData);
        dispatch(getCompileDemandResp(""));
        setLoading(false);
      } else if (
        compileDemandResponse?.data?.status === SERVER_STATUS_CODE.FAILED
      ) {
        setLoading(false);
        setRedirectMessage(compileDemandResponse?.data?.message);
        showRedirectDialog(true);
        dispatch(getCompileDemandResp(""));
      }
    } else if (
      compileDemandResponse &&
      compileDemandResponse?.status == NETWORK_STATUS_CODE.BAD_REQUEST
    ) {
      setLoading(false);
      dispatch(getCompileDemandResp(""));
    }
  }, [compileDemandResponse]);

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === SORTINGORDER.ASC
        ? SORTINGORDER.DESC
        : SORTINGORDER.ASC;
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(sortField, sortOrder, tableData));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
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
    setSelected(newSelected);
  };
  const handleNotificationStatusChange = (selectedOption) => {
    setController({
      ...controller,
      notitificationStatus: selectedOption?.value,
    });
  };

  const preview = useCallback(() => {
    return (
      <BasicModal
        title={modalTitle}
        show={show}
        close={() => setShow(false)}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
      >
        {previewList &&
          previewList.length > 0 &&
          previewList.map((element, index) => {
            return (
              <>
                <p>
                  {" "}
                  <span>{index + 1}. </span> {element?.name}
                </p>
              </>
            );
          })}
      </BasicModal>
    );
  }, [previewList, show, modalTitle]);

  // returns boolean wether particular index is checked or not
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleChange = (idx, id, id2, e) => {
    console.log("idx", idx);
    console.log("id", id);

    const result = [...totalElements]?.map((ele) => {
      if (ele?.drugId === id && ele?.programId === id2) {
        let clone = JSON.parse(JSON.stringify(ele));
        clone[`${idx}`] = e;
        return clone;
      }
      return ele;
    });
    console.log("result", result);
    const newItem = [...result].find((e, index) => {
      if (e?.drugId === id && e?.programId === id2) {
        delete e?.requestQty;
        return e;
      }
    });
    const elementExist = [...selectedRow]?.filter((item) => {
      return item.drugId === id && item?.programId === id2;
    });
    if (elementExist.length === 0) {
      setSelectedRow([...selectedRow, newItem]);
    } else {
      for (let [i, item] of [...selectedRow]?.entries()) {
        if (item.drugId == id && item?.programId === id2) {
          selectedRow.splice(i, 1);
        }
      }

      setSelectedRow([...selectedRow, newItem]);
    }
    setTotalElements(result);
  };

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  const checkEmpty = (clone, dynamicColumn) => {
    [...clone]?.map((item) => {
      dynamicColumn.forEach(({ id }) => {
        console.log("index", id);
        console.log(item[`${id}`]);
        console.log(Number.isInteger(item[id]));
        if (!Number.isInteger(item[id])) {
          console.log("index");
          return true;
        }
      });
    });
  };

  useEffect(() => {
    if (
      saveCompileDmdResponse?.status ===
      NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (saveCompileDmdResponse?.data?.status === SERVER_STATUS_CODE.SUCCESS) {
        toastMessage("Compile Demand", saveCompileDmdResponse?.data?.message);
        setShowConfirmDialog(false);
        dispatch(saveCompileDemandResp(""));
        navigate("/openNotificationDesk");
      } else if (
        saveCompileDmdResponse?.data?.status === SERVER_STATUS_CODE.FAILED
      ) {
        setShowConfirmDialog(false);
        toastMessage("Compile Demad", saveCompileDmdResponse?.data?.message);
      }
    } else if (
      saveCompileDmdResponse?.status === NETWORK_STATUS_CODE.INTERNAL_ERROR
    ) {
      setShowConfirmDialog(false);
      toastMessage(
        "Compile Demand",
        saveCompileDmdResponse?.data?.message,
        "error"
      );
    }
  }, [saveCompileDmdResponse]);

  const handleDispatchCompile = () => {
    dispatch(
      saveCompileDemand({
        list: mergedList,
        id: notificationId,
        remarks: remarks,
        type: type,
      })
    );
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">COMPILE DEMAND</p>
        </div>
      </div>
      <BackButon buttonText="Back" routePath="openNotificationDesk" />
      <div className="row mt-2">
        <HorizonatalLine text="Notification Details" />
      </div>
      <div className="row d-flex justify-content-start mb-2">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <label className="labellineHeight">
                Financial Year: {financilaYear}
              </label>
            </div>

            <div className="col-auto">
              <label className="labellineHeight">
                Notification ID: {notificationId}
              </label>
            </div>

            <div className="col-auto">
              <label className="labellineHeight">
                Last Date: {formatDate(lastDate)}
              </label>
            </div>
            <div className="col-auto">
              <label className="labellineHeight">Your Store:</label>
            </div>
            <div className="col-auto">STATE WAREHOUSE</div>

            <div className="col-auto">
              <label className="labellineHeight">Reporting Status</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "1",
                  label: "ACTIVE",
                }}
                options={[
                  { value: "99", label: "ALL" },
                  { value: "1", label: " ACTIVE" },
                  { value: "3", label: "CANCELLED" },
                  { value: "10", label: "Compiled by HQ" },
                  { value: "11", label: "Closed" },
                ]}
                onChange={handleNotificationStatusChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Drug Details" />
      </div>
      <div className="row mb-2">
        <div className="d-flex justify-content-end">
          <SearchField
            iconPosition="end"
            iconName={faSearch}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div>
      <Paper>
        {!compile && (
          <div className="row">
            <div className="col-12">
              <TableComponent
                columns={compiledColumns}
                sortField={sortField}
                order={order}
                handleSorting={handleSortingChange}
                rowCount={compileData?.length}
                overFlow={true}
                colouredHeader={true}
                stickyHeader={true}
              >
                <TableBody>
                  {loading ? (
                    <TableRowLaoder />
                  ) : (
                    compileData &&
                    compileData.map((data, index) => {
                      return (
                        <StyledTableRow key={data?.id}>
                          {compiledColumns.map((d, k) => {
                            if (d.id === "prevDetails") {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  <span
                                    className="text-decoration-underline ms-1"
                                    onClick={() => {
                                      console.log();
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faList}
                                      className="me-2"
                                    />
                                  </span>
                                </StyledTableCell>
                              );
                            } else {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  {data[d.id]}
                                </StyledTableCell>
                              );
                            }
                          })}
                        </StyledTableRow>
                      );
                    })
                  )}
                  <EmptyRow loading={loading} tableData={compileData} />
                </TableBody>
              </TableComponent>

              {preview()}
            </div>
            {compileData && compileData.length > 0 ? (
              <div className="d-flex justify-content-center">
                <Basicbutton
                  buttonText="Compile"
                  className="btn btn-primary rounded-0 me-2 mt-2"
                  onClick={() => {
                    setCompile(true);
                  }}
                />
              </div>
            ) : null}
          </div>
        )}

        {/* Table Rendering */}
        {compile && (
          <div className="row">
            <div className="col-12">
              <TableComponent
                columns={columns}
                sortField={sortField}
                order={order}
                handleSorting={handleSortingChange}
                checkBoxRequired={true}
                multipleSelect={true}
                numSelected={selected.length}
                rowCount={tableData?.length}
                onSelectAllClick={handleSelectAllClick}
              >
                <TableBody>
                  {loading ? (
                    <TableRowLaoder />
                  ) : (
                    tableData &&
                    tableData?.map((row, index) => {
                      const isItemSelected = isSelected(
                        row?.drugId + row?.programId
                      );
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <NormalTableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row?.drugId + row?.programId}
                          selected={isItemSelected}
                        >
                          <StyledTableCell padding="none">
                            <Checkbox
                              onClick={(event) =>
                                handleClick(row?.drugId + row?.programId, row)
                              }
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </StyledTableCell>

                          <StyledTableCell padding="none">
                            {row?.programName}
                          </StyledTableCell>
                          <StyledTableCell padding="none">
                            {row?.drugName}
                          </StyledTableCell>

                          {
                            <StyledTableCell
                              key={row?.drugId + `input`}
                              padding="none"
                            >
                              {row?.requestQty}
                            </StyledTableCell>
                          }
                          <StyledTableCell
                            key={row?.id + `compileinput`}
                            padding="none"
                          >
                            <BasicInput
                              onChange={(e) =>
                                handleChange(
                                  "compileQty",
                                  row.drugId,
                                  row?.programId,
                                  parseInt(e.target.value)
                                )
                              }
                              type="text"
                              placeholder="Enter the Quantity"
                              disabled={!isItemSelected}
                            />
                          </StyledTableCell>
                        </NormalTableRow>
                      );
                    })
                  )}
                  <EmptyRow loading={loading} tableData={tableData} />
                </TableBody>
              </TableComponent>
              <TablePagination
                page={controller.page + 1}
                count={totalElements.length}
                rowsPerPage={controller?.rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              {tableData && tableData?.length > 0 ? (
                <>
                  <div className="row">
                    <div className="d-flex justify-content-center">
                      <label>Remarks </label>
                      <BasicTextAreaField
                        cols={20}
                        row={5}
                        type="textarea"
                        onChange={(e) => setRemarks(e.target?.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="d-flex justify-content-center">
                      <Basicbutton
                        buttonText="Draft"
                        className="btn btn-primary rounded-0 me-2 mt-2"
                        onClick={() => {
                          console.log("selectedRow", selectedRow);
                          const clone = selectedRow;
                          console.log("DynamicColumns", dynamicColumn);
                          const eleRequestQntGrtThnZero = [
                            ...totalElements,
                          ]?.filter((item) => {
                            if (item.requestQty > 0) return item;
                          });
                          if (
                            !checkEmpty(clone, dynamicColumn) ||
                            eleRequestQntGrtThnZero.length > 0
                          ) {
                            console.log(
                              "eleRequestQntGrtThnZero",
                              eleRequestQntGrtThnZero
                            );

                            const test = [...eleRequestQntGrtThnZero]?.map(
                              (ele) => {
                                let clone = JSON.parse(JSON.stringify(ele));

                                clone["compileQty"] = ele?.requestQty;
                                delete clone[`requestQty`];
                                console.log("clone", clone);
                                return clone;
                              }
                            );

                            console.log("test", test);

                            const finalList = [...test].filter((elem) => {
                              return !selectedRow.find((ele) => {
                                return ele.drugId === elem.drugId;
                              });
                            });
                            console.log("finalList", finalList);
                            const mergerdLists = [...selectedRow, ...finalList];
                            console.log("mergedList", mergerdLists);
                            setMessage("You are saving in Draft");
                            setMergedList(mergerdLists);
                            setType(0);
                            setShowConfirmDialog(true);
                          } else {
                            toastMessage(
                              "Compile Demand",
                              "Please Enter the Requested Qunatity of Selected Rows",
                              "error"
                            );
                          }
                        }}
                      />

                      <Basicbutton
                        buttonText="Final"
                        className="btn btn-primary rounded-0 mt-2"
                        onClick={() => {
                          const clone = selectedRow;
                          console.log("DynamicColumns", dynamicColumn);
                          if (!checkEmpty(clone, dynamicColumn)) {
                            console.log("selectedRow", selectedRow);

                            const eleRequestQntGrtThnZero = [
                              ...totalElements,
                            ]?.filter((item) => {
                              if (item.requestQty > 0) return item;
                            });
                            console.log(
                              "eleRequestQntGrtThnZero",
                              eleRequestQntGrtThnZero
                            );

                            const test = [...eleRequestQntGrtThnZero]?.map(
                              (ele) => {
                                let clone = JSON.parse(JSON.stringify(ele));

                                clone["compileQty"] = ele?.requestQty;
                                delete clone[`requestQty`];
                                console.log("clone", clone);
                                return clone;
                              }
                            );

                            console.log("test", test);

                            const finalList = [...test].filter((elem) => {
                              return !selectedRow.find((ele) => {
                                return ele.drugId === elem.drugId;
                              });
                            });
                            console.log("finalList", finalList);
                            const mergerdLists = [...selectedRow, ...finalList];
                            console.log("mergedList", mergerdLists);
                            setMessage(
                              "Once Submitted cannot be re submit again"
                            );
                            setMergedList(mergerdLists);
                            setType(1);
                            setShowConfirmDialog(true);
                          } else {
                            toastMessage(
                              "Compile Demand",
                              "Please Enter the Requested Qunatity of Selected Rows",
                              "error"
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}
      </Paper>

      {showConfirmDialog && (
        <Suspense>
          <AlertDialog
            open={showConfirmDialog}
            handleClose={() => {
              setMergedList([]);
              setType("");
              setShowConfirmDialog(false);
            }}
            description={message}
          >
            <Basicbutton
              buttonText="Disagree"
              onClick={() => {
                setMergedList([]);
                setType("");
                setShowConfirmDialog(false);
              }}
            />
            <Basicbutton buttonText="Agree" onClick={handleDispatchCompile} />
          </AlertDialog>
        </Suspense>
      )}

      {redirectDialog && (
        <Suspense>
          <AlertDialog
            open={redirectDialog}
            handleClose={() => {
              setRedirectMessage("");
              showRedirectDialog(false);
            }}
            description={redirectMessage}
          >
            <Basicbutton
              buttonText="OK"
              onClick={() => navigate("/openNotificationDesk")}
            />
          </AlertDialog>
        </Suspense>
      )}
    </>
  );
};

export default CompileDemand;
