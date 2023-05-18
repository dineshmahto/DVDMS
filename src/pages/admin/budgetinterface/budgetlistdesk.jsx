import React, { useEffect, useMemo, useState } from "react";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
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
const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const BudgetListDesk = () => {
  const dispatch = useDispatch();
  const budgetInterfaceListResponse = useSelector(
    (state) => state?.admin?.budgetInterfaceListResponse
  );
  console.log("budgetInterfaceListResponse", budgetInterfaceListResponse);
  const classes = useStyles();
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
            onClick={() => {}}
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

export default BudgetListDesk;
