import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import Basicbutton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import SearchField from "../../../components/search/search";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrugDeksList,
  getDrugDeksListResponse,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
const AddNewDrugModal = lazy(() => import("./addnewdrug"));
const AddNewAssetModal = lazy(() => import("./addnewasset"));
const EditDrugModal = lazy(() => import("./editdrugmodal"));

const DrugDesk = () => {
  const dispatch = useDispatch();
  const drugDeskListResponse = useSelector(
    (state) => state?.admin?.drugDeskListResponse
  );
  console.log("drugDeskListResponse", drugDeskListResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [showEditDrugModal, setEditDrugModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [manufactureList, setManufactureList] = useState([]);
  const [classList, setClassList] = useState([]);
  const columns = useMemo(() => [
    {
      id: "id",
      name: "DRUG ID",
      sortable: true,
    },

    {
      id: "name",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "unit",
      name: "STRENGTH UNIT",
      sortable: true,
    },
    {
      id: "manuName",
      name: "MANUFACTURER NAME",
      sortable: true,
    },
    {
      id: "packType",
      name: "PACKAGE TYPE",
      sortable: true,
    },
    {
      id: "drugClass",
      name: "DRUG CLASS",
      sortable: true,
    },
    {
      id: "category",
      name: "CATEGORY",
      sortable: true,
    },

    {
      id: "Action",
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
    if (drugDeskListResponse && drugDeskListResponse?.status === 200) {
      if (
        drugDeskListResponse?.data?.pageList &&
        drugDeskListResponse?.data?.pageList?.content
      ) {
        setTotalRows(drugDeskListResponse?.data?.pagelist?.totalElements);
        setTableData(drugDeskListResponse?.data?.pageList?.content);
        setCategoryList(drugDeskListResponse?.data?.categoryList);
        setManufactureList(drugDeskListResponse?.data?.manufactureList);
        setClassList(drugDeskListResponse?.data?.classList);
      }
      setLoading(false);
      dispatch(getDrugDeksListResponse(""));
    } else if (drugDeskListResponse && drugDeskListResponse?.status == 400) {
      setLoading(false);
      toastMessage("Drug Desk", "", "error");
      dispatch(getDrugDeksListResponse(""));
    } else if (
      drugDeskListResponse &&
      drugDeskListResponse?.code === "ERR_NETWORK"
    ) {
      setLoading(false);
      toastMessage("Drug List", "Internet Connection Problem");
      dispatch(getDrugDeksListResponse(""));
    } else if (
      drugDeskListResponse &&
      drugDeskListResponse?.response?.status == 500
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
  const handleOpenAddDrugModal = () => {
    setShowAddDrugModal(false);
  };
  const handleOpenAddAssetModal = () => {
    setShowAddAssetModal(false);
  };
  const handleEditDrugModal = () => {
    setEditDrugModal(false);
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
            className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
            onClick={() => {
              setShowAddDrugModal(true);
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
                      <StyledTableRow>
                        {columns.map((d, k) => {
                          if (d.id === "Action") {
                            return (
                              <StyledTableCell key={k} padding="none">
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
            />
          </Suspense>
        </div>
      </Paper>
    </>
  );
};

export default DrugDesk;
