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
  const [showModal, setShowModal] = useState(false);

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
      callApi();
    }
    return () => {
      isApiSubcribed = false;
    };
  }, [controller]);

  const createUserForm = () => {
    return (
      <div className="row">
        <div className="col-10 offset-1">
          <div className="row mb-2 align-items-center">
            <div className="col-2">
              <label htmlFor="userId" class="col-form-label">
                User ID:
              </label>
            </div>
            <div className="col-6">
              <BasicInput type="text" placeholder="Role Name" id="userId" />
            </div>
            <div className="col-4">
              <span class="form-text">Between 2 to 50 characters.</span>
            </div>
          </div>
          <div className="row mb-2 align-items-center">
            <div class="col-2">
              <label htmlFor="firstName" class="col-form-label">
                First Name
              </label>
            </div>
            <div class="col-6">
              <BasicInput type="text" placeholder="First Name" id="firstName" />
            </div>
            <div class="col-4">
              <span class="form-text">Between 2 to 100 characters.</span>
            </div>
          </div>

          <div className="row mb-2 align-items-center">
            <div class="col-2">
              <label htmlFor="lastName" class="col-form-label">
                Last Name
              </label>
            </div>
            <div class="col-6">
              <BasicInput type="text" placeholder="Last Name" id="lastName" />
            </div>
            <div class="col-4">
              <span class="form-text">Between 2 to 100 characters.</span>
            </div>
          </div>

          <div className="row mb-2 align-items-center">
            <div class="col-2">
              <label htmlFor="email" class="col-form-label">
                Email
              </label>
            </div>
            <div class="col-6">
              <BasicInput type="email" placeholder="Email" id="email" />
            </div>
          </div>
          <div className="row mb-2 align-items-center">
            <div class="col-2">
              <label htmlFor="address" className="" class="col-form-label">
                Address
              </label>
            </div>
            <div class="col-6">
              <textarea
                rows="2"
                className="form-control shadow-none"
                cols="50"
              ></textarea>
            </div>
          </div>
          {/* <div className="row mb-2">
            <div className="col-2">
              <label htmlFor="userType" class="col-form-label">
                User Type:
              </label>
            </div>
            <div className="col-6">
              <CustomSelect
                id="userType"
                options={dropDwonRoleList}
                onChange={(choice) => {
                  console.log(choice?.value);
                }}
              />
            </div>
          </div> */}

          <div className="row mb-2">
            <div className="col-2">
              <label htmlFor="city" class="col-form-label">
                City:
              </label>
            </div>
            <div className="col-6">
              <BasicInput type="text" placeholder="City" id="city" />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-2">
              <label htmlFor="storeName" class="col-form-label">
                Store Name:
              </label>
            </div>
            <div className="col-6">
              <CustomSelect
                id="storeName"
                options={dropDownStoreList}
                onChange={(choice) => {
                  console.log(choice?.value);
                }}
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-2">
              <label htmlFor="role" class="col-form-label">
                Role:
              </label>
            </div>
            <div className="col-6">
              <CustomSelect
                id="role"
                options={dropDwonRoleList}
                onChange={(choice) => {
                  console.log(choice?.value);
                }}
              />
            </div>
            <div className="col-4">
              <span class="form-text">
                If Role is not here. Create the Role
              </span>
            </div>
          </div>
          <div className="row  mb-2">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <Basicbutton
                  icon={
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                  }
                  type="button"
                  buttonText="Save"
                  className="btn btn-primary"
                  outlineType={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">USER LIST</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="USER List" />
      </div>
      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Add New User"
              outlineType={true}
              className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
              onClick={() => {
                setDropDownRoleList(roleList);
                setDropDownStoreList(storeList);
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
                {!loading && tableData && (
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

      <BasicModal
        title="Create User"
        show={showModal}
        close={() => {
          setDropDownRoleList([]);
          setDropDownStoreList([]);
          setShowModal(false);
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="create_role"
      >
        {createUserForm()}
      </BasicModal>
      {showActivities()}
    </>
  );
};

export default UserDesk;
