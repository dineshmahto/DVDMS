import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import Basicbutton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import SearchField from "../../../components/search/search";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDrug,
  getDrugDeksList,
  getDrugDeksListResponse,
  deleteDrugResponse,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import searchFunc from "../../../components/tables/searchFunc";
import {
  INTERNET_CONNECTION_MESSAGE,
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
  SORTINGORDER,
} from "../../../common/constant/constant";
import { useMediaQuery } from "react-responsive";
const AddNewDrugModal = lazy(() => import("./addnewdrug"));
const AddNewAssetModal = lazy(() => import("./addnewasset"));
const EditDrugModal = lazy(() => import("./editdrugmodal"));
const AlertDialog = lazy(() => import("../../../components/dialog/dialog"));
const DrugDesk = () => {
  const dispatch = useDispatch();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const drugDeskListResponse = useSelector(
    (state) => state?.admin?.drugDeskListResponse
  );
  const deleteDrugResponses = useSelector(
    (state) => state?.admin?.deleteDrugResp
  );
  console.log("deleteDrugResponse", deleteDrugResponses);
  console.log("drugDeskListResponse", drugDeskListResponse);
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
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [showEditDrugModal, setEditDrugModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [manufactureList, setManufactureList] = useState([]);
  const [classList, setClassList] = useState([]);
  const keyWords = {
    DRUG_ID: "id",
    DRUG_NAME: "name",
    STRENGTH_UNIT: "unit",
    MANUFACTURE_NAME: "manuName",
    PACKG_QTY: "packQty",
    DRUG_CLASS: "drugClass",
    CATEGORY: "category",
    ACTION: "Action",
  };
  const columns = useMemo(() => [
    {
      id: keyWords.DRUG_ID,
      name: "DRUG ID",
      sortable: true,
    },

    {
      id: keyWords.DRUG_NAME,
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: keyWords.STRENGTH_UNIT,
      name: "STRENGTH UNIT",
      sortable: true,
    },
    {
      id: keyWords.MANUFACTURE_NAME,
      name: "MANUFACTURER NAME",
      sortable: true,
    },
    {
      id: keyWords.PACKG_QTY,
      name: "PACKAGE QTY",
      sortable: true,
    },
    {
      id: keyWords.DRUG_CLASS,
      name: "DRUG CLASS",
      sortable: true,
    },
    {
      id: keyWords.CATEGORY,
      name: "CATEGORY",
      sortable: true,
    },

    {
      id: keyWords.ACTION,
      name: "Edit / Delete",
      sortable: false,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getDrugDeksList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getDrugDeksListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (
      drugDeskListResponse &&
      drugDeskListResponse?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      if (
        drugDeskListResponse?.data?.pageList &&
        drugDeskListResponse?.data?.pageList?.content
      ) {
        setTotalRows(drugDeskListResponse?.data?.pagelist?.totalElements);
        setTableData(drugDeskListResponse?.data?.pageList?.content);
        setFilterData(drugDeskListResponse?.data?.pageList?.content);

        setCategoryList(drugDeskListResponse?.data?.categoryList);
        setManufactureList(drugDeskListResponse?.data?.manufactureList);
        setClassList(drugDeskListResponse?.data?.classList);
      }
      setLoading(false);
      dispatch(getDrugDeksListResponse(""));
    } else if (
      drugDeskListResponse &&
      drugDeskListResponse?.status == NETWORK_STATUS_CODE.BAD_REQUEST
    ) {
      setLoading(false);
      toastMessage("Drug Desk", "", "error");
      dispatch(getDrugDeksListResponse(""));
    } else if (
      drugDeskListResponse &&
      drugDeskListResponse?.code === NETWORK_STATUS_CODE.NETWORK_ERROR
    ) {
      setLoading(false);
      toastMessage("Drug List", INTERNET_CONNECTION_MESSAGE);
      dispatch(getDrugDeksListResponse(""));
    } else if (
      drugDeskListResponse &&
      drugDeskListResponse?.response?.status ==
        NETWORK_STATUS_CODE.INTERNAL_ERROR
    ) {
      setLoading(false);
      dispatch(getDrugDeksListResponse(""));
      toastMessage(
        "Drug Desk",
        "Something went wrong please try after sometime",
        "error"
      );
    }
  }, [drugDeskListResponse]);

  useEffect(() => {
    if (
      deleteDrugResponses &&
      deleteDrugResponses?.status === NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (deleteDrugResponses?.data?.status === SERVER_STATUS_CODE.SUCCESS) {
        setShowDeleteDialog(false);
        toastMessage("DRUG DESK", deleteDrugResponses?.data?.message);
        dispatch(deleteDrugResponse(""));
        resetPageDetails();
        dispatch(getDrugDeksList());
      } else if (
        deleteDrugResponses?.data?.status === SERVER_STATUS_CODE.FAILED
      ) {
        toastMessage("DRUG DESK", deleteDrugResponses?.data?.message);
        dispatch(deleteDrugResponse(""));
      }
    } else if (
      (deleteDrugResponses &&
        deleteDrugResponses?.status === NETWORK_STATUS_CODE.INTERNAL_ERROR) ||
      deleteDrugResponses?.status === NETWORK_STATUS_CODE.PAGE_NOT_FOUND
    ) {
      setShowDeleteDialog(false);
      toastMessage("DRUG DESK", "Something went wrong");
    }
  }, [deleteDrugResponses]);

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
      accessor === sortField && order === SORTINGORDER.ASC
        ? SORTINGORDER.DESC
        : SORTINGORDER.ASC;
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };
  const handleOpenAddDrugModal = () => {
    setShowAddDrugModal(false);
  };
  const handleOpenAddAssetModal = () => {
    setShowAddAssetModal(false);
  };
  const handleEditDrugModal = () => {
    setEditDrugModal(false);
  };

  const handleDeleteDialog = () => {
    setDeleteId("");
    setShowDeleteDialog(false);
  };
  const handleDeleteDrug = () => {
    dispatch(deleteDrug({ id: deleteId }));
  };

  const resetPageDetails = () => {
    setController({
      rowsPerPage: 10,
      page: 0,
    });
  };

  return (
    <>
      <div className="row mt-1">
        <div className="d-flex justify-content-start">
          <p className="fs-6">DRUG / ASSETS DESK</p>
        </div>
      </div>

      <HorizonatalLine text="Drug Management Desk" />

      <div className="row ">
        <div className="d-flex flex-row justify-content-between">
          <Basicbutton
            buttonText="Add New Drug"
            className={`btn btn-outline-primary ${
              isDesktopOrLaptop ? "btn" : "btn-sm"
            } rounded-0 mb-2 me-1 mt-2`}
            onClick={() => {
              setShowAddDrugModal(true);
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
      <Paper>
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
                      <StyledTableRow key={data?.id}>
                        {columns.map((d, k) => {
                          if (d.id === keyWords.ACTION) {
                            return (
                              <StyledTableCell key={k} padding="none">
                                <span
                                  className="text-decoration-underline ms-1"
                                  onClick={() => {
                                    setEditDrugModal(true);
                                    setEditData(data);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="me-2"
                                  />
                                </span>
                                <span
                                  className="text-decoration-underline"
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
          <Suspense>
            <AddNewDrugModal
              openAddNewDrugModal={showAddDrugModal}
              handleOpenAddDrugModal={handleOpenAddDrugModal}
              categoryList={categoryList}
              manufactureList={manufactureList}
              classList={classList}
            />
          </Suspense>

          <Suspense>
            <AddNewAssetModal
              openAddNewAssetModal={showAddAssetModal}
              handleOpenAddAssetModal={handleOpenAddAssetModal}
            />
          </Suspense>
          <Suspense>
            <EditDrugModal
              openEditDrugModal={showEditDrugModal}
              handleEditDrugModal={handleEditDrugModal}
              editData={editData}
              classList={classList}
              manufactureList={manufactureList}
              categoryList={categoryList}
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
              <Basicbutton buttonText="Agree" onClick={handleDeleteDrug} />
            </AlertDialog>
          </Suspense>
        </div>
      </Paper>
    </>
  );
};

export default DrugDesk;
