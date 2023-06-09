import React, { useState, useMemo, useEffect, useCallback } from "react";
import BasicButton from "../../components/button/basicbutton";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import SelectOption from "../../components/option/option";
import TableComponent from "../../components/tables/datatable/tableComponent";
import { getNotificationService } from "../../services/notification/notificationservice";
import { TableBody, TableRow, TableCell } from "@mui/material";
import "./notification.css";
import SearchField from "../../components/search/search";
import { faSearch, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BasicModal from "../../components/modal/basicmodal";
import Checkbox from "@mui/material/Checkbox";
import { Spinner } from "react-bootstrap";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableCell: {
    padding: "10px",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const Notification = () => {
  let navigate = useNavigate();
  let classes = useStyles();
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [previewList, setPreviewList] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  const columns = useMemo(() => [
    {
      id: "notificationDate",
      name: "NOTI. DATE",
      sortable: true,
    },

    {
      id: "financialYear",
      name: "FINANCIAL YEAR",
      sortable: true,
    },

    {
      id: "demandTypeId",
      name: "DEMAND TYPE",
      sortable: true,
    },
    {
      id: "submissionLastDate",
      name: "SUBM. LAST DATE",
      sortable: true,
    },
    {
      id: "instituteType",
      name: "INSTITUTE",
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

  const callApi = async () => {
    await getNotificationService("pagination/calls/notificationList", {
      pageNumber: controller.page,
      pageSize: controller.rowsPerPage,
    })
      .then((r) => {
        setLoading(false);
        setTotalPages(r?.data?.totalPages);
        // setTotalRows(r.data.totalElements);
        setTableData(r.data.content);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      callApi();
    }, 10000);
    return () => {
      clearTimeout();
    };
  }, [controller]);
  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handlePageChange1 = (event, newPage) => {
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };
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
                  <span>{index + 1}. </span> {element?.programmeName}
                </p>
              </>
            );
          })}
      </BasicModal>
    );
  }, [previewList, show, modalTitle]);
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">DEMAND NOTIFICATION DESK</p>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-start">
            <div className="me-3">
              <div className="row g-0">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="storeName">
                    Store Name
                  </label>
                </div>
                <div className="col-6">
                  <SelectOption id="storeName" data={[]} />
                </div>
              </div>
            </div>
            <div className=" col-4">
              <div className="row g-0">
                <div className="col-6 text-center">
                  <label
                    className="labellineHeight"
                    htmlFor="notificationStatus"
                  >
                    Notification Status
                  </label>
                </div>
                <div className="col-4">
                  <SelectOption id="notificationStatus" data={[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <BasicButton
              type="button"
              outlineType={true}
              buttonText="New Notification (HQ)"
              className="primary btn-sm"
              onClick={(e) => {
                navigate("/admin/openNotification");
              }}
            />
            {selected.length > 0 ? (
              <>
                <BasicButton
                  type="button"
                  buttonText="Edit PO"
                  outlineType={true}
                  className="primary btn-sm ms-1"
                  disabled={selected.length > 0 ? null : "disabled"}
                  onClick={(e) => console.log("Selected Data", selectedRow)}
                />
                <BasicButton
                  type="button"
                  buttonText="Edit PO"
                  outlineType={true}
                  className="primary btn-sm ms-1"
                  disabled={selected.length > 0 ? null : "disabled"}
                  onClick={(e) => console.log("Selected Data", selectedRow)}
                />
                <BasicButton
                  type="button"
                  buttonText="Edit PO"
                  outlineType={true}
                  className="primary btn-sm ms-1"
                  disabled={selected.length > 0 ? null : "disabled"}
                  onClick={(e) => console.log("Selected Data", selectedRow)}
                />
                <BasicButton
                  type="button"
                  outlineType={true}
                  buttonText="Edit PO"
                  className="primary btn-sm ms-1"
                  disabled={selected.length > 0 ? null : "disabled"}
                  onClick={(e) => console.log("Selected Data", selectedRow)}
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
        <div className="row mb-1">
          <div className="d-flex justify-content-between">
            <div className="">
              <div className="d-flex">
                <div className={classes.lineHeight}>Show</div>
                <SelectOption
                  className="ms-1 me-1"
                  id="rowsPerChange"
                  data={[
                    { value: 10, selected: true },
                    { value: 20, selected: false },
                    { value: 30, selected: false },
                    { value: 40, selected: false },
                  ]}
                  onChange={(e) => {
                    console.log("Value", e.target.value);
                    if (e.target.value != "None") handleChangeRowsPerPage(e);
                  }}
                />
                <div className={classes.lineHeight}>Entries</div>
              </div>
            </div>
            <SearchField
              iconPosition="end"
              iconName={faSearch}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        {/* Table Rendering */}
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              page={controller.page + 1}
              count={totalPages}
              rowsPerPage={controller.rowsPerPage}
              order={order}
              paginationRequired={true}
              onPageChange={handlePageChange1}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleSorting={handleSortingChange}
              checkBoxRequired={true}
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
                  tableData.map((data, index) => (
                    <TableRow key={data.id}>
                      <TableCell padding="none">
                        <Checkbox
                          onClick={(event) => handleClick(event, index, data)}
                          color="primary"
                          checked={selected.includes(index)}
                          inputProps={{
                            "aria-labelledby": `enhanced-table-checkbox-${index}`,
                          }}
                        />
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {moment(data.notificationDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {data.financialYear}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {data?.demandTypeId?.demandName}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {moment(data?.submissionLastDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {data?.instituteType?.typeName}
                      </TableCell>

                      <TableCell padding="none" className={classes.tableCell}>
                        {data?.programmeList &&
                        data?.programmeList.length > 0 ? (
                          <span
                            className="text-decoration-underline"
                            onClick={() => {
                              setModalTitle("Programme List");
                              setPreviewList(data?.programmeList);
                              setShow(true);
                            }}
                            style={{ fontSize: "0.7rem", cursor: "pointer" }}
                          >
                            VIEW PROGRAMME LIST
                          </span>
                        ) : (
                          "NONE"
                        )}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
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
                      </TableCell>

                      <TableCell padding="none" className={classes.tableCell}>
                        {data?.status === 10
                          ? "	Compiled by HQ"
                          : data?.status === 11
                          ? " 	Closed"
                          : data?.status === 1
                          ? "Active"
                          : data?.status === 3
                          ? "Cancelled"
                          : ""}
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {data?.staus === 10 || data?.status === 11 ? (
                          <FontAwesomeIcon icon={faDownload} />
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </TableComponent>

            {preview()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
