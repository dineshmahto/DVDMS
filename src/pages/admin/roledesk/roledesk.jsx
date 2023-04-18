import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { Spinner } from "react-bootstrap";
import {
  faFloppyDisk,
  faList,
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";

import { getAdminService } from "../../../services/adminservice/adminservice";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import * as CONSTANTS from "../../../common/constant/constants";
import CreateRoleModalForm from "./createrolemodalform";
import EditRoleModal from "./editrolemodalform";
import RoleActivityListModal from "./roleactivitylistmodal";
import { useDispatch } from "react-redux";
import { deleteRole } from "../../../store/admin/action";
import API from "../../../config/config";
const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const RoleDesk = () => {
  const dispatch = useDispatch();
  const showActivitityTooltipRef = useRef();
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [sortedData, handleSorting] = useSortableTable();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [activityList, setActivityList] = useState([]);
  const [dropDownList, setDropDownList] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const [data, setData] = useState([]);
  const columns = useMemo(() => [
    {
      id: "id",
      name: "ROLE ID",
      sortable: true,
    },

    {
      id: "name",
      name: "ROLE NAME",
      sortable: true,
    },
    {
      id: "remark",
      name: "ROLE DESCRIPTION",
      sortable: true,
    },
    {
      id: "activities",
      name: "ACTIVITIES",
      sortable: false,
    },
  ]);

  // edit role modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [totalRoleList, setTotalRoleList] = useState([]);
  const [currentRoleList, setCurrentRoleList] = useState([]);
  const [availableRoleList, setAvailableRoleList] = useState([]);

  const data1 = [
    {
      id: 1,
      name: "Demand Notification (HQ)",
    },
    {
      id: 2,
      name: "Annual Demand (Sub Stores)",
    },
    {
      id: 13,
      name: "PO Appoval /Cancel(Head of Ins.)",
    },
    {
      id: 62,
      name: "Receive of Drugs (Indent/Transfer)",
    },
    {
      id: 63,
      name: "Receive Challan",
    },
    {
      id: 64,
      name: "Verify Challan",
    },
    {
      id: 67,
      name: "Accept Challan",
    },
    {
      id: 72,
      name: "Add Renew Delete Rate Contract",
    },
    {
      id: 74,
      name: "Add Edit Delete Supplier",
    },
    {
      id: 11,
      name: "Create/Cancel PO",
    },
    {
      id: 82,
      name: "Add Edit Delete User(HQ/DWH Admin)",
    },
    {
      id: 101,
      name: "Application Configuration (HQ)",
    },
    {
      id: 105,
      name: "Stock Drug Verification",
    },
    {
      id: 106,
      name: "Drug Condemnation Register",
    },
    {
      id: 131,
      name: "Transfer Request for Shortage",
    },
    {
      id: 132,
      name: "Transfer Request for Excess",
    },
    {
      id: 134,
      name: "Transfer of Drugs (Indent, Excess, Shortage)",
    },
    {
      id: 142,
      name: "Transfer Approval by HQ",
    },
    {
      id: 161,
      name: "Add  Edit Delete Store (HQ/DWH Admin)",
    },
    {
      id: 141,
      name: "Transfer/Indent Approval By Institute",
    },
    {
      id: 4,
      name: "Compile and freeze Annual Demand(HQ)",
    },
    {
      id: 6,
      name: "Compile and Freeze Supplementary Demand (HQ)",
    },
    {
      id: 12,
      name: "List PO",
    },
    {
      id: 50,
      name: "Issue and Return of Drugs",
    },
    {
      id: 58,
      name: "Generate and Modify Indent",
    },
    {
      id: 59,
      name: "View Indent",
    },
    {
      id: 71,
      name: "Rate Contract List",
    },
    {
      id: 73,
      name: "Add, Edit, Delete Drug (HQ)",
    },
    {
      id: 81,
      name: "List User",
    },
    {
      id: 85,
      name: "Add Edit Delete Role(HQ/DWH Admin)",
    },
    {
      id: 102,
      name: "Upload Stock (from a file)",
    },
    {
      id: 103,
      name: "Update Stock of PO",
    },
    {
      id: 104,
      name: "Stock Entry of Miscellaneous",
    },
    {
      id: 121,
      name: "Add Edit Delete Program (HQ)",
    },
    {
      id: 122,
      name: "Program Funding Desk (HQ)",
    },
    {
      id: 123,
      name: "Budget Allocation (HQ)",
    },
    {
      id: 140,
      name: "Approval Desk (Head of Institute)",
    },
    {
      id: 150,
      name: "List Programme Funding Source",
    },
    {
      id: 201,
      name: "Supplier Payment",
    },
    {
      id: 173,
      name: "Alert/SMS Configuration Desk (HQ)",
    },
    {
      id: 172,
      name: "Drug Configuration Desk (HQ)",
    },
    {
      id: 171,
      name: "PO Configuration Desk",
    },
    {
      id: 154,
      name: "Budget Interface (HQ)",
    },
    {
      id: 153,
      name: "Store Programme Drug Mapping (HQ)",
    },
    {
      id: 152,
      name: "Store Type Wise Drug Mapping (HQ)",
    },
    {
      id: 151,
      name: "Program Funding Mapping (HQ)",
    },
    {
      id: 3,
      name: "Supplementary Demand (Sub Stores)",
    },
    {
      id: 7,
      name: "Compile Annual Demand (DWH/Block)",
    },
    {
      id: 14,
      name: "Create Local Purchase",
    },
    {
      id: 68,
      name: "Update Challan",
    },
    {
      id: 999,
      name: "Global",
    },
    {
      id: 95,
      name: "Lock Unlcok user",
    },
  ];
  const handlePageChange = (newPage) => {
    console.log("newPage", newPage);
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (current, pageSize) => {
    console.log(current, pageSize);
    setController({
      ...controller,
      rowsPerPage: pageSize,
      page: 0,
    });
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    console.log("tableData", tableData);
    handleSorting(accessor, sortOrder, tableData);
    console.log("sortedData", sortedData);
    setTableData(sortedData);
  };

  const fetchApi = async (signal) => {
    await API.get(CONSTANTS.ROLE_LISTING, {
      pageNumber: controller.page,
      pageSize: controller.rowsPerPage,
    })
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request canceled", error.message);
        } else {
          if (error.response) {
            console.log("Response", error.response);
          } else if (error.request) {
            console.log("Error Request", error.request);
          } else {
            console.log("Error", error.message);
          }
        }
      });
  };

  const callApi = async () => {
    await getAdminService(CONSTANTS.ROLE_LISTING, {
      pageNumber: controller.page,
      pageSize: controller.rowsPerPage,
    })
      .then((r) => {
        console.log(r?.data);
        console.log(r?.data?.content);
        setTotalRoleList(r?.data?.activityList);
        setActivityList(r?.data?.activityTypeList);
        setData(r?.data?.activityList);
        setTotalPages(r?.data?.totalPages);
        setTotalRows(r?.data?.totalElements);
        setTableData(r?.data?.content);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        toastMessage("Role List", "Server can't respon", "error");
        console.log("Error", e);
      });
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      callApi();
    }
    return () => {
      isApiSubcribed = false;
    };
  }, [controller]);

  // const callActivityListApiByCode = async (code) => {
  //   await getAdminService(`admin/getActivityListByType/${code}`)
  //     .then((r) => {
  //       console.log("typeCodeResponse", r?.data);
  //       console.log(r?.data?.data);
  //       setSelectedItem([]);
  //       setRightTempArray([]);
  //       setFirstClick(false);
  //       setSelectedItemActiveIndices([]);
  //       setTempArray([]);
  //       setActiveIndicies(r?.data?.data?.map(() => false));
  //       setTransferableRoleList(r?.data?.data);
  //       setCopyData(r?.data?.data);
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       toastMessage("Activity List Code", "Server can't respon", "error");
  //       console.log("Error", e);
  //     });
  // };

  const handleCloseCreateRoleModal = () => {
    setShowModal(false);
  };
  const handleCloseEditRoleModal = () => {
    setShowEditModal(false);
  };
  const handleActivityShowModal = () => {
    setShowActivityModal(false);
  };

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">ROLE LIST</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Role List" />
      </div>
      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Add New Role"
              outlineType={true}
              className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
              onClick={() => {
                dispatch(deleteRole(1));
                // setDropDownList(activityList);
                setShowModal(true);
              }}
            />
          </div>
        </div>
        <div className="row mb-1">
          <div className="d-flex justify-content-end">
            <SearchField
              className="me-1 "
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
              page={controller.page + 1}
              count={totalRows}
              rowsPerPage={controller.rowsPerPage}
              order={order}
              paginationRequired={true}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
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
                  tableData.length > 0 &&
                  tableData.map((data, index) => {
                    return (
                      <TableRow key={data.id}>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data.id}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data.name}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.remark}
                        </TableCell>

                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.activityList &&
                          data?.activityList.length > 0 ? (
                            <>
                              <span
                                className="text-decoration-underline me-2"
                                onClick={() => {
                                  console.log("clicked");
                                  setActivityList(data?.activityList);
                                  setShowActivityModal(true);
                                }}
                                style={{
                                  fontSize: "0.8rem",
                                  cursor: "pointer",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faList}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="SHOW ACTIVITIES"
                                />
                              </span>
                              <span className="m-1"> |</span>
                            </>
                          ) : (
                            ""
                          )}

                          <span
                            className="text-decoration-underline ms-1"
                            style={{ fontSize: "0.8rem", cursor: "pointer" }}
                            onClick={() => {
                              let list = [];
                              data?.activityList.forEach((element) => {
                                let ele = {};
                                ele["id"] = element?.id;
                                ele["name"] = element?.activityName;
                                list.push(ele);
                              });
                              console.log("list", list);
                              setCurrentRoleList(list);

                              const availableRoleLists = [
                                ...totalRoleList,
                              ]?.filter((elem) => {
                                return !list?.find((ele) => {
                                  return ele.id === elem.id;
                                });
                              });
                              setAvailableRoleList(availableRoleLists);

                              setShowEditModal(true);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="me-2"
                            />
                          </span>
                          <span className="m-1"> |</span>

                          <span
                            className="text-decoration-underline"
                            style={{ fontSize: "0.8rem", cursor: "pointer" }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="ms-2"
                              color="red"
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
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
      <CreateRoleModalForm
        openCreateRoleModal={showModal}
        handleCloseCreateRoleModal={handleCloseCreateRoleModal}
        data={data1}
      />
      <EditRoleModal
        openEditRoleModal={showEditModal}
        handleCloseEditRoleModal={handleCloseEditRoleModal}
        data={data1}
      />
      <RoleActivityListModal
        showActivityModal={showActivityModal}
        handleActivityShowModal={handleActivityShowModal}
      />
    </>
  );
};

export default RoleDesk;
