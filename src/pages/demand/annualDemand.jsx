import React, { useState, useMemo, useEffect, useCallback } from "react";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import "./notification.css";
import SearchField from "../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import BasicModal from "../../components/modal/basicmodal";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "../../components/tables/datatable/tablepagination";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getAnnualDemandNotification,
  getAnnualDemandNotificationResp,
  saveDemandNotificationResponse,
  saveGenerateAnnualDemand,
  saveGenerateAnnualDemandResp,
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
import BasicTextAreaField from "../../components/inputbox/textarea";
const AnnualDemand = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log("state", state);
  const annualNotificationListResponse = useSelector(
    (state) => state?.demand?.annualDemandNotListResp
  );
  const cancelNotificationResponse = useSelector(
    (state) => state?.demand?.cancelNotificationResponse
  );
  const saveGenerateAnnualDmdResponse = useSelector(
    (state) => state?.demand?.saveGenerateAnnualDmdResp
  );
  console.log("saveGenerateAnnualDmdResp", saveGenerateAnnualDmdResponse);
  console.log("cancelNotificationResponse", cancelNotificationResponse);
  console.log("annualNotificationListResponse", annualNotificationListResponse);
  let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
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
  const [column, setColumn] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [financilaYear, setFinancialYear] = useState("");
  const [remarks, setRemarks] = useState("");
  const columns = useMemo(() => [
    {
      id: "name",
      name: "DRUG NAME",
      sortable: false,
    },

    {
      id: "availableQty",
      name: "AVAILABLE QTY",
      sortable: false,
    },
  ]);

  const updateTable = (newPage) => {
    const offset = newPage * controller.rowsPerPage;
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
      page: newPage,
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

        dispatch(getAnnualDemandNotification({ id: state?.id }));
      }
    }
    return () => {
      isApiSubcribed = false;
    };
  }, []);

  useEffect(() => {
    if (
      annualNotificationListResponse &&
      annualNotificationListResponse?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setProgramList(
        annualNotificationListResponse?.data?.getAnnualDemand.programList
      );
      if (
        annualNotificationListResponse?.data?.getAnnualDemand?.programList
          .length > 0
      ) {
        let temp = [];
        [
          ...annualNotificationListResponse?.data?.getAnnualDemand?.programList,
        ].map((element) => {
          let ele = {};
          ele["id"] = `reqQty_${element?.id}`;
          ele["name"] = element?.name;
          temp.push(ele);
        });

        setDynamicColumn(temp);
        setColumn(columns.concat(temp));
        setLoading(false);
      } else {
        setColumn(
          columns.concat([
            {
              id: "reqQty_",
              name: "REQUEST QTY",
              sortable: false,
            },
          ])
        );
      }
      console.log("Dinesheshehh");

      setTotalElements(
        annualNotificationListResponse?.data?.getAnnualDemand?.drugList
      );
      setNotificationId(
        annualNotificationListResponse?.data?.getAnnualDemand?.Id
      );
      const totalPageCount = Math.ceil(
        [...annualNotificationListResponse?.data?.getAnnualDemand?.drugList]
          ?.length / controller?.rowsPerPage
      );
      setLastDate(
        annualNotificationListResponse?.data.getAnnualDemand?.lastDate
      );
      setFinancialYear(
        annualNotificationListResponse?.data?.getAnnualDemand?.financialDate
      );
      setTotalPages(totalPageCount);

      const offset = controller.page * controller.rowsPerPage;

      console.log("offset", offset);
      const currentPageData = [
        ...annualNotificationListResponse?.data?.getAnnualDemand?.drugList,
      ].slice(offset, offset + controller.rowsPerPage);
      console.log(
        "data",
        annualNotificationListResponse?.data?.getAnnualDemand?.drugList
      );
      console.log("currentPageData", currentPageData);
      setTableData(currentPageData);

      setLoading(false);
    } else if (
      annualNotificationListResponse &&
      annualNotificationListResponse?.status == NETWORK_STATUS_CODE.BAD_REQUEST
    ) {
      setLoading(false);
      dispatch(getAnnualDemandNotificationResp(""));
    }
  }, [annualNotificationListResponse]);

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === SORTINGORDER.ASC
        ? SORTINGORDER.DESC
        : SORTINGORDER.ASC;
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };
  const handleSorting = useCallback(
    (sortField, sortOrder) => {
      if (sortField) {
        const sorted = [...tableData].sort((a, b) => {
          if (a[sortField] === null) return 1;
          if (b[sortField] === null) return -1;
          if (a[sortField] === null && b[sortField] === null) return 0;

          return (
            a[sortField]
              .toString()
              .localeCompare(b[sortField].toString(), "en", {
                numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
          );
        });
        setSelected([]);

        setTableData(sorted);
      }
    },
    [sortField, order, tableData]
  );

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

  const handleChange = (idx, id, e) => {
    console.log("idx", idx);
    console.log("id", id);

    const result = [...totalElements]?.map((ele) => {
      if (ele?.id === id) {
        let clone = JSON.parse(JSON.stringify(ele));
        clone[`${idx}`] = e;
        return clone;
      }
      return ele;
    });
    const newItem = [...result].find((e, index) => {
      if (e?.id === id) {
        return e;
      }
    });
    const elementExist = [...selectedRow]?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setSelectedRow([...selectedRow, newItem]);
    } else {
      for (let [i, item] of [...selectedRow]?.entries()) {
        if (item.id === id) {
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
      saveGenerateAnnualDmdResponse?.status ===
      NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (
        saveGenerateAnnualDmdResponse?.data?.status ===
        SERVER_STATUS_CODE.SUCCESS
      ) {
        toastMessage(
          "Annual Demand",
          saveGenerateAnnualDmdResponse?.data?.message
        );
        dispatch(saveGenerateAnnualDemandResp(""));
        navigate("/openNotificationDesk");
      } else if (
        saveGenerateAnnualDmdResponse?.data?.status ===
        SERVER_STATUS_CODE.FAILED
      ) {
        toastMessage(
          "Annual Demad",
          saveGenerateAnnualDmdResponse?.data?.message
        );
      }
    }
    // else if (
    //   saveGenerateAnnualDmdResponse?.status ===
    //     NETWORK_STATUS_CODE.INTERNAL_ERROR ||
    //   NETWORK_STATUS_CODE.PAGE_NOT_FOUND
    // ) {
    //   toastMessage(
    //     "Annual Demand",
    //     saveGenerateAnnualDmdResponse?.data?.message,
    //     "error"
    //   );
    // }
  }, [saveGenerateAnnualDmdResponse]);
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">ANNUAL DEMAND</p>
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
              <label className="labellineHeight" htmlFor="financialYear">
                Financial Year: {financilaYear}
              </label>
            </div>

            <div className="col-auto">
              <label className="labellineHeight" htmlFor="NotificationId">
                Notification ID: {notificationId}
              </label>
            </div>

            <div className="col-auto">
              <label className="labellineHeight" htmlFor="lastDate">
                Last Date: {formatDate(lastDate)}
              </label>
            </div>
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="storeName">
                Your Store:
              </label>
            </div>
            <div className="col-auto">STATE WAREHOUSE</div>

            <div className="col-auto">
              <label className="labellineHeight" htmlFor="notificationStatus">
                Reporting Status
              </label>
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
        {/* Table Rendering */}
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={column}
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
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <NormalTableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <StyledTableCell padding="none">
                          <Checkbox
                            onClick={(event) => handleClick(row.id, row)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {row?.name}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {row?.availableQty}
                        </StyledTableCell>
                        {dynamicColumn.length > 0 ? (
                          dynamicColumn.map((d, k) => {
                            return (
                              <StyledTableCell key={k} padding="none">
                                <BasicInput
                                  value={row[d.id]}
                                  onChange={(e) =>
                                    handleChange(
                                      d.id,
                                      row.id,
                                      parseInt(e.target.value)
                                    )
                                  }
                                  type="text"
                                  placeholder="Enter the Quantity"
                                  disabled={!isItemSelected}
                                />
                              </StyledTableCell>
                            );
                          })
                        ) : (
                          <StyledTableCell
                            key={row?.id + `input`}
                            padding="none"
                          >
                            <BasicInput
                              onChange={(e) =>
                                handleChange(
                                  "reqQty_",
                                  row.id,
                                  parseInt(e.target.value)
                                )
                              }
                              type="text"
                              placeholder="Enter the Quantity"
                              disabled={!isItemSelected}
                            />
                          </StyledTableCell>
                        )}
                      </NormalTableRow>
                    );
                  })
                )}
                <EmptyRow loading={loading} tableData={tableData} />
              </TableBody>
            </TableComponent>
            <TablePagination
              page={controller.page}
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
                      name="remarks"
                      rows={2}
                      col={10}
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
                        if (!checkEmpty(clone, dynamicColumn)) {
                          dispatch(
                            saveGenerateAnnualDemand({
                              list: clone,
                              id: notificationId,
                              remarks: remarks,
                              type: 0,
                            })
                          );
                        } else {
                          toastMessage(
                            "Annual Demand",
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
                        console.log("selectedRow", selectedRow);
                        const clone = selectedRow;
                        console.log("DynamicColumns", dynamicColumn);
                        if (!checkEmpty(clone, dynamicColumn)) {
                          dispatch(
                            saveGenerateAnnualDemand({
                              list: clone,
                              id: notificationId,
                              remarks: remarks,
                              type: 1,
                            })
                          );
                        } else {
                          toastMessage(
                            "Annual Demand",
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

            {preview()}
          </div>
        </div>
      </Paper>
    </>
  );
};

export default AnnualDemand;
