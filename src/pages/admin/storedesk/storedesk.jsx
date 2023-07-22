import React, { useState, useMemo, useEffect, Suspense, lazy } from "react";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { Seo } from "../../../components/seo/seo";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStoreRecord,
  deleteStoreRecordResponse,
  getStoreDeskList,
} from "../../../store/admin/action";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import { getStockDeskListResponse } from "../../../store/stock/action";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import searchFunc from "../../../components/tables/searchFunc";
const CreateStoreModal = lazy(() => import("./createstoremodal"));
const EditStoreModal = lazy(() => import("./editstoremodal"));
const AlertDialog = lazy(() => import("../../../components/dialog/dialog"));

const StoreDesk = () => {
  const dispatch = useDispatch();
  const storeDeskListResponse = useSelector(
    (state) => state.admin.storeDeskListResponse
  );
  const deltestoreRcrdResp = useSelector(
    (state) => state?.admin?.deleteStoreRecrdResp
  );
  console.log("deltestoreRcrdResp", deltestoreRcrdResp);
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
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const [activityList, setActivityList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [storeTypeList, setStoreTypeList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [editData, setEditData] = useState({});

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

  const resetPageDetails = () => {
    setController({
      page: 0,
      rowsPerPage: 10,
    });
  };

  useEffect(() => {
    if (storeDeskListResponse && storeDeskListResponse?.status === 200) {
      setActivityList(storeDeskListResponse?.data?.activityTypeList);
      setTotalRows(storeDeskListResponse?.data?.pageList?.totalElements);
      setTableData(storeDeskListResponse?.data?.pageList?.content);
      setFilterData(storeDeskListResponse?.data?.pageList?.content);
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

  useEffect(() => {
    if (deltestoreRcrdResp && deltestoreRcrdResp?.status === 201) {
      if (deltestoreRcrdResp?.data?.status === 1) {
        setShowDeleteDialog(false);
        toastMessage("Store Desk", deltestoreRcrdResp?.data?.message);
        resetPageDetails();
        dispatch(getStoreDeskList());
        dispatch(deleteStoreRecordResponse(""));
      } else if (deltestoreRcrdResp?.data?.status === 0) {
        toastMessage("Store Desk", deltestoreRcrdResp?.data?.message);
        dispatch(deleteStoreRecordResponse(""));
      }
    } else if (deltestoreRcrdResp && deltestoreRcrdResp?.status === 500) {
      setShowDeleteDialog(false);
      dispatch(deleteStoreRecordResponse(""));
      toastMessage("Store Desk", "Something went wrong", "");
    }
  }, [deltestoreRcrdResp]);
  const handleCloseCreateStoreModal = () => {
    setShowAddModal(false);
  };

  const handleDeleteDialog = () => {
    setDeleteId("");
    setShowDeleteDialog(false);
  };
  const handleDeleteStore = () => {
    dispatch(deleteStoreRecord({ id: deleteId }));
  };
  const handleCloseEditStoreModal = () => {
    setShowEditModal(false);
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
            className="btn btn-outline-primary rounded-0 mb-2 me-1 mt-2 ms-1 shadow-sm rounded"
            onClick={() => {
              setShowAddModal(true);
            }}
          />
          <SearchField
            className="me-1 mt-1"
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
      <Paper elevation={3} className="mb-2">
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
              handleSorting={handleSortingChange}
              caption="Store List"
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
                                  onClick={() => {
                                    setEditData(data);
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
                                  style={{
                                    fontSize: "0.7rem",
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

        {showAddModal && (
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
        )}

        {showEditModal && (
          <Suspense>
            <EditStoreModal
              openEditStoreModal={showEditModal}
              handleCloseEditStoreModal={handleCloseEditStoreModal}
              storeList={storeList}
              storeTypeList={storeTypeList}
              districtList={districtList}
              ownerList={ownerList}
              blockList={blockList}
              editData={editData}
              resetPageDetails={resetPageDetails}
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
              <Basicbutton buttonText="Agree" onClick={handleDeleteStore} />
            </AlertDialog>
          </Suspense>
        )}
      </Paper>
    </>
  );
};

export default StoreDesk;
