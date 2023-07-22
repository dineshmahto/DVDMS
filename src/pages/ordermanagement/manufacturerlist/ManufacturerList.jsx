import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
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
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { Seo } from "../../../components/seo/seo";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import { useNavigate } from "react-router-dom";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";

import {
  getManufactureDeskList,
  getManufactureDeskListResponse,
} from "../../../store/ordermanagement/action";

import AddNewManufacturing from "./AddNewManufacturing";
import EditManufacturing from "./EditManufacturing";

import { DELETE_DRUG_MANUFACTURE } from "../../../common/constant/constants";

const ManufacturerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState("");

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const manufacturingListResponse = useSelector(
    (state) => state.ordermanaagement?.manufactureDeskList
  );
  console.log(manufacturingListResponse);

  const columns = useMemo(() => [
    {
      id: "name",
      name: "name",
      sortable: true,
    },
    {
      id: "remarkss",
      name: "remarkss",
      sortable: true,
    },
  ]);

  const handlePageChange = useCallback(
    (newPage) => {
      setLoading(true);
      setController({
        ...controller,
        page: newPage - 1,
      });
    },
    [controller]
  );
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
      dispatch(
        getManufactureDeskList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
      console.log(manufacturingListResponse);
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getManufactureDeskListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (
      manufacturingListResponse &&
      manufacturingListResponse?.status === 200
    ) {
      if (
        manufacturingListResponse?.data?.pageList &&
        manufacturingListResponse?.data?.pageList?.content
      ) {
        setTotalPages(manufacturingListResponse?.data?.pageList?.totalPages);
        setTotalRows(manufacturingListResponse?.data?.pageList?.totalElements);
        setTableData(manufacturingListResponse?.data?.pageList?.content);

        setLoading(false);
        dispatch(getManufactureDeskListResponse(""));
      } else if (manufacturingListResponse?.data?.status === 401) {
        setLoading(false);
        navigate("/");
      }
    } else if (
      manufacturingListResponse &&
      manufacturingListResponse?.code === "ERR_NETWORK"
    ) {
      setLoading(false);
      toastMessage("Manufacturing Desk", "Internet Connection Problem");
      dispatch(getManufactureDeskListResponse(""));
    } else if (
      manufacturingListResponse &&
      manufacturingListResponse?.status == 400
    ) {
      setLoading(false);
      toastMessage("Manufacturing Desk", "", "error");
      dispatch(getManufactureDeskListResponse(""));
    } else if (
      manufacturingListResponse &&
      manufacturingListResponse?.response?.status == 500
    ) {
      setLoading(false);
      dispatch(getManufactureDeskListResponse(""));
      toastMessage(
        "Manufacturing Desk",
        "Something went wrong please try after sometime",
        "error"
      );
    }
  }, [manufacturingListResponse]);

  //add

  const handleCloseAddMfgModal = () => {
    setShowAddModal(false);
    dispatch(
      getManufactureDeskList({
        pageNumber: controller.page,
        pageSize: controller.rowsPerPage,
      })
    );
  };

  const handleCloseEditMfgModal = () => {
    setEditData("");

    setShowEditModal(false);
    dispatch(
      getManufactureDeskList({
        pageNumber: controller.page,
        pageSize: controller.rowsPerPage,
      })
    );
  };

  const handleDelete = (data) => {
    // postService(DELETE_DRUG_MANUFACTURE, { id: data.id })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.data.status == 1) {
    //       dispatch(
    //         getManufactureDeskList({
    //           pageNumber: controller.page,
    //           pageSize: controller.rowsPerPage,
    //         })
    //       );
    //       toastMessage("Manufacture Desk", response.data.message, "success");
    //     } else {
    //       toastMessage("Manufacture Desk", response.data.message, "error");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <Seo
        title="DVDMS | Manufacturing Desk"
        description="Manufacturing Desk"
      />
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">Manufacturing LIST</p>
        </div>
      </div>
      <div className="row mt-1">
        <HorizonatalLine text="Manufacturing Management Desk" />
      </div>
      <div className="row">
        <div className="d-flex flex-row justify-content-between">
          <Basicbutton
            buttonText="Add New Manufacturer"
            outlineType={true}
            className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
            onClick={() => {
              setShowAddModal(true);
            }}
          />
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

      <Paper>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
              caption="Manufacturing List"
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
                      <StyledTableRow key={data.id}>
                        <StyledTableCell padding="none">
                          {data.name}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data.remarks}
                        </StyledTableCell>

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
                              size="2"
                            />
                            |
                          </span>

                          <span
                            className="text-decoration-underline"
                            style={{
                              fontSize: "0.7rem",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDelete(data)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="ms-2"
                              color="red"
                              size="1x"
                            />
                          </span>
                        </StyledTableCell>
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
      </Paper>
      {showAddModal && (
        <Suspense>
          <AddNewManufacturing
            openAddMfgModal={showAddModal}
            handleCloseAddMfgModal={handleCloseAddMfgModal}
          />
        </Suspense>
      )}
      {showEditModal && (
        <Suspense>
          <EditManufacturing
            openEditMfgModal={showEditModal}
            handleCloseEditMfgModal={handleCloseEditMfgModal}
            editData={editData}
          />
        </Suspense>
      )}
    </>
  );
};

export default ManufacturerList;
