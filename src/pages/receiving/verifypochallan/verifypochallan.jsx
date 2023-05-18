import React, { useState, useMemo, useEffect } from "react";
import BasicButton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { TableBody } from "@mui/material";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { getRateContractDeskList } from "../../../store/admin/action";
import moment from "moment";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TablePagination from "../../../components/tables/datatable/tablepagination";

const VerifyPoChallan = () => {
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
      name: "REQUEST NO.",
      sortable: true,
    },
    {
      id: "challanNo",
      name: "CHALLAN NO",
      sortable: true,
    },

    {
      id: "challandDate",
      name: "CHALLAN DATE",
      sortable: true,
    },

    {
      id: "supplierDate",
      name: "SUPPLIER DATE",
      sortable: true,
    },
    {
      id: "transporterName",
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
    {
      id: "noOfDrugs",
      name: "NO. DRUGS",
      sortable: true,
    },
    {
      id: "status",
      name: "TYPE",
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

  useEffect(() => {}, [rateContractListResponse]);

  const handleDrugListModal = () => {
    setShowDrugList(false);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">CHALLAN RECEIVE / VERIFY</p>
          </div>
        </div>

        <div className="row mt-2">
          <HorizonatalLine text="Rate Contract Management Desk" />
        </div>

        <div className="row mt-1 mb-2">
          <div className="d-flex justify-content-end ">
            <SearchField
              iconPosition="end"
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
                  <TableRowLaoder />
                ) : (
                  tableData &&
                  tableData?.map((row, index) => {
                    return (
                      <StyledTableRow>
                        {columns.map((d, k) => {
                          if (
                            d.id === "contactTo" ||
                            d.id === "contactFrom" ||
                            d.id === "contactDate" ||
                            d.id === "tenderDate"
                          ) {
                            return (
                              <StyledTableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "10px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                {moment(row[d.id]).format("DD/MM/YYYY")}
                              </StyledTableCell>
                            );
                          } else {
                            return (
                              <StyledTableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "10px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                {row[d.id]}
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
      </div>
    </>
  );
};

export default VerifyPoChallan;
