import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
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
  deleteProgramResponse,
  deleteProgrm,
  getProgramDeskList,
  getProgramDeskListResponse,
} from "../../../store/admin/action";
import moment from "moment";
import { Seo } from "../../../components/seo/seo";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import searchFunc from "../../../components/tables/searchFunc";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../../common/constant/constant";
import { useMediaQuery } from "react-responsive";
const CreateProgramDeskForm = lazy(() => import("./createprogram"));
const EditProgramDeskForm = lazy(() => import("./editprogram"));
const AlertDialog = lazy(() => import("../../../components/dialog/dialog"));

const ProgrammeDesk = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const programeDeskListResponse = useSelector(
    (state) => state.admin.programeDeskListResponse
  );
  const deleteProgrmResponse = useSelector(
    (state) => state?.admin?.deletePrgrmResp
  );
  console.log("deleteProgrmResponse", deleteProgrmResponse);
  console.log("programeDeskListResponse", programeDeskListResponse);
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [showCreatProgrmModal, setShowCreateProgrmModal] = useState(false);
  const [showEditProgrmModal, setShowEditProgrmModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editData, setEditData] = useState("");
  const [totalDrugList, setTotalDrugList] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const columns = useMemo(() => [
    {
      id: "id",
      name: "PROGRAM ID",
      sortable: true,
    },

    {
      id: "programmeName",
      name: "PROGRAM NAME",
      sortable: true,
    },
    {
      id: "programmeCode",
      name: "CODE NO",
      sortable: true,
    },
    {
      id: "startDate",
      name: "START DATE",
      sortable: true,
    },
    {
      id: "endDate",
      name: "END DATE",
      sortable: true,
    },
    {
      id: "remarks",
      name: "REMARKS",
      sortable: true,
    },
    {
      id: "status",
      name: "STATUS",
      sortable: true,
    },
    {
      id: "action",
      name: "EDIT / DELETE",
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
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getProgramDeskList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getProgramDeskListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (programeDeskListResponse && programeDeskListResponse?.status === 200) {
      // setTotalRoleList(programeDeskListResponse?.data?.activityList);
      // setActivityList(programeDeskListResponse?.data?.activityTypeList);
      setTotalDrugList(programeDeskListResponse?.data?.drugList);
      setData(programeDeskListResponse?.data?.activityList);

      //setTotalPages(programeDeskListResponse?.data?.pageList?.totalPages);
      setTotalRows(programeDeskListResponse?.data?.pageList?.totalElements);
      setTableData(programeDeskListResponse?.data?.pageList?.content);
      setFilterData(programeDeskListResponse?.data?.pageList?.content);
      setLoading(false);
      dispatch(getProgramDeskListResponse(""));
    } else if (
      programeDeskListResponse &&
      programeDeskListResponse?.status == 400
    ) {
      setLoading(false);

      toastMessage("Program Desk", "", "error");
      dispatch(getProgramDeskListResponse(""));
    } else if (
      programeDeskListResponse &&
      programeDeskListResponse?.code === "ERR_NETWORK"
    ) {
      setLoading(false);
      toastMessage("Program Desk", "Internet Connection Problem");
      dispatch(getProgramDeskListResponse(""));
    } else if (
      programeDeskListResponse &&
      programeDeskListResponse?.response?.status == 500
    ) {
      setLoading(false);
      dispatch(getProgramDeskListResponse(""));
      toastMessage(
        "Program Desk",
        "Something went wrong please try after sometime",
        "error"
      );
    }
  }, [programeDeskListResponse]);

  const handleCloseCreateProgrmModal = () => {
    setShowCreateProgrmModal(false);
  };
  const handleCloseEditProgrmModal = () => {
    setShowEditProgrmModal(false);
  };
  const handleDeleteDialog = () => {
    setDeleteId("");
    setShowDeleteDialog(false);
  };

  const badge = (badgeValue) => {
    if (badgeValue === 1) {
      return <span class="badge rounded-pill bg-primary">Active</span>;
    }
  };

  const handleDeleteProgram = () => {
    dispatch(deleteProgrm({ id: deleteId }));
  };

  useEffect(() => {
    if (
      deleteProgrmResponse &&
      deleteProgrmResponse?.status === NETWORK_STATUS_CODE?.CREATED_SUCCESSFULLY
    ) {
      if (deleteProgrmResponse?.data?.status === SERVER_STATUS_CODE?.SUCCESS) {
        setShowDeleteDialog(false);
        setController({
          ...controller,
          rowsPerPage: controller.rowsPerPage,
          page: 0,
        });
        dispatch(
          getProgramDeskList({
            pageNumber: controller?.page,
            pageSize: controller.rowsPerPage,
          })
        );
        dispatch(deleteProgramResponse(""));
        toastMessage(
          "DELETE PROGRAM",
          deleteProgrmResponse?.data?.message,
          "success"
        );
      } else if (
        deleteProgrmResponse?.data?.status === SERVER_STATUS_CODE?.FAILED
      ) {
        setShowDeleteDialog(false);

        toastMessage(
          "DELETE PROGRAM",
          deleteProgrmResponse?.data?.message,
          "error"
        );
        dispatch(deleteProgramResponse(""));
      }
    } else if (
      deleteProgrmResponse &&
      deleteProgrmResponse?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      setShowDeleteDialog(false);
      toastMessage("DELETE PROGRAM", "Something Went wrong", "error");
      dispatch(deleteProgramResponse(""));
    }
  }, [deleteProgrmResponse]);

  return (
    <>
      <Seo title="DVDMS | Programe Desk" description="Programe Desk" />
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">PROGRAM DESK</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Program Management Desk" />
      </div>

      <div className="row ">
        <div
          className={`d-flex ${
            isSmallScreen ? "flex-column" : "flex-row"
          } justify-content-between`}
        >
          <Basicbutton
            buttonText="Add New Program"
            outlineType={true}
            className={`btn btn-outline-primary ${
              isSmallScreen ? "btn-sm" : "btn-md"
            } rounded-0 mb-2 me-1 mt-2 shadow-sm rounded`}
            onClick={() => {
              setShowCreateProgrmModal(true);
            }}
          />
          <SearchField
            className={`me-1 ${isSmallScreen ? "mb-1" : "mb-0"} mt-1`}
            iconPosition="end"
            iconName={faSearch}
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
      <Paper elevation={3} className="mb-2">
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
              handleSorting={handleSortingChange}
              checkBoxRequired={false}
              caption="Programme List"
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  tableData &&
                  tableData.length > 0 &&
                  tableData.map((data, index) => {
                    return (
                      <StyledTableRow>
                        {columns.map((d, k) => {
                          if (d.id === "action") {
                            return (
                              <StyledTableCell>
                                <span
                                  className="text-center text-decoration-underline ms-1"
                                  onClick={() => {
                                    setShowEditProgrmModal(true);
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
                                    fontSize: "0.8rem",
                                    cursor: "pointer",
                                  }}
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
                            );
                          } else if (
                            d.id === "startDate" ||
                            d.id === "endDate"
                          ) {
                            return (
                              <StyledTableCell key={k} padding="none">
                                {moment(data[d.id]).format("DD/MM/YYYY")}
                              </StyledTableCell>
                            );
                          } else if (d.id === "status") {
                            return (
                              <StyledTableCell key={k} padding="none">
                                {badge(data[d.id])}
                              </StyledTableCell>
                            );
                          } else {
                            return (
                              <StyledTableCell key={k} padding="none">
                                {data[d.id]}
                              </StyledTableCell>
                            );
                          }
                        })}
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

      {showCreatProgrmModal && (
        <Suspense>
          <CreateProgramDeskForm
            openCreateProgrmModal={showCreatProgrmModal}
            handleCloseCreateProgrmModal={handleCloseCreateProgrmModal}
            totalDrugList={totalDrugList}
          />
        </Suspense>
      )}

      {showEditProgrmModal && (
        <Suspense>
          <EditProgramDeskForm
            openEditProgrmModal={showEditProgrmModal}
            handleCloseEditProgrmModal={handleCloseEditProgrmModal}
            editData={editData}
            totalDrugList={totalDrugList}
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
            <Basicbutton buttonText="Agree" onClick={handleDeleteProgram} />
          </AlertDialog>
        </Suspense>
      )}
    </>
  );
};

export default ProgrammeDesk;
