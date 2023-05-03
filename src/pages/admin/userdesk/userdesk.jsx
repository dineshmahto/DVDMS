import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { Spinner } from "react-bootstrap";
import {
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, getUserListResponse } from "../../../store/admin/action";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { Seo } from "../../../components/seo/seo";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";

const CreateUserModalForm = lazy(() => import("./createusermodalform"));
const EditUserModalForm = lazy(() => import("./editusermodalform"));
const UserActivityListModal = lazy(() => import("./useractivitylistmodal"));

const UserDesk = () => {
  const userListResponse = useSelector((state) => state.admin.userListResponse);
  console.log("userListResponse", userListResponse);
  const dispatch = useDispatch();
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

  const handlePageChange = useCallback(
    (newPage) => {
      setLoading(true);
      setController({
        ...controller,
        page: newPage - 1,
      });
    },
    [controller]
  );
  const handleChangeRowsPerPage = (e) => {
    setController({
      ...controller,
      rowsPerPage: e,
      page: 0,
    });
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
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
    if (userListResponse && userListResponse?.status === 200) {
      setTotalPages(userListResponse?.data?.pageList.totalPages);
      setTotalRows(userListResponse?.data?.pageList.totalElements);
      setTableData(userListResponse?.data?.pageList.content);
      setRoleList(userListResponse?.data?.roleList);
      setStoreList(userListResponse?.data?.storeList);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      dispatch(getUserListResponse(""));
    } else if (userListResponse && userListResponse?.status == 400) {
      setLoading(false);
      toastMessage("User Desk", "", "error");
      dispatch(getUserListResponse(""));
    }
  }, [userListResponse]);

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

      <div className="row">
        <div className="d-flex flex-row justify-content-between">
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

      <Paper>
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
                      <StyledTableRow key={data.id}>
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
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                )}
                {!loading && tableData.length == 0 && (
                  <TableRow>
                    <StyledTableCell colSpan={12}>
                      <p style={{ fontSize: "0.8rem" }}>
                        NO DATA AVAILABE IN TABLE
                      </p>
                    </StyledTableCell>
                  </TableRow>
                )}
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
      <Suspense>
        <CreateUserModalForm
          openCreateuserModal={showAddModal}
          handleCloseCreateUserModal={handleCloseCreateUserModal}
        />
      </Suspense>
      <Suspense>
        <EditUserModalForm
          openEdituserModal={showEditModal}
          handleCloseEditUserModal={handleCloseEditUserModal}
        />
      </Suspense>
      <Suspense>
        <UserActivityListModal
          showActivityModal={showActivityModal}
          handleCloseActivityListModal={handleCloseActivityListModal}
        />
      </Suspense>
    </>
  );
};

export default UserDesk;
