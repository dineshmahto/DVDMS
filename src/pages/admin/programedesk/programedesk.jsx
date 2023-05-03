import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
  lazy,
  Suspense,
} from "react";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { Spinner } from "react-bootstrap";
import {
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { useDispatch, useSelector } from "react-redux";
import {
  getProgramDeskList,
  getProgramDeskListResponse,
} from "../../../store/admin/action";
import moment from "moment";
import { Seo } from "../../../components/seo/seo";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";

const CreateProgramDeskForm = lazy(() => import("./createprogram"));
const EditProgramDeskForm = lazy(() => import("./editprogram"));
const AlertDialog = lazy(() => import("../../../components/dialog/dialog"));
const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const ProgrammeDesk = () => {
  const programeDeskListResponse = useSelector(
    (state) => state.admin.programeDeskListResponse
  );
  console.log("programeDeskListResponse", programeDeskListResponse);
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
  const [data, setData] = useState([]);

  const [showCreatProgrmModal, setShowCreateProgrmModal] = useState(false);
  const [showEditProgrmModal, setShowEditProgrmModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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
      setData(programeDeskListResponse?.data?.activityList);
      setTotalPages(programeDeskListResponse?.data?.pageList?.totalPages);
      setTotalRows(programeDeskListResponse?.data?.pageList?.totalElements);
      setTableData(programeDeskListResponse?.data?.pageList?.content);
      setLoading(false);
      dispatch(getProgramDeskListResponse(""));
    } else if (
      programeDeskListResponse &&
      programeDeskListResponse?.status == 400
    ) {
      setLoading(false);

      toastMessage("Program Desk", "", "error");
      dispatch(getProgramDeskListResponse(""));
    }
  }, [programeDeskListResponse]);

  const handleCloseCreateProgrmModal = () => {
    setShowCreateProgrmModal(false);
  };
  const handleCloseEditProgrmModal = () => {
    setShowEditProgrmModal(false);
  };
  const handleDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const badge = (badgeValue) => {
    if (badgeValue === 1) {
      return <span class="badge rounded-pill bg-primary">Active</span>;
    }
  };

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
      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Add New Program"
              outlineType={true}
              className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
              onClick={() => {
                setShowCreateProgrmModal(true);
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
                  <StyledTableRow>
                    <TableCell className="text-center" colSpan={12}>
                      <Spinner />
                    </TableCell>
                  </StyledTableRow>
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
                                  className={[
                                    classes.tableCell,
                                    "text-center text-decoration-underline ms-1",
                                  ]}
                                  onClick={() => setShowEditProgrmModal(true)}
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
                                  onClick={() => setShowDeleteDialog(true)}
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
                {!loading && tableData && tableData.length === 0 && (
                  <StyledTableRow>
                    <StyledTableCell className="text-center" colSpan={12}>
                      <p style={{ fontSize: "0.8rem" }}>
                        NO DATA AVAILABE IN TABLE
                      </p>
                    </StyledTableCell>
                  </StyledTableRow>
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
        <CreateProgramDeskForm
          openCreateProgrmModal={showCreatProgrmModal}
          handleCloseCreateProgrmModal={handleCloseCreateProgrmModal}
        />
      </Suspense>
      <Suspense>
        <EditProgramDeskForm
          openEditProgrmModal={showEditProgrmModal}
          handleCloseEditProgrmModal={handleCloseEditProgrmModal}
        />
      </Suspense>
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
          <Basicbutton buttonText="Agree" />
        </AlertDialog>
      </Suspense>
    </>
  );
};

export default ProgrammeDesk;
