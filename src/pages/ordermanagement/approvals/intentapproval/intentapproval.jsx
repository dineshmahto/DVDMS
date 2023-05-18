import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import SearchField from "../../../../components/search/search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getIntentforApprovalList,
  getIntentforApprovalListResponse,
} from "../../../../store/ordermanagement/action";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@mui/material";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../../components/tables/datatable/sortable";
import TableRowLaoder from "../../../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";

const IntentApproval = () => {
  const dispatch = useDispatch();
  const intentApprovalListResponse = useSelector(
    (state) => state.ordermanaagement?.intentApprovalListResponse
  );
  console.log("intentApprovalListResponse", intentApprovalListResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    type: 99,
    status: 99,
  });
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const columns = useMemo(() => [
    {
      id: "fromStore",
      name: "INSTITUTE",
      sortable: true,
    },

    {
      id: "toStore",
      name: "SUB INSTITUTE / PARENT STORE",
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
      id: "type",
      name: "REQUEST TYPE",
      sortable: true,
    },
    // {
    //   id: "expDate",
    //   name: "INSTITUTE",
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
          getIntentforApprovalList({
            ...controller,
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 500);
    }
    return () => {
      clearTimeout();
      dispatch(getIntentforApprovalListResponse(""));
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (
      intentApprovalListResponse &&
      intentApprovalListResponse?.status === 200
    ) {
      if (
        intentApprovalListResponse?.data?.pageList?.content &&
        intentApprovalListResponse?.data?.pageList?.content.length
      ) {
        setTotalRows(intentApprovalListResponse?.data?.pageList?.totalElements);
        setTableData(intentApprovalListResponse?.data?.pageList?.content);
      }
      dispatch(getIntentforApprovalListResponse(""));
      setLoading(false);
    } else if (
      intentApprovalListResponse &&
      intentApprovalListResponse?.status == 400
    ) {
      dispatch(getIntentforApprovalListResponse(""));
      setLoading(false);
      toastMessage("Intent Approval", "Please try again", "error");
    }
  }, [intentApprovalListResponse]);

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

  const handleClick = (event, index, row) => {
    if (selected.includes(index)) {
      const openCopy = selected.filter((element) => {
        return element !== index;
      });
      setSelectedRow([]);
      setSelected(openCopy);
    } else {
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
          <p className="fs-6">INTENT APPROVAL</p>
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
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "intentIssue",
                  label: "Intent for Issue",
                }}
                options={[
                  {
                    value: "intentIssue",
                    label: "Intent for Issue",
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
            <div className="col-auto">
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
      <div className="row mt-2">
        <HorizonatalLine text="Excess/Shortage Requested Details" />
      </div>
      <div className="row mb-1">
        <div className="d-flex justify-content-end">
          <SearchField
            className="me-1 mt-1"
            iconPosition="end"
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
                      {data?.fromStore}
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      {data?.toStore}
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      {data?.requestNo}
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      {moment(data?.requesstDate).format("DD/MM/YYYY")}
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      {data?.type}
                    </StyledTableCell>

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

export default IntentApproval;
