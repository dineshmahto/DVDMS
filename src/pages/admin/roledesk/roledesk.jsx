import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
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
} from "../../../store/admin/action";
import { useSelector } from "react-redux";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";

const CreateRoleModalForm = lazy(() => import("./createrolemodalform"));
const EditRoleModal = lazy(() => import("./editrolemodalform"));
const RoleActivityListModal = lazy(() => import("./roleactivitylistmodal"));

const RoleDesk = () => {
  const roleListResponse = useSelector((state) => state.admin.roleListResponse);
  console.log("roleListResponse", roleListResponse);
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
      <div className="row ">
        <div className="d-flex flex-row justify-content-between">
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
          <SearchField
            className="me-1 "
            iconPosition="end"
            onChange={(e) => {
              console.log(e);
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
          </div>
        </div>
      </Paper>
      <Suspense>
        <CreateRoleModalForm
          openCreateRoleModal={showModal}
          handleCloseCreateRoleModal={handleCloseCreateRoleModal}
          data={data}
          activityList={activityList}
        />
      </Suspense>
      <Suspense>
        <EditRoleModal
          openEditRoleModal={showEditModal}
          handleCloseEditRoleModal={handleCloseEditRoleModal}
          data={data}
        />
      </Suspense>
      <Suspense>
        <RoleActivityListModal
          showActivityModal={showActivityModal}
          handleActivityShowModal={handleActivityShowModal}
          activityList={activityList}
        />
      </Suspense>
    </>
  );
};

export default RoleDesk;
