import React, { useState, useMemo, useEffect, useCallback } from "react";
import BasicButton from "../../components/button/basicbutton";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import "./notification.css";
import SearchField from "../../components/search/search";
import { faSearch, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BasicModal from "../../components/modal/basicmodal";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "../../components/tables/datatable/tablepagination";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelNotification,
  cancelNotificationResponse,
  getNotificationList,
  getNotificationListResponse,
} from "../../store/demand/action";
import toastMessage from "../../common/toastmessage/toastmessage";
import CustomSelect from "../../components/select/customSelect";
import { showLoader } from "../../store/loader/actions";
import AlertDialog from "../../components/dialog/dialog";
import TableRowLaoder from "../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../components/tables/datatable/customTableCell";
import EmptyRow from "../../components/tables/datatable/emptyRow";
import {
  DELETE_MESSAGE_DESCRIPTION,
  NETWORK_STATUS_CODE,
  SORTINGORDER,
} from "../../common/constant/constant";
import Basicbutton from "../../components/button/basicbutton";

const Notification = () => {
  const dispatch = useDispatch();
  const notficationListResponse = useSelector(
    (state) => state?.demand?.notficationListResponse
  );
  const cancelNotificationResponses = useSelector(
    (state) => state?.demand?.cancelNotificationResponse
  );
  console.log("cancelNotificationResponse", cancelNotificationResponses);
  console.log("notficationListResponse", notficationListResponse);
  let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  console.log(typeof tableData, tableData?.length);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    notitificationStatus: 1,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState(SORTINGORDER.ASC);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [previewList, setPreviewList] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [notificationId, setNotificationId] = useState("");
  const columns = useMemo(() => [
    {
      id: "notificationDate",
      name: "NOTI. DATE",
      sortable: true,
    },

    {
      id: "financialDate",
      name: "FINANCIAL YEAR",
      sortable: true,
    },

    {
      id: "lastDate",
      name: "SUBM. LAST DATE",
      sortable: true,
    },

    {
      id: "programDetail",
      name: "PROGRAM DETAIL",
      sortable: true,
    },
    {
      id: "drugDetail",
      name: "DRUG DETAIL",
      sortable: true,
    },
    {
      id: "status",
      name: "STATUS",
      sortable: true,
    },

    {
      id: "dwonload",
      name: "DOWNLOAD",
      sortable: false,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getNotificationList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
          status: controller.notitificationStatus,
        })
      );
    }
    return () => {
      dispatch(getNotificationListResponse(""));
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (
      notficationListResponse &&
      notficationListResponse?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setTotalRows(notficationListResponse?.data?.pageList?.totalElements);
      setTableData(notficationListResponse?.data?.pageList?.content);
      setLoading(false);
    } else if (
      notficationListResponse &&
      notficationListResponse?.status == NETWORK_STATUS_CODE.BAD_REQUEST
    ) {
      setLoading(false);
      dispatch(getNotificationListResponse(""));
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [notficationListResponse]);

  useEffect(() => {
    if (
      cancelNotificationResponses &&
      cancelNotificationResponses?.status ===
        NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      setSelectedRow([]);
      setSelected([]);
      dispatch(
        getNotificationList({
          page: 0,
          rowsPerPage: 10,
          notitificationStatus: 1,
        })
      );
      setOpen(false);
      toastMessage("Notification", cancelNotificationResponses?.data?.message);
      dispatch(cancelNotificationResponse(""));
    } else if (
      cancelNotificationResponses &&
      cancelNotificationResponses?.status == NETWORK_STATUS_CODE.PAGE_NOT_FOUND
    ) {
      setOpen(false);
      toastMessage(
        "Notication",
        cancelNotificationResponses?.data?.message,
        "error"
      );
      dispatch(cancelNotificationResponse(""));
    }
  }, [cancelNotificationResponses]);

  const handlePageChange = (newPage) => {
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (e) => {
    setController({
      ...controller,
      rowsPerPage: e,
      page: 0,
    });
  };
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
    }
  };
  const handleNotificationStatusChange = (selectedOption) => {
    setController({
      ...controller,
      notitificationStatus: selectedOption?.value,
    });
  };

  const handleDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
  const handleCancelNotification = () => {
    console.log("selelcted", selectedRow?.id);
    console.log("clicked handle Action");
    dispatch(cancelNotification(selectedRow?.id));
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
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">DEMAND NOTIFICATION DESK</p>
        </div>
      </div>

      <div className="row d-flex justify-content-start mb-2">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="storeName">
                Store Name:
              </label>
            </div>
            <div className="col-auto">STATE WAREHOUSE</div>

            <div className="col-auto">
              <label className="labellineHeight" htmlFor="notificationStatus">
                Notification Status
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
        <div className="d-flex justify-content-start">
          <BasicButton
            type="button"
            buttonText="New Notification (HQ)"
            className="btn btn-outline-primary btn-sm rounded-0"
            onClick={(e) => {
              navigate("/openNotification", { state: e });
              dispatch(showLoader());
            }}
          />
          {selected.length > 0 ? (
            <>
              <BasicButton
                type="button"
                buttonText="Cancel Notification"
                outlineType={true}
                className="primary btn-sm ms-1 rounded-0"
                disabled={selected.length > 0 ? null : "disabled"}
                onClick={(e) => {
                  setShowDeleteDialog(true);
                }}
              />
              <BasicButton
                type="button"
                buttonText="Compile"
                outlineType={true}
                className="primary btn-sm ms-1 rounded-0"
                disabled={selected.length > 0 ? null : "disabled"}
                onClick={(e) => {
                  navigate("/openAnnualCompileForm", {
                    state: selectedRow,
                  });
                }}
              />
              <BasicButton
                type="button"
                buttonText="Change Last Date"
                outlineType={true}
                className="primary btn-sm ms-1 rounded-0"
                disabled={selected.length > 0 ? null : "disabled"}
                onClick={(e) => {
                  navigate("/openExtendNotificationForm", {
                    state: selectedRow,
                  });
                }}
              />
              <BasicButton
                type="button"
                outlineType={true}
                buttonText="Annual Demand"
                className="primary btn-sm ms-1 rounded-0"
                disabled={selected.length > 0 ? null : "disabled"}
                onClick={(e) =>
                  navigate("/generateAnnualDemand", { state: selectedRow })
                }
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="Notification Details" />
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
              columns={columns}
              sortField={sortField}
              order={order}
              handleSorting={handleSortingChange}
              checkBoxRequired={true}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  tableData &&
                  tableData?.length > 0 &&
                  tableData?.map((data, index) => {
                    return (
                      <StyledTableRow key={data.id}>
                        <StyledTableCell padding="none">
                          <Checkbox
                            onClick={(event) => handleClick(event, index, data)}
                            color="primary"
                            checked={selected.includes(index)}
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${index}`,
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {moment(data.notificationDate).format("DD/MM/YYYY")}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data.financialDate}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {moment.utc(data.lastDate).format("DD/MM/YYYY")}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.programList && data?.programList.length > 0 ? (
                            <span
                              className="text-decoration-underline"
                              onClick={() => {
                                setModalTitle("Programme List");
                                setPreviewList(data?.programList);
                                setShow(true);
                              }}
                              style={{ fontSize: "0.7rem", cursor: "pointer" }}
                            >
                              VIEW PROGRAMME LIST
                            </span>
                          ) : (
                            "NONE"
                          )}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.drugList && data?.drugList.length > 0 ? (
                            <span
                              className="text-decoration-underline"
                              onClick={() => {
                                setModalTitle("Drug List");
                                setPreviewList(data?.drugList);
                                setShow(true);
                              }}
                              style={{ fontSize: "0.7rem" }}
                            >
                              VIEW DRUGLIST
                            </span>
                          ) : (
                            ""
                          )}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.status}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.staus === 10 || data?.status === 11 ? (
                            <FontAwesomeIcon icon={faDownload} />
                          ) : (
                            ""
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
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
            {preview()}
          </div>
        </div>
        <AlertDialog
          open={showDeleteDialog}
          handleClose={handleDeleteDialog}
          description={DELETE_MESSAGE_DESCRIPTION}
        >
          <Basicbutton
            buttonText="Disagree"
            onClick={() => setShowDeleteDialog(false)}
          />
          <Basicbutton buttonText="Agree" onClick={handleCancelNotification} />
        </AlertDialog>
      </Paper>
    </>
  );
};

export default Notification;
