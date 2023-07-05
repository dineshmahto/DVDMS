import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchField from "../../../components/search/search";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Basicbutton from "../../../components/button/basicbutton";
import { Paper } from "@mui/material";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  getMiscellanousStckConsmpList,
  getMiscellanousStckConsmpListResp,
} from "../../../store/issue/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
const StockConsumptionList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const misStockConsmpListResp = useSelector(
    (state) => state?.issuereturn?.misStockConsmpListResp
  );
  console.log("misStockConsmpListResp", misStockConsmpListResp);
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
  const columns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "programName",
      name: "PROGRAM NAME.",
      sortable: true,
    },
    {
      id: "batchNo",
      name: "BATCH. NO",
      sortable: true,
    },

    {
      id: "expiryDate",
      name: "EXPIRY DATE",
      sortable: true,
    },

    {
      id: "manfDate",
      name: "DAYS TO EXP",
      sortable: false,
    },
    {
      id: "availableQty",
      name: "AVAL QTY",
      sortable: false,
    },
    {
      id: "mscQty",
      name: "MISC QTY",
      sortable: false,
    },
    {
      id: "tax",
      name: "REMARKS",
      sortable: false,
    },

    ,
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
      setTimeout(() => {
        dispatch(
          getMiscellanousStckConsmpList({
            ...controller,
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 500);
    }

    return () => {
      isApiSubcribed = false;
      dispatch(getMiscellanousStckConsmpListResp(""));
      clearTimeout();
    };
  }, [controller]);

  useEffect(() => {
    if (misStockConsmpListResp && misStockConsmpListResp?.status === 200) {
      if (
        misStockConsmpListResp?.data?.pageList &&
        misStockConsmpListResp?.data?.pageList?.content
      ) {
        setTableData(misStockConsmpListResp?.data?.pageList?.content);
        setTotalRows(misStockConsmpListResp?.data?.pageList?.totalElements);
      }
      dispatch(getMiscellanousStckConsmpListResp(""));
      setLoading(false);
    } else if (
      misStockConsmpListResp &&
      misStockConsmpListResp?.code == "ERR_BAD_REQUEST"
    ) {
      toastMessage("Stock Consumption", "BAD REQUEST");
      dispatch(getMiscellanousStckConsmpListResp(""));
      setLoading(false);
    } else if (
      misStockConsmpListResp &&
      misStockConsmpListResp?.status === 500
    ) {
      toastMessage("Stock Consumption", "Something went wrong");
      dispatch(getMiscellanousStckConsmpListResp(""));
      setLoading(false);
    }
  }, [misStockConsmpListResp]);

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">STOCK CONSUMPTION LIST</p>
        </div>
      </div>
      <div className="row mt-2">
        <div className="d-flex jsutify-content-start">
          <Basicbutton
            buttonText="Add New Miscellaneous"
            className="primary rounded-0"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => navigate("/openStockForMisConsumption")}
          />
        </div>
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="Store Consumption List" />
      </div>
      <Paper>
        <div className="row mb-1">
          <div className="d-flex justify-content-end">
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
                  tableData.length > 0 &&
                  tableData.map((data, index) => (
                    <StyledTableRow key={data.id}>
                      {columns.map((d, k) => {
                        if (d.id === "manfDate") {
                          return (
                            <StyledTableCell key={k} padding="none">
                              {moment(data?.expDate).format("DD/MM/YYYY")}
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
                  ))
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
    </>
  );
};

export default StockConsumptionList;
