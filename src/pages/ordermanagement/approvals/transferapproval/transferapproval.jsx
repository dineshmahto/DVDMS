import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import moment from "moment";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import SearchField from "../../../../components/search/search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransferListForApproval,
  getTransferListForApprovalResponse,
} from "../../../../store/ordermanagement/action";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@mui/material";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import TableRowLaoder from "../../../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";
import handleSortingFunc from "../../../../components/tables/datatable/sortable";

const TransferApproval = () => {
  const dispatch = useDispatch();
  const transferApprovalListResponse = useSelector(
    (state) => state.ordermanaagement?.transferApprovalListResponse
  );
  console.log("transferApprovalListResponse", transferApprovalListResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    status: 99,
    type: 99,
  });
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [approved, setApproved] = useState([]);
  const columns = useMemo(() => [
    {
      id: "fromStoreId",
      name: "INSTITUTE",
      sortable: true,
    },

    {
      id: "toStore",
      name: "SUB INSTITUTE / PARENT INSTITUTE",
      sortable: true,
    },

    {
      id: "requestNo",
      name: "REQUEST NUMBER",
      sortable: true,
    },
    {
      id: "requestDate",
      name: "REQUEST DATE",
      sortable: true,
    },
    {
      id: "requestType",
      name: "REQUEST TYPE",
      sortable: true,
    },
    // {
    //   id: "institute",
    //   name: "INSITIUTE",
    //   sortable: true,
    // },
    {
      id: "status",
      name: "STATUS",
      sortable: true,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getTransferListForApproval({
            ...controller,
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 300);
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getTransferListForApprovalResponse(""));
      clearTimeout();
    };
  }, [controller]);

  useEffect(() => {
    if (
      transferApprovalListResponse &&
      transferApprovalListResponse?.status === 200
    ) {
      if (
        transferApprovalListResponse?.data?.pageList?.content &&
        transferApprovalListResponse?.data?.pageList?.content.length > 0
      ) {
        setTotalRows(
          transferApprovalListResponse?.data?.pageList?.totalElements
        );
        setTableData(transferApprovalListResponse?.data?.pageList?.content);
        setSelected([]);
        setSelectedRow([]);
      }
      dispatch(getTransferListForApprovalResponse(""));
      setLoading(false);
    } else if (
      transferApprovalListResponse &&
      transferApprovalListResponse?.status == 400
    ) {
      dispatch(getTransferListForApprovalResponse(""));
      setLoading(false);
      toastMessage("Transfer Approval", "Please Try again", "error");
    } else if (
      transferApprovalListResponse &&
      transferApprovalListResponse?.status === 500
    ) {
      dispatch(getTransferListForApprovalResponse(""));
      setLoading(false);
      toastMessage("Transfer Approval", "Something went worng");
    }
  }, [transferApprovalListResponse]);

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

    setTableData(handleSortingFunc(accessor, setOrder, tableData));
  };

  const handleClick = (event, index, row) => {
    console.log("type", row?.status);
    if (selected.includes(index)) {
      if (row?.status === "Approval Pending") {
        setApproved([]);
      }
      const openCopy = selected.filter((element) => {
        return element !== index;
      });

      setSelectedRow([]);
      setSelected(openCopy);
    } else {
      if (row?.status === "Approval Pending") {
        console.log("Entered");
        setApproved([row]);
      }
      setSelectedRow(row);
      const openCopy = [...selected];
      openCopy.shift();
      openCopy.push(index);
      setSelected(openCopy);
    }
  };

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">TRANSFER APPROVAL</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start mb-2">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Store Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "statewarehouse",
                  label: "STATE WAREHOUSE",
                }}
                options={[
                  { value: "statewarehouse", label: "STATE WAREHOUSE" },
                ]}
              />
            </div>

            <div className="col-auto">
              <label>Request Type</label>
            </div>
            <div className="col-2">
              <CustomSelect
                defaultValue={{
                  value: "99",
                  label: "All",
                }}
                options={[
                  {
                    value: "99",
                    label: "All",
                  },
                  {
                    value: "9",
                    label: "Transfer-Demand (Shortage)",
                  },
                  {
                    value: "10",
                    label: "Transfer-Demand (Excess)",
                  },
                ]}
                onChange={(selectedOption) => {
                  setController({
                    ...controller,
                    type: selectedOption?.value,
                  });
                }}
              />
            </div>

            <div className="col-auto">
              <label>Request Status</label>
            </div>
            <div className="col-2">
              <CustomSelect
                defaultValue={{
                  value: "99",
                  label: "All",
                }}
                options={[
                  {
                    value: "99",
                    label: "All",
                  },
                  {
                    value: "1",
                    label: "Approval Pending",
                  },
                  {
                    value: "4",
                    label: "Approved By Ins. Head",
                  },
                  {
                    value: "5",
                    label: "Rejected By Ins. Head",
                  },
                  {
                    value: "6",
                    label: "Approved By HQ",
                  },
                  {
                    value: "7",
                    label: "Rejected By HQ",
                  },
                ]}
                onChange={(selectedOption) => {
                  setController({
                    ...controller,
                    status: selectedOption?.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Excess / Shortage Requested Details" />
      </div>
      <div className="row mb-1">
        <div className="d-flex justify-content-between">
          <div className="row d-flex justify-content-start">
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-auto">
                  <div>
                    <Link to={"/openIssueToThirdparty"}>
                      <Basicbutton
                        type="button"
                        buttonText="Approval"
                        className="primary rounded-0"
                        disabled={approved?.length > 0 ? null : "disabled"}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-auto">
                  <div>
                    <Link to={"/openIssueToThirdparty"}>
                      <Basicbutton
                        type="button"
                        buttonText="Reapproval"
                        className="primary rounded-0"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      <Paper>
        {/* Table Rendering */}

        <TableComponent
          columns={columns}
          sortField={sortField}
          order={order}
          handleSorting={handleSortingChange}
          checkBoxRequired={true}
        >
          <TableBody>
            {loading ? (
              <TableRowLaoder />
            ) : (
              tableData &&
              tableData?.length > 0 &&
              tableData?.map((data, index) => {
                return (
                  <StyledTableRow key={data.id}>
                    <StyledTableCell padding="none">
                      <Checkbox
                        size="small"
                        onClick={(event) => handleClick(event, index, data)}
                        color="primary"
                        checked={selected.includes(index)}
                        inputProps={{
                          "aria-labelledby": `enhanced-table-checkbox-${index}`,
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      {data.fromStoreId}
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      {data.toStore}
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      {data?.requestNo}
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      {moment(data?.requestDate).format("DD/MM/YYYY")}
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      {data?.requestType}
                    </StyledTableCell>
                    {/* <TableCell
                          padding="none"
                          className={[classes.tableCell, "text-center"]}
                        >
                          {data?.instituteType?.instiute}
                        </TableCell> */}

                    <StyledTableCell padding="none">
                      {data?.status}
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
      </Paper>
    </>
  );
};

export default TransferApproval;
