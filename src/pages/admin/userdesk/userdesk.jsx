import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import Basicbutton from "../../../components/button/basicbutton";
import BasicModal from "../../../components/modal/basicmodal";
import SearchField from "../../../components/search/search";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import { Spinner } from "react-bootstrap";
import {
  faFloppyDisk,
  faList,
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "../../../components/select/customSelect";
import { getAdminService } from "../../../services/adminservice/adminservice";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import * as CONSTANTS from "../../../common/constant/constants";
import { Seo } from "../../../components/seo/seo";
import CreateUserModalForm from "./createusermodalform";
import EditUserModalForm from "./editusermodalform";
import UserActivityListModal from "./useractivitylistmodal";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../store/admin/action";

const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const UserDesk = () => {
  const userListResponse = useSelector((state) => state.admin.userListResponse);
  console.log("userListResponse", userListResponse);
  const dispatch = useDispatch();
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [activityList, setActivityList] = useState([]);
  const [activityType, setActivityType] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [dropDwonRoleList, setDropDownRoleList] = useState([]);
  const [dropDownStoreList, setDropDownStoreList] = useState([]);
  const columns = useMemo(() => [
    {
      id: "username",
      name: "UserName",
      sortable: true,
    },

    {
      id: "role",
      name: "Role",
      sortable: true,
    },
    {
      id: "store",
      name: "Store",
      sortable: true,
    },
    {
      id: "firstName",
      name: "First Name",
      sortable: true,
    },
    {
      id: "lastName",
      name: "Last Name",
      sortable: true,
    },
    {
      id: "emailId",
      name: "Email-ID",
      sortable: true,
    },
    {
      id: "mobileNumber",
      name: "Contact No",
      sortable: true,
    },
    {
      id: "address",
      name: "Address",
      sortable: true,
    },
    {
      id: "city",
      name: "City",
      sortable: true,
    },
    {
      id: "type",
      name: "Type",
      sortable: true,
    },
    {
      id: "Action",
      name: "Edit / Delete",
      sortable: false,
    },
  ]);

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
              ?.toString()
              ?.localeCompare(b[sortField]?.toString(), "en", {
                numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
          );
        });

        setTableData(sorted);
      }
    },
    [sortField, order, tableData]
  );

  const callApi = async () => {
    await getAdminService(CONSTANTS.USER_LISTING, null)
      .then((r) => {
        console.log(r);
        // console.log(r?.data?.content);
        setTotalPages(r?.data?.totalPages);
        setTotalRows(r?.data?.totalElements);
        setTableData(r?.data?.content);
        setRoleList(r?.data?.roleList);
        setStoreList(r?.data?.storeList);
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
      dispatch(
        getUserList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
      //callApi();
    }
    return () => {
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (userListResponse && userListResponse?.status === 200) {
      setTotalPages(userListResponse?.data?.totalPages);
      setTotalRows(userListResponse?.data?.totalElements);
      setTableData(userListResponse?.data?.content);
      setRoleList(userListResponse?.data?.roleList);
      setStoreList(userListResponse?.data?.storeList);

      setLoading(false);
    } else if (userListResponse && userListResponse?.status == 400) {
      setLoading(false);
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [userListResponse]);

  useEffect(() => {});

  const showActivities = () => {
    return (
      <BasicModal
        title="List of Activities"
        show={showActivityModal}
        close={() => setShowActivityModal(false)}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        key="list_Activity"
      >
        {activityList &&
          activityList.length > 0 &&
          activityList.map((element, index) => {
            return (
              <>
                <p key={index}>
                  {" "}
                  <span>{index + 1}. </span> {element?.activityName}
                </p>
              </>
            );
          })}
      </BasicModal>
    );
  };
  const handleCloseCreateUserModal = useCallback(() => {
    setShowAddModal(false);
  }, [showAddModal]);
  const handleCloseEditUserModal = useCallback(() => {
    setShowEditModal(false);
  }, [showEditModal]);
  const handleCloseActivityListModal = useCallback(() => {
    setShowActivityModal(true);
  }, [showActivityModal]);
  return (
    <>
      <Seo title="DVDMS | User Desk" description="User Desk" />
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">USER LIST</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="USER List" />
      </div>
      <Paper>
        <div className="row">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Add New User"
              outlineType={true}
              className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
              onClick={() => {
                setDropDownRoleList(roleList);
                setDropDownStoreList(storeList);
                setShowAddModal(true);
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
                          {data.username}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data.role}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.store}
                        </TableCell>

                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.firstName}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.lastName}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.emailId}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.mobileNumber}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.address}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.city}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.type}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          <span
                            className="text-decoration-underline ms-1"
                            style={{
                              fontSize: "0.7rem",
                              cursor: "pointer",
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
                            style={{
                              fontSize: "0.7rem",
                              cursor: "pointer",
                            }}
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
                {!loading && tableData.length == 0 && (
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
      <CreateUserModalForm
        openCreateuserModal={showAddModal}
        handleCloseCreateUserModal={handleCloseCreateUserModal}
      />
      <EditUserModalForm
        openEdituserModal={showEditModal}
        handleCloseEditUserModal={handleCloseEditUserModal}
      />
      <UserActivityListModal
        showActivityModal={showActivityModal}
        handleCloseActivityListModal={handleCloseActivityListModal}
      />
    </>
  );
};

export default UserDesk;
