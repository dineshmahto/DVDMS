import React, {
  useState,
  useMemo,
  useEffect,
  lazy,
  Suspense,
  useTransition,
} from "react";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import {
  faList,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { useDispatch } from "react-redux";
import {
  deleteRole,
  getRoleList,
  getRoleListResponse,
  roleDeleteResponse,
} from "../../../store/admin/action";
import { useSelector } from "react-redux";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import searchFunc from "../../../components/tables/searchFunc";
const CreateRoleModalForm = lazy(() => import("./createrolemodalform"));
const EditRoleModal = lazy(() => import("./editrolemodalform"));
const RoleActivityListModal = lazy(() => import("./roleactivitylistmodal"));
const AlertDialog = lazy(() => import("../../../components/dialog/dialog"));
const RoleDesk = () => {
  const roleListResponse = useSelector((state) => state.admin.roleListResponse);
  const deleteRoleResponse = useSelector(
    (state) => state?.admin?.deleteResponse
  );
  console.log("roleListResponse", roleListResponse);
  console.log("deleteRoleResponse", deleteRoleResponse);
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [activityList, setActivityList] = useState([]);
  const [dropDownList, setDropDownList] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [modalHeaderData, setModalHeaderData] = useState({});
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
  const [roleList, setRoleList] = useState([]);
  const [currentRoleList, setCurrentRoleList] = useState([]);
  const [availableRoleList, setAvailableRoleList] = useState([]);

  const [, startTransition] = useTransition();

  const [load, setLoad] = useState(false);

  const handlePageChange = (newPage) => {
    console.log("newPage", newPage);
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
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getRoleList({
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 500);
    }
    return () => {
      isApiSubcribed = false;
      clearTimeout();
      dispatch(getRoleListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (roleListResponse && roleListResponse?.status === 200) {
      if (
        roleListResponse?.data?.pageList?.content &&
        roleListResponse?.data?.pageList?.content.length > 0
      ) {
        setTotalRoleList(roleListResponse?.data?.activityList);
        setActivityList(roleListResponse?.data?.activityTypeList);
        setData(roleListResponse?.data?.activityList);
        setTotalPages(roleListResponse?.data?.pageList?.totalPages);
        setTotalRows(roleListResponse?.data?.pageList?.totalElements);
        setTableData(roleListResponse?.data?.pageList?.content);
        setFilterData(roleListResponse?.data?.pageList?.content);
      }
      setLoading(false);
      dispatch(getRoleListResponse(""));
    } else if (roleListResponse && roleListResponse?.status == 400) {
      setLoading(false);
      toastMessage("Role Desk", "Please Try Again", "error");
      dispatch(getRoleListResponse(""));
    } else if (roleListResponse && roleListResponse?.code === "ERR_NETWORK") {
      setLoading(false);
      toastMessage("Role List", "Internet Connection Problem");
      dispatch(getRoleListResponse(""));
    } else if (roleListResponse && roleListResponse?.response?.status == 500) {
      setLoading(false);
      dispatch(getRoleListResponse(""));
      toastMessage(
        "Role Desk",
        "Something went wrong please try after sometime",
        "error"
      );
    }
  }, [roleListResponse]);

  useEffect(() => {
    if (deleteRoleResponse && deleteRoleResponse?.status === 201) {
      if (deleteRoleResponse?.data?.status === 1) {
        setShowDeleteDialog(false);
        toastMessage("ROLE DESK", deleteRoleResponse?.data?.message);
        dispatch(
          getRoleList({
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
        dispatch(roleDeleteResponse(""));
      }
    } else if (deleteRoleResponse && deleteRoleResponse?.status === 500) {
      setShowDeleteDialog(false);
      toastMessage(
        "ROLE DESK",
        "Something went wrong to delete the record Please try again"
      );
    }
  }, [deleteRoleResponse]);

  const handleCloseCreateRoleModal = () => {
    setShowModal(false);
  };
  const handleCloseEditRoleModal = () => {
    setCurrentRoleList([]);
    setAvailableRoleList([]);
    setShowEditModal(false);
  };
  const handleActivityShowModal = () => {
    setShowActivityModal(false);
  };

  const handleDeleteDialog = () => {
    setDeleteId("");
    setShowDeleteDialog(false);
  };
  const handleDeleteRole = () => {
    dispatch(deleteRole({ id: deleteId }));
  };
  const resetPageDetails = () => {
    setController({
      page: 0,
      rowsPerPage: 10,
    });
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
      <div className="row ">
        <div className="d-flex flex-row justify-content-between">
          <Basicbutton
            buttonText="Add New Role"
            outlineType={true}
            className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
            onClick={() => {
              startTransition(() => {
                setShowModal(true);
              });
            }}
          />
          <SearchField
            className="me-1 "
            iconPosition="end"
            disabled={tableData.length === 0 ? true : false}
            onChange={(e) => {
              if (e.target?.value != "") {
                setSearchValue(e?.target?.value);
                setTableData(searchFunc(filterData, e.target?.value));
              } else {
                setTableData(filterData);
                setSearchValue("");
              }
            }}
          />
        </div>
      </div>
      <Paper elevation={2} className="mb-2">
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
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
                      <StyledTableRow key={data.id}>
                        <StyledTableCell padding="none">
                          {data.id}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data.name}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.remark}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.activityList &&
                          data?.activityList.length > 0 ? (
                            <>
                              <span
                                className="text-decoration-underline me-2"
                                onClick={() => {
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
                              setModalHeaderData(data);
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
                            onClick={() => {
                              setDeleteId(data?.id);
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
      {showModal && (
        <Suspense>
          <CreateRoleModalForm
            openCreateRoleModal={showModal}
            handleCloseCreateRoleModal={handleCloseCreateRoleModal}
            data={data}
            activityList={activityList}
          />
        </Suspense>
      )}

      {showEditModal && (
        <Suspense>
          <EditRoleModal
            openEditRoleModal={showEditModal}
            handleCloseEditRoleModal={handleCloseEditRoleModal}
            currentRoleList={currentRoleList}
            availableRoleList={availableRoleList}
            totalActivitList={totalRoleList}
            modalHeaderData={modalHeaderData}
            resetPageDetails={resetPageDetails}
          />
        </Suspense>
      )}

      {showActivityModal && (
        <Suspense>
          <RoleActivityListModal
            showActivityModal={showActivityModal}
            handleActivityShowModal={handleActivityShowModal}
            activityList={activityList}
          />
        </Suspense>
      )}

      {showDeleteDialog && (
        <Suspense>
          <AlertDialog
            open={showDeleteDialog}
            handleClose={handleDeleteDialog}
            description="You are about to delete one record, this procedure is irreversible.
Do you want to proceed?"
          >
            <Basicbutton
              buttonText="Disagree"
              onClick={() => setShowDeleteDialog(false)}
            />
            <Basicbutton buttonText="Agree" onClick={handleDeleteRole} />
          </AlertDialog>
        </Suspense>
      )}
    </>
  );
};

export default RoleDesk;
