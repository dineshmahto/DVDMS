import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import {
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUserList,
  getUserListResponse,
  userDeleteResponse,
} from "../../../store/admin/action";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { Seo } from "../../../components/seo/seo";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import { useNavigate } from "react-router-dom";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import searchFunc from "../../../components/tables/searchFunc";
import {
  DELETE_MESSAGE_DESCRIPTION,
  INTERNET_CONNECTION_MESSAGE,
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
  SORTINGORDER,
} from "../../../common/constant/constant";
import { useMediaQuery } from "react-responsive";
const CreateUserModalForm = lazy(() => import("./createusermodalform"));
const EditUserModalForm = lazy(() => import("./editusermodalform"));
const UserActivityListModal = lazy(() => import("./useractivitylistmodal"));
const AlertDialog = lazy(() => import("../../../components/dialog/dialog"));
const UserDesk = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const userListResponse = useSelector(
    (state) => state?.admin?.userListResponse
  );
  const deleteUserResponse = useSelector(
    (state) => state?.admin?.deleteResponse
  );
  console.log("userListResponse", userListResponse);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState(SORTINGORDER.ASC);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
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
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
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
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getUserListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (
      userListResponse &&
      userListResponse?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      if (
        userListResponse?.data?.pageList &&
        userListResponse?.data?.pageList?.content
      ) {
        setTotalRows(userListResponse?.data?.pageList?.totalElements);
        setTableData(userListResponse?.data?.pageList?.content);
        setFilterData(userListResponse?.data?.pageList?.content);
        setRoleList(userListResponse?.data?.roleList);
        setStoreList(userListResponse?.data?.storeList);

        setLoading(false);
        dispatch(getUserListResponse(""));
      } else if (
        userListResponse?.data?.status ===
        NETWORK_STATUS_CODE.UNAUTHORIZED_ACCESS
      ) {
        setLoading(false);
        navigate("/");
      }
    } else if (
      userListResponse &&
      userListResponse?.code === NETWORK_STATUS_CODE.NETWORK_ERROR
    ) {
      setLoading(false);
      toastMessage("User Desk", INTERNET_CONNECTION_MESSAGE);
      dispatch(getUserListResponse(""));
    } else if (
      userListResponse &&
      userListResponse?.status == NETWORK_STATUS_CODE.BAD_REQUEST
    ) {
      setLoading(false);
      toastMessage("User Desk", "", "error");
      dispatch(getUserListResponse(""));
    } else if (
      userListResponse &&
      userListResponse?.response?.status == NETWORK_STATUS_CODE.PAGE_NOT_FOUND
    ) {
      setLoading(false);
      dispatch(getUserListResponse(""));
      toastMessage(
        "User Desk",
        "Something went wrong please try after sometime",
        "error"
      );
    }
  }, [userListResponse]);

  useEffect(() => {
    if (
      deleteUserResponse &&
      deleteUserResponse?.status === NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (deleteUserResponse?.data?.status === SERVER_STATUS_CODE.SUCCESS) {
        setShowDeleteDialog(false);
        toastMessage("USER DESK", deleteUserResponse?.data?.message);
        dispatch(
          getUserList({
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
        dispatch(userDeleteResponse(""));
      } else if (
        deleteUserResponse?.data?.status === SERVER_STATUS_CODE.FAILED
      ) {
        setShowDeleteDialog(false);
        toastMessage("USER DESK", deleteUserResponse?.data?.message);
        dispatch(userDeleteResponse(""));
      }
    } else if (
      deleteUserResponse &&
      deleteUserResponse?.status === NETWORK_STATUS_CODE.INTERNAL_ERROR
    ) {
      setShowDeleteDialog(false);
      toastMessage(
        "ROLE DESK",
        "Something went wrong to delete the record Please try again"
      );
    } else if (
      deleteUserResponse &&
      deleteUserResponse?.status === NETWORK_STATUS_CODE.PAGE_NOT_FOUND
    ) {
      setShowDeleteDialog(false);
      toastMessage("USER DESK", deleteUserResponse?.data?.message);
    }
  }, [deleteUserResponse]);

  const handleCloseCreateUserModal = useCallback(() => {
    setShowAddModal(false);
  }, [showAddModal]);
  const handleCloseEditUserModal = useCallback(() => {
    setEditData("");
    setShowEditModal(false);
  }, [showEditModal]);
  const handleCloseActivityListModal = useCallback(() => {
    setShowActivityModal(true);
  }, [showActivityModal]);

  const handleDeleteDialog = () => {
    setDeleteId("");
    setShowDeleteDialog(false);
  };
  const handleDeleteUser = () => {
    dispatch(deleteUser({ userName: deleteId }));
  };
  return (
    <>
      <Seo title="DVDMS | User Desk" description="User Desk" />
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">USER LIST</p>
        </div>
      </div>
      <div className="row mt-1">
        <HorizonatalLine text="User Management Desk" />
      </div>
      <div className="row">
        <div
          className={`d-flex ${
            isSmallScreen ? "flex-column" : "flex-row"
          } justify-content-between`}
        >
          <Basicbutton
            buttonText="Add New User"
            outlineType={true}
            className={`btn btn-outline-primary btn-md rounded-0 mb-2 me-1 mt-2 shadow-sm rounded ${
              isSmallScreen ? "btn-sm" : "btn-md"
            }`}
            onClick={() => {
              setDropDownRoleList(roleList);
              setDropDownStoreList(storeList);
              setShowAddModal(true);
            }}
          />
          <SearchField
            className={`me-1 ${isSmallScreen ? "mb-1" : "mb-0"}`}
            iconPosition="end"
            iconName={faSearch}
            // disabled={tableData.length === 0 ? true : false}
            onChange={(e) => {
              if (e.target?.value != "") {
                console.log(e.target?.value);
                setSearchValue(e?.target?.value);
                console.log("filterData", filterData);
                setTableData(searchFunc(filterData, e.target?.value));
              } else {
                setTableData(filterData);
                setSearchValue("");
              }
            }}
          />
        </div>
      </div>

      <Paper elevation={3} className="mb-1">
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
              caption="User List"
              handleSorting={handleSortingChange}
              checkBoxRequired={false}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  tableData &&
                  tableData.length > 0 &&
                  tableData.map((data, index) => {
                    return (
                      <StyledTableRow key={data?.username}>
                        <StyledTableCell padding="none">
                          {data.username}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data.role}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.store}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.firstName}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.lastName}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.emailId}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.mobileNumber}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.address}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.city}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.type}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          <span
                            className="text-decoration-underline ms-1"
                            style={{
                              fontSize: "0.7rem",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setShowEditModal(true);
                              setEditData(data);
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
                            onClick={() => {
                              setDeleteId(data?.username);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="ms-2"
                              color="red"
                            />
                          </span>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                )}
                <EmptyRow
                  loading={loading}
                  tableData={tableData}
                  searchValue={searchValue}
                />
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
      </Paper>
      {showAddModal && (
        <Suspense>
          <CreateUserModalForm
            openCreateuserModal={showAddModal}
            handleCloseCreateUserModal={handleCloseCreateUserModal}
            roleList={roleList}
            storeList={storeList}
          />
        </Suspense>
      )}

      {showEditModal && (
        <Suspense>
          <EditUserModalForm
            openEdituserModal={showEditModal}
            handleCloseEditUserModal={handleCloseEditUserModal}
            editData={editData}
            roleList={roleList}
            storeList={storeList}
          />
        </Suspense>
      )}

      {showActivityModal && (
        <Suspense>
          <UserActivityListModal
            showActivityModal={showActivityModal}
            handleCloseActivityListModal={handleCloseActivityListModal}
          />
        </Suspense>
      )}

      {showDeleteDialog && (
        <Suspense>
          <AlertDialog
            open={showDeleteDialog}
            handleClose={handleDeleteDialog}
            description={DELETE_MESSAGE_DESCRIPTION}
          >
            <Basicbutton
              buttonText="Disagree"
              onClick={() => setShowDeleteDialog(false)}
            />
            <Basicbutton buttonText="Agree" onClick={handleDeleteUser} />
          </AlertDialog>
        </Suspense>
      )}
    </>
  );
};

export default UserDesk;
