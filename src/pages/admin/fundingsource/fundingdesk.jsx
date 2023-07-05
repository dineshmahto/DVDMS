import React, { Suspense, lazy, useMemo, useState, useEffect } from "react";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
import {
  deleteFundingRecord,
  deleteFundingRecordResp,
  getFundingSourceList,
  getFundingSourceListResponse,
} from "../../../store/admin/action";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import searchFunc from "../../../components/tables/searchFunc";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
const AddNewFundingModal = lazy(() => import("./addnewfundingmodal"));
const EditFundingModal = lazy(() => import("./editfunding"));
const AlertDialog = lazy(() => import("../../../components/dialog/dialog"));
const FundingDesk = () => {
  const dispatch = useDispatch();
  const fundingSourceListResponse = useSelector(
    (state) => state?.admin?.fundingSourceListResponse
  );
  const deleteFundingResp = useSelector(
    (state) => state?.admin?.deleteFundingRcrdResp
  );
  console.log("deleteFundingResp", deleteFundingResp);
  console.log("fundingSourceListResponse", fundingSourceListResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  console.log(typeof tableData, tableData.length);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterData, setFilterData] = useState([]);
  const columns = useMemo(() => [
    {
      id: "name",
      name: "FUNDING SOURCE NAME",
      sortable: true,
    },

    {
      id: "code",
      name: "CODE",
      sortable: true,
    },
    {
      id: "effectiveDate",
      name: "EFFECTIVE DATE",
      sortable: true,
    },
    {
      id: "action",
      name: "ACTION",
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
  const handleNewFundingModal = () => {
    setShowCreateModal(false);
  };
  const handleEditFundingModal = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getFundingSourceList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getFundingSourceListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (
      fundingSourceListResponse &&
      fundingSourceListResponse?.status === 200
    ) {
      if (
        fundingSourceListResponse?.data?.pageList?.content &&
        fundingSourceListResponse?.data?.pageList?.content.length > 0
      ) {
        setTotalRows(fundingSourceListResponse?.data?.pageList?.totalElements);
        setTableData(fundingSourceListResponse?.data?.pageList?.content);
        setFilterData(fundingSourceListResponse?.data?.pageList?.content);
        dispatch(getFundingSourceListResponse(""));
      }
      setLoading(false);
    } else if (
      fundingSourceListResponse &&
      fundingSourceListResponse?.status == 400
    ) {
      setLoading(false);
      dispatch(getFundingSourceListResponse(""));
      toastMessage("Funding Desk", "", "error");
    } else if (
      fundingSourceListResponse &&
      fundingSourceListResponse?.code === "ERR_NETWORK"
    ) {
      setLoading(false);
      toastMessage("Funding Desk", "Internet Connection Problem");
      dispatch(getFundingSourceListResponse(""));
    } else if (
      fundingSourceListResponse &&
      fundingSourceListResponse?.response?.status == 500
    ) {
      setLoading(false);
      dispatch(getFundingSourceListResponse(""));
      toastMessage(
        "Funding Desk",
        "Something went wrong please try after sometime",
        "error"
      );
    }
  }, [fundingSourceListResponse]);

  useEffect(() => {
    if (deleteFundingResp && deleteFundingResp?.status === 201) {
      if (deleteFundingResp?.data?.status === 1) {
        handleDeleteDialog();
        toastMessage("Funding DESK", deleteFundingResp?.data?.message);
        dispatch(deleteFundingRecordResp(""));
        resetPageDetails();
        dispatch(getFundingSourceList());
      } else if (deleteFundingResp?.data?.status === 0) {
        handleDeleteDialog();
        toastMessage("Funding DESK", deleteFundingResp?.data?.message);
        dispatch(deleteFundingRecordResp(""));
      }
    } else if (
      (deleteFundingResp && deleteFundingResp?.status === 500) ||
      deleteFundingResp?.status === 404
    ) {
      handleDeleteDialog();
      deleteFundingRecordResp("");
      toastMessage("DRUG DESK", "Something went wrong");
    }
  }, [deleteFundingResp]);

  const handleDeleteDialog = () => {
    setDeleteId("");
    setShowDeleteDialog(false);
  };
  const handleDeleteFunding = () => {
    dispatch(deleteFundingRecord({ id: deleteId }));
  };

  const resetPageDetails = () => {
    setController({
      rowsPerPage: 10,
      page: 0,
    });
  };

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6 text-3xl font-bold underline">FUNDING DESK</p>
        </div>
      </div>

      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-between">
            <Basicbutton
              buttonText="Add New Funding"
              className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
              onClick={() => {
                setShowCreateModal(true);
              }}
            />
            <SearchField
              className="me-1 "
              iconPosition="end"
              onChange={(e) => {
                if (e.target?.value != "") {
                  setSearchValue(e?.target?.value);
                  setLoading(true);
                  setTableData(searchFunc(filterData, e.target?.value));
                  setLoading(false);
                } else {
                  setTableData(filterData);
                  setSearchValue("");
                }
              }}
            />
          </div>
        </div>

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
                      <StyledTableRow>
                        {columns.map((d, k) => {
                          if (d.id === "effectiveDate") {
                            return (
                              <StyledTableCell key={k} padding="none">
                                {moment(data[d.id]).format("DD/MM/YYYY")}
                              </StyledTableCell>
                            );
                          } else if (d.id === "action") {
                            return (
                              <StyledTableCell padding="none">
                                <span
                                  className="text-decoration-underline ms-1"
                                  style={{
                                    fontSize: "0.7rem",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setShowEditModal(true);
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

      <Suspense>
        <AddNewFundingModal
          openNewFundinngModal={showCreateModal}
          handleNewFundingModal={handleNewFundingModal}
        />
      </Suspense>

      <Suspense>
        <EditFundingModal
          openNewFundingModal={showEditModal}
          handleEditFundingModal={handleEditFundingModal}
          resetPageDetails={resetPageDetails}
          editdata={editData}
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
            onClick={() => {
              setDeleteId("");
              setShowDeleteDialog(false);
            }}
          />
          <Basicbutton buttonText="Agree" onClick={handleDeleteFunding} />
        </AlertDialog>
      </Suspense>
    </>
  );
};

export default FundingDesk;
