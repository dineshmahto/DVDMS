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
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { useDispatch, useSelector } from "react-redux";
import { getProgramDeskList } from "../../../store/admin/action";
import moment from "moment";
import { Seo } from "../../../components/seo/seo";
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
  const [showModal, setShowModal] = useState(false);

  const [activityList, setActivityList] = useState([]);
  const [dropDownList, setDropDownList] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const [data, setData] = useState([]);
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
    };
  }, [controller]);

  useEffect(() => {
    if (programeDeskListResponse && programeDeskListResponse?.status === 201) {
      setTotalRoleList(programeDeskListResponse?.data?.activityList);
      setActivityList(programeDeskListResponse?.data?.activityTypeList);
      setData(programeDeskListResponse?.data?.activityList);
      setTotalPages(programeDeskListResponse?.data?.totalPages);
      setTotalRows(programeDeskListResponse?.data?.totalElements);
      setTableData(programeDeskListResponse?.data?.content);
      setLoading(false);
    } else if (
      programeDeskListResponse &&
      programeDeskListResponse?.status == 400
    ) {
      setLoading(false);
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [programeDeskListResponse]);

  const handleCloseCreateRoleModal = () => {
    setShowModal(false);
  };
  const handleCloseEditRoleModal = () => {
    setShowEditModal(false);
  };
  const handleActivityShowModal = () => {
    setShowActivityModal(false);
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
                      <TableRow hover>
                        {columns.map((d, k) => {
                          if (d.id === "action") {
                            return (
                              <TableCell>
                                <span
                                  className="text-decoration-underline ms-1"
                                  style={{
                                    fontSize: "0.8rem",
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
                                    fontSize: "0.8rem",
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
                            );
                          } else if (
                            d.id === "startDate" ||
                            d.id === "endDate"
                          ) {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{ padding: "4px", fontSize: "0.7rem" }}
                              >
                                {moment(data[d.id]).format("DD/MM/YYYY")}
                              </TableCell>
                            );
                          } else if (d.id === "status") {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{ padding: "4px", fontSize: "0.7rem" }}
                              >
                                {badge(data[d.id])}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{ padding: "4px", fontSize: "0.7rem" }}
                              >
                                {data[d.id]}
                              </TableCell>
                            );
                          }
                        })}
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
    </>
  );
};

export default ProgrammeDesk;
