import React, { useEffect, useMemo, useState } from "react";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { useDispatch, useSelector } from "react-redux";
import {
  getBudgetIterfaceList,
  getBudgetIterfaceListResponse,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import { useNavigate } from "react-router-dom";
import searchFunc from "../../../components/tables/searchFunc";

const BudgetListDesk = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const budgetInterfaceListResponse = useSelector(
    (state) => state?.admin?.budgetInterfaceListResponse
  );
  console.log("budgetInterfaceListResponse", budgetInterfaceListResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [programmeList, setProgrammeList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const columns = useMemo(() => [
    {
      id: "programmeName",
      name: "PROGRAMME",
      sortable: true,
    },

    {
      id: "financialYear",
      name: "FINANCIAL YEAR",
      sortable: true,
    },
    {
      id: "fundingSource",
      name: "FUNDING SOURCE",
      sortable: true,
    },
    {
      id: "budgetAllocated",
      name: "BUDGET ALLOCATED",
      sortable: false,
    },
    {
      id: "utilizesBudget",
      name: "UTILIZED BUDGET",
      sortable: false,
    },
    {
      id: "availableBudget",
      name: "AVAILABLE BUDGET",
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

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getBudgetIterfaceList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getBudgetIterfaceListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (
      budgetInterfaceListResponse &&
      budgetInterfaceListResponse?.status === 200
    ) {
      if (
        budgetInterfaceListResponse &&
        budgetInterfaceListResponse?.data?.pageList?.content?.length > 0
      ) {
        setTotalRows(
          budgetInterfaceListResponse?.data?.pageList?.totalElements
        );
        setTableData(budgetInterfaceListResponse?.data?.pageList?.content);
        setFilterData(budgetInterfaceListResponse?.data?.pageList?.content);
        setStoreList(budgetInterfaceListResponse?.data?.addListStore);
        setSourceList(budgetInterfaceListResponse?.data?.fundingSourceList);
        setProgrammeList(budgetInterfaceListResponse?.data?.programmeList);
      }

      setLoading(false);
      dispatch(getBudgetIterfaceListResponse(""));
    } else if (
      budgetInterfaceListResponse &&
      budgetInterfaceListResponse?.status == 400
    ) {
      setLoading(false);
      dispatch(getBudgetIterfaceListResponse(""));
      toastMessage("Login Error", "Please enter valid ID", "error");
    } else if (
      budgetInterfaceListResponse &&
      budgetInterfaceListResponse?.status == 500
    ) {
      setLoading(false);
      dispatch(getBudgetIterfaceListResponse(""));
      toastMessage(
        "Budget Interface Error",
        "Something went wrong please try after sometime",
        "error"
      );
    }
  }, [budgetInterfaceListResponse]);

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">BUDGET LIST DESK</p>
        </div>
      </div>

      <div className="row ">
        <div className="d-flex flex-row justify-content-between">
          <Basicbutton
            buttonText="Allocate New Budget"
            className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
            onClick={() => {
              navigate("/openBudgetInterface", {
                state: {
                  storeList: storeList,
                  programmeList: programmeList,
                  sourceList: sourceList,
                },
              });
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
              customWidth="100%"
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
                          return (
                            <StyledTableCell key={k} padding="none">
                              {data[d.id]}
                            </StyledTableCell>
                          );
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
    </>
  );
};

export default BudgetListDesk;
