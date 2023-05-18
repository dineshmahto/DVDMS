import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import BasicButton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { getRateContractDeskList } from "../../../store/admin/action";
import moment from "moment";
import { Spinner } from "react-bootstrap";
const DrugListModal = lazy(() => import("./druglistmodal"));
const AcceptChallan = () => {
  const dispatch = useDispatch();
  const rateContractListResponse = useSelector(
    (state) => state.admin.rateContractListResponse
  );
  console.log("rateContractListResponse", rateContractListResponse);
  const [tableData, setTableData] = useState([]);
  const [sortedData, handleSorting] = useSortableTable();
  const [totalRows, setTotalRows] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [showDrugList, setShowDrugList] = useState(false);
  const [modalData, setModalData] = useState([]);
  const columns = useMemo(() => [
    {
      id: "poNo",
      name: "PO NO.",
      sortable: true,
    },
    {
      id: "challanNo",
      name: "CHALLAN NUMBER",
      sortable: true,
    },

    {
      id: "challanDate",
      name: "CHALLAN DATE",
      sortable: true,
    },

    {
      id: "supName",
      name: "SUPPLIER NAME",
      sortable: true,
    },
    {
      id: "tranName",
      name: "TRANSPORTER NAME",
      sortable: true,
    },
    {
      id: "loryNumber",
      name: "LORY NUMBER",
      sortable: true,
    },
    {
      id: "noOfBox",
      name: "NO. OF BOX",
      sortable: true,
    },
    {
      id: "status",
      name: "STATUS",
      sortable: true,
    },
  ]);
  const handlePageChange = (newPage) => {
    setController({
      ...controller,
      page: newPage,
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
    console.log("sortedData", sortedData);
    setTableData(sortedData);
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getRateContractDeskList({
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
    if (rateContractListResponse && rateContractListResponse?.status === 200) {
      setTotalRows(rateContractListResponse?.data?.totalElements);
      setTableData(rateContractListResponse?.data?.content);
      setLoading(false);
    } else if (
      rateContractListResponse &&
      rateContractListResponse?.status == 400
    ) {
      setLoading(false);
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [rateContractListResponse]);

  const handleDrugListModal = () => {
    setShowDrugList(false);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">RATE CONTRACT DESK</p>
          </div>
        </div>

        <div className="row mt-2">
          <HorizonatalLine text="Rate Contract Management Desk" />
        </div>

        <div className="row mt-1 mb-2">
          <div className="d-flex justify-content-end ">
            <SearchField
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
              order={order}
              handleSorting={handleSortingChange}
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
                  tableData?.map((row, index) => {
                    return (
                      <TableRow hover>
                        {columns.map((d, k) => {
                          if (
                            d.id === "contactTo" ||
                            d.id === "contactFrom" ||
                            d.id === "contactDate" ||
                            d.id === "tenderDate"
                          ) {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "10px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                {moment(row[d.id]).format("DD/MM/YYYY")}
                              </TableCell>
                            );
                          } else if (d.id === "druglist") {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "10px",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() => {
                                  setShowDrugList(true);
                                  setModalData(row[d.id]);
                                }}
                              >
                                VIEW DRUG LIST
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "10px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                {row[d.id]}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </TableComponent>
          </div>
        </div>
        <Suspense>
          <DrugListModal
            showDrugListModal={showDrugList}
            handleDrugListModal={handleDrugListModal}
            drugList={modalData}
          />
        </Suspense>
      </div>
    </>
  );
};

export default AcceptChallan;
