import React, { useState, useMemo, useEffect } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { TableBody, Paper } from "@mui/material";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { getRateContractDeskList } from "../../../store/admin/action";
import moment from "moment";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import {
  NETWORK_STATUS_CODE,
  SORTINGORDER,
} from "src/common/constant/constant";
import handleSortingFunc from "src/components/tables/datatable/sortable";
const ChallanList = () => {
  const dispatch = useDispatch();
  const allChallanListResp = useSelector(
    (state) => state?.receiving?.allChallanListResp
  );
  console.log("allChallanListResp", allChallanListResp);
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
  const columns = useMemo(() => [
    {
      id: "poNo",
      name: "PO NO.",
      sortable: true,
    },
    {
      id: "tenderNo",
      name: "CHALLAN NUMBER",
      sortable: true,
    },

    {
      id: "challanDate",
      name: "CHALLAN DATE",
      sortable: true,
    },

    {
      id: "supplierName",
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
      accessor === sortField && order === SORTINGORDER.ASC
        ? SORTINGORDER.DESC
        : SORTINGORDER.ASC;
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
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
    if (
      allChallanListResp &&
      allChallanListResp?.status === NETWORK_STATUS_CODE?.SUCCESS
    ) {
      if (
        allChallanListResp &&
        allChallanListResp?.data?.pageList &&
        allChallanListResp?.data?.pageList?.content
      ) {
        setTotalRows(allChallanListResp?.data?.pageList?.totalElements);
        setTableData(allChallanListResp?.data?.pageList?.content);
      }

      setLoading(false);
    } else if (
      allChallanListResp &&
      allChallanListResp?.status == NETWORK_STATUS_CODE?.BAD_REQUEST
    ) {
      setLoading(false);
      toastMessage("Challan List", allChallanListResp?.data?.message, "error");
    }
  }, [allChallanListResp]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">CHALLAN LIST</p>
          </div>
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
        <Paper elevation={3} className="mb-2">
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
                        <StyledTableRow key={index}>
                          {columns.map((d, k) => {
                            if (d.id === "challanDate") {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  {moment(row[d.id]).format("DD/MM/YYYY")}
                                </StyledTableCell>
                              );
                            } else {
                              return (
                                <StyledTableCell key={k} padding="none">
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
        </Paper>
      </div>
    </>
  );
};

export default ChallanList;
