import React, { useState, useMemo, useEffect, useCallback } from "react";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import "./notification.css";
import {
  faArrowLeft,
  faDownload,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Spinner } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Basicbutton from "../../components/button/basicbutton";
import BasicModal from "../../components/modal/basicmodal";
import toastMessage from "../../common/toastmessage/toastmessage";
import {
  updateNotification,
  updateNotificationResponse,
} from "../../store/demand/action";
import dayjs from "dayjs";
const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const ExtendDemandNotification = () => {
  const updateNotificatResponse = useSelector(
    (state) => state?.demand?.updateNotificationResponse
  );
  console.log("updateNotificationRespose", updateNotificatResponse);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  let classes = useStyles();
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState();
  console.log(typeof tableData, tableData?.length);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    notitificationStatus: 1,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const [lastDate, setLastDate] = useState(null);
  const [show, setShow] = useState(false);
  const [previewList, setPreviewList] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const columns = useMemo(() => [
    {
      id: "id",
      name: "NOTI. ID",
      sortable: true,
    },

    {
      id: "notificationDate",
      name: "NOT. DATE",
      sortable: true,
    },

    {
      id: "lastDate",
      name: "FINANCIAL YEAR",
      sortable: true,
    },

    {
      id: "demandName",
      name: "DEMAND TYPE",
      sortable: true,
    },

    {
      id: "programList",
      name: "PROGRAM DETAIL",
      sortable: true,
    },

    {
      id: "drugList",
      name: "DRUG DETAIL",
      sortable: false,
    },
  ]);

  useEffect(() => {
    if (state) {
      setTableData([state]);
    }
  }, [state]);
  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };
  const handleSubmit = () => {
    if (lastDate === "") {
      toastMessage(
        "Demand Notification Desk",
        "Please Select the New Last Date",
        "error"
      );
    } else {
      dispatch(
        updateNotification({
          id: state?.id,
          lastDate: formatDate(lastDate),
        })
      );
    }
  };

  useEffect(() => {
    let timeOut1;
    if (updateNotificatResponse && updateNotificatResponse?.status === 201) {
      dispatch(updateNotificationResponse(""));
      toastMessage(
        "Demand Notification Desk",
        updateNotificatResponse?.data?.message
      );
      navigate("/openNotificationDesk", { replace: true });

      //   timeOut1 = setTimeout(() => {

      //   }, 2000);
    } else if (
      updateNotificatResponse &&
      updateNotificatResponse?.status == 404
    ) {
      toastMessage(
        "Demand Notification Desk",
        updateNotificatResponse?.data?.message,
        "error"
      );
      dispatch(updateNotificationResponse(""));
    }
    return () => {
      //clearTimeout(timeOut1);
    };
  }, [updateNotificatResponse]);

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
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

        setTableData(sorted);
      }
    },
    [sortField, order, tableData]
  );

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

  return (
    <>
      <Paper className="p-2">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">DEMAND NOTIFICATION DESK</p>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-start">
            <Basicbutton
              className="warning rounded-0"
              buttonText="Back"
              onClick={() => navigate("/openNotificationDesk")}
              icon={<FontAwesomeIcon icon={faArrowLeft} className="me-1" />}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-start mb-2">
          <div className="col-6">
            <div className="row align-items-center">
              <div className="col-auto">
                <label className="labellineHeight" htmlFor="storeName">
                  Store Name:
                </label>
              </div>
              <div className="col-auto">STATE WAREHOUSE</div>
            </div>
          </div>
        </div>

        <HorizonatalLine text="Notification Details" />
        <Paper elevation={2}>
          {/* Table Rendering */}
          <div className="row">
            <div className="col-12">
              <TableComponent
                columns={columns}
                sortField={sortField}
                page={controller.page + 1}
                count={totalRows}
                rowsPerPage={controller.rowsPerPage}
                order={order}
                paginationRequired={true}
                handleSorting={handleSortingChange}
                checkBoxRequired={false}
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
                    tableData?.length > 0 &&
                    tableData?.map((data, index) => {
                      return (
                        <TableRow key={data.id}>
                          <TableCell
                            padding="none"
                            className={classes.tableCell}
                          >
                            {data?.id}
                          </TableCell>
                          <TableCell
                            padding="none"
                            className={[classes.tableCell, "text-center"]}
                          >
                            {moment(data.notificationDate).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell
                            padding="none"
                            className={[classes.tableCell, "text-center"]}
                          >
                            {data?.financialDate}
                          </TableCell>

                          <TableCell
                            padding="none"
                            className={[classes.tableCell, "text-center"]}
                          >
                            {data?.demandName}
                          </TableCell>
                          <TableCell
                            padding="none"
                            className={[classes.tableCell, "text-center"]}
                          >
                            {data?.programList &&
                            data?.programList.length > 0 ? (
                              <span
                                className="text-decoration-underline"
                                onClick={() => {
                                  setModalTitle("Drug List");
                                  setPreviewList(data?.programList);
                                  setShow(true);
                                }}
                                style={{
                                  fontSize: "0.7rem",
                                  cursor: "pointer",
                                }}
                              >
                                VIEW PROGRAMME LIST
                              </span>
                            ) : (
                              "NONE"
                            )}
                          </TableCell>
                          <TableCell
                            padding="none"
                            className={[classes.tableCell, "text-center"]}
                          >
                            {data?.drugList && data?.drugList.length > 0 ? (
                              <span
                                className="text-decoration-underline"
                                onClick={() => {
                                  setModalTitle("Drug List");
                                  setPreviewList(data?.programList);
                                  setShow(true);
                                }}
                                style={{ fontSize: "0.7rem" }}
                              >
                                VIEW DRUGLIST
                              </span>
                            ) : (
                              ""
                            )}
                          </TableCell>

                          <TableCell
                            padding="none"
                            className={[classes.tableCell, "text-center"]}
                          >
                            {data?.staus === 10 || data?.status === 11 ? (
                              <FontAwesomeIcon icon={faDownload} />
                            ) : (
                              ""
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                  {console.log(tableData?.length)}
                  {!loading && tableData && tableData.length === 0 && (
                    <TableRow>
                      <TableCell className="text-center" colSpan={12}>
                        <p style={{ fontSize: "0.8rem" }}>
                          NO DATA AVAILABE IN TABLE
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </TableComponent>
            </div>
          </div>
        </Paper>
        <HorizonatalLine text="New Last Date" />

        <div className="row">
          <div className="d-flex justify-content-start">
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={classes.root}
                  value={lastDate}
                  onChange={(newValue) => {
                    console.log("NewValue", newValue);
                    setLastDate(newValue);
                  }}
                  disablePast={true}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="d-flex justify-content-center">
            <div>
              <Basicbutton
                buttonText="Extend"
                className="primary rounded-0"
                onClick={handleSubmit}
                icon={<FontAwesomeIcon icon={faFloppyDisk} className="me-1" />}
              />
            </div>
          </div>
        </div>
        {preview()}
      </Paper>
    </>
  );
};

export default ExtendDemandNotification;
