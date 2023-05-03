import React, { useState, useMemo, useEffect, useCallback } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { Seo } from "../../../components/seo/seo";
import { useDispatch, useSelector } from "react-redux";
import { getStoreDeskList } from "../../../store/admin/action";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import { getStockDeskListResponse } from "../../../store/stock/action";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";

const StoreDesk = () => {
  const dispatch = useDispatch();
  const storeDeskListResponse = useSelector(
    (state) => state.admin.storeDeskListResponse
  );
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
      id: "id",
      name: "STORE ID",
      sortable: true,
    },

    {
      id: "storeName",
      name: "STORE NAME",
      sortable: true,
    },
    {
      id: "storeTypeId",
      name: "STORE TYPE",
      sortable: true,
    },
    {
      id: "toStoreId",
      name: "REPORTING STORE",
      sortable: true,
    },
    {
      id: "ownerTypeId",
      name: "OWNER LIST",
      sortable: true,
    },
    {
      id: "district",
      name: "DISTRICT",
      sortable: true,
    },
    {
      id: "blockId",
      name: "BLOCK",
      sortable: true,
    },
    {
      id: "address",
      name: "Address",
      sortable: true,
    },
    {
      id: "contactNo",
      name: "CONTACT NO",
      sortable: true,
    },
    {
      id: "longitude",
      name: "LONGITUTE",
      sortable: true,
    },
    {
      id: "latitude",
      name: "LATITUDE",
      sortable: true,
    },
    {
      id: "deptOpd",
      name: "DEPT. OPD",
      sortable: true,
    },
    {
      id: "ninNumber",
      name: "NIN NUMBER",
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

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getStoreDeskList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getStockDeskListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (storeDeskListResponse && storeDeskListResponse?.status === 200) {
      setActivityList(storeDeskListResponse?.data?.activityTypeList);
      setTotalRows(storeDeskListResponse?.data?.pageList?.totalElements);
      setTableData(storeDeskListResponse?.data?.pageList?.content);
      setLoading(false);
      dispatch(getStockDeskListResponse(""));
    } else if (storeDeskListResponse && storeDeskListResponse?.status == 400) {
      setLoading(false);

      toastMessage("Login Error", "Please enter valid ID", "error");
      dispatch(getStockDeskListResponse(""));
    }
  }, [storeDeskListResponse]);
  return (
    <>
      <Seo title="DVDMS | Store Desk" description="Store Desk" />
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">STORE LIST</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Store Management Desk" />
      </div>
      <div className="row">
        <div className="d-flex flex-row justify-content-between">
          <Basicbutton
            buttonText="Add New Store"
            outlineType={true}
            className="btn btn-primary rounded-0 mb-2 me-1 mt-2 ms-1"
            onClick={() => {
              setShowAddModal(true);
            }}
          />
          <SearchField
            className="me-1 mt-1"
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
                      <StyledTableRow key={data + index}>
                        {columns.map((d, k) => {
                          if (d.id === "deptOpd") {
                            return (
                              <StyledTableCell padding="none">
                                {data[d.id] === false ? "FALSE" : ""}
                              </StyledTableCell>
                            );
                          } else if (d.id === "Action") {
                            return (
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
                            );
                          } else {
                            return (
                              <StyledTableCell
                                className="text-center"
                                key={k}
                                padding="none"
                              >
                                {data[d.id]}
                              </StyledTableCell>
                            );
                          }
                        })}
                      </StyledTableRow>
                    );
                  })
                )}
                {!loading && tableData.length === 0 && (
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
    </>
  );
};

export default StoreDesk;