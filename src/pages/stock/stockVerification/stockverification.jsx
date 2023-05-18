import React, { useState, useMemo, useEffect } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { useDispatch, useSelector } from "react-redux";
import {
  getStockVerificationListResponse,
  getStockVerificationList,
} from "../../../store/stock/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { Link } from "react-router-dom";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
const StockVerification = () => {
  const dispatch = useDispatch();
  const stockVerificationResponse = useSelector(
    (state) => state?.stock?.stockVerificationListResponse
  );
  console.log("stockVerificationListResponse", stockVerificationResponse);
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
      name: "PROGRAM NAME",
      sortable: true,
    },
    {
      id: "batchNo",
      name: "BATCH NO",
      sortable: false,
      type: "select",
    },
    {
      id: "brandId",
      name: "BRAND ID",
      sortable: true,
    },
    {
      id: "stockQty",
      name: "STOCK QTY",
      sortable: true,
    },
    {
      id: "transferQty",
      name: "AVAILABLE. QTY",
      sortable: true,
    },
    {
      id: "remark",
      name: "REMARKS",
      sortable: true,
    },
    {
      id: "lastVerifiedDate",
      name: "LAST VERIFIED DATE",
      sortable: true,
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
      setTimeout(() => {
        dispatch(
          getStockVerificationList({
            ...controller,
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 1000);
    }
    return () => {
      dispatch(getStockVerificationListResponse(""));
      clearTimeout();
      isApiSubcribed = false;
    };
  }, [controller]);
  useEffect(() => {
    if (
      stockVerificationResponse &&
      stockVerificationResponse?.status === 200
    ) {
      setTotalRows(stockVerificationResponse?.data?.pageList?.totalElements);
      setTableData(stockVerificationResponse?.data?.pageList?.content);
      setLoading(false);
      dispatch(getStockVerificationListResponse(""));
    } else if (
      stockVerificationResponse &&
      stockVerificationResponse?.status === 400
    ) {
    }
    setLoading(false);

    dispatch(getStockVerificationListResponse(""));
  }, [stockVerificationResponse]);
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">STOCK VERIFICATION</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start">
        <div className="col-6">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Store Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{ value: "AZ", label: "Arizona" }}
                options={[
                  { value: "AL", label: "Alabama" },
                  { value: "AK", label: "Alaska" },
                  { value: "AS", label: "American Samoa" },
                  { value: "AZ", label: "Arizona" },
                  { value: "AR", label: "Arkansas" },
                  { value: "CA", label: "California" },
                  { value: "CO", label: "Colorado" },
                  { value: "CT", label: "Connecticut" },
                  { value: "DE", label: "Delaware" },
                  { value: "DC", label: "District Of Columbia" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Verified Drug List" />
      </div>
      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-end">
            <Link to={"/openStockVerification"}>
              <Basicbutton
                buttonText="Add New Stock Verification"
                outlineType={true}
                className="primary rounded-0 mb-2 me-1 mt-2"
              />
            </Link>
          </div>
        </div>
        <div className="row mb-1">
          <div className="d-flex justify-content-end">
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
                  <StyledTableRow>
                    <StyledTableCell colSpan={12}>
                      <Spinner />
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  tableData.length > 0 &&
                  tableData.map((data, index) => (
                    <StyledTableRow>
                      {columns.map((d, k) => {
                        if (d.id === "lastVerifiedDate") {
                          return (
                            <StyledTableCell key={k} padding="none">
                              {moment(data[d.id]).format("DD/MM/YYYY")}
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

export default StockVerification;
