import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  Suspense,
  lazy,
} from "react";
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
import { Seo } from "../../../components/seo/seo";
import { useDispatch, useSelector } from "react-redux";
import { getStoreDeskList } from "../../../store/admin/action";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import { getStockDeskListResponse } from "../../../store/stock/action";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
const CreateStoreModal = lazy(() => import("./createstoremodal"));
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
  const [ownerList, setOwnerList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [storeTypeList, setStoreTypeList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [districtList, setDistrictList] = useState([]);

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
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

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
      setDistrictList(storeDeskListResponse?.data?.districtList);
      setBlockList(storeDeskListResponse?.data?.blockList);
      setOwnerList(storeDeskListResponse?.data?.ownerList);
      setStoreList(storeDeskListResponse?.data?.storeList);
      setStoreTypeList(storeDeskListResponse?.data?.storeTypeList);
      setLoading(false);
      dispatch(getStockDeskListResponse(""));
    } else if (storeDeskListResponse && storeDeskListResponse?.status == 400) {
      setLoading(false);

      toastMessage("Store Desk", "", "error");
      dispatch(getStockDeskListResponse(""));
    } else if (
      storeDeskListResponse &&
      storeDeskListResponse?.code === "ERR_NETWORK"
    ) {
      setLoading(false);
      toastMessage("Store Desk", "Internet Connection Problem");
      dispatch(getStockDeskListResponse(""));
    } else if (
      storeDeskListResponse &&
      storeDeskListResponse?.response?.status == 500
    ) {
      setLoading(false);
      dispatch(getStockDeskListResponse(""));
      toastMessage(
        "Store Desk",
        "Something went wrong please try after sometime",
        "error"
      );
    }
  }, [storeDeskListResponse]);
  const handleCloseCreateStoreModal = () => {
    setShowAddModal(false);
  };
  return (
    <>
      <Seo title="DVDMS | Store Desk" description="Store Desk" />
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">STORE LIST</p>
        </div>
      </div>

      <HorizonatalLine text="Store Management Desk" />

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
              handleSorting={handleSortingChange}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
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
        <Suspense>
          <CreateStoreModal
            openCreateStoreModal={showAddModal}
            handleCloseCreateStoreModal={handleCloseCreateStoreModal}
            storeList={storeList}
            storeTypeList={storeTypeList}
            districtList={districtList}
            ownerList={ownerList}
            blockList={blockList}
          />
        </Suspense>
      </Paper>
    </>
  );
};

export default StoreDesk;
