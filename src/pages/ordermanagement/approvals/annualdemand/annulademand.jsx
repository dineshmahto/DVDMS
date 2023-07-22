import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import SearchField from "../../../../components/search/search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getApprovalDeskList,
  getApprovalDeskListResponse,
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
import { SORTINGORDER } from "../../../../common/constant/constant";
import { useNavigate } from "react-router-dom";

const AnnualDemand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const approvalDeskListResponse = useSelector(
    (state) => state.ordermanaagement?.approvalDeskListResponse
  );
  console.log("approvalDeskListResponse", approvalDeskListResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
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
      name: "SUB INSTITUTE / PARENT INSTITUTE",
      sortable: true,
    },

    {
      id: "id",
      name: "REQUEST NUMBER",
      sortable: true,
    },
    {
      id: "requestDate",
      name: "REQUEST DATE",
      sortable: true,
    },
    {
      id: "reqType",
      name: "REQUEST TYPE",
      sortable: true,
    },
    {
      id: "institute",
      name: "INSITIUTE",
      sortable: true,
    },
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
          getApprovalDeskList({
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 500);
    }
    return () => {
      dispatch(getApprovalDeskListResponse(""));
      clearTimeout();
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (approvalDeskListResponse && approvalDeskListResponse?.status === 200) {
      if (
        approvalDeskListResponse?.data?.pageList &&
        approvalDeskListResponse?.data?.pageList?.content
      ) {
        setTotalRows(approvalDeskListResponse?.data?.pageList?.totalElements);
        setTableData(approvalDeskListResponse?.data?.pageList?.content);
      }
      dispatch(getApprovalDeskListResponse(""));
      setLoading(false);
    } else if (
      approvalDeskListResponse &&
      approvalDeskListResponse?.status == 400
    ) {
      dispatch(getApprovalDeskListResponse(""));
      setLoading(false);
      toastMessage("Annual Demand", "", "error");
    }
  }, [approvalDeskListResponse]);

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
      accessor === sortField && order === SORTINGORDER.ASC
        ? SORTINGORDER.DESC
        : SORTINGORDER.ASC;
    setSortField(accessor);
    setOrder(sortOrder);
    handleSortingFunc(accessor, sortOrder, tableData);
  };

  const handleClick = (index, row) => {
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
          <p className="fs-6">APPORVAL DESK</p>
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
              <label className="labellineHeight" htmlFor="requestStatus">
                Reuest Status
              </label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "1",
                  label: "ACTIVE",
                }}
                options={[
                  { value: "99", label: "ALL" },
                  { value: "1", label: " Approval Pending" },
                  { value: "4", label: "Approved By Ins Head" },
                  { value: "5", label: "Rejected By Ins Head" },
                ]}
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
                <Basicbutton
                  type="button"
                  buttonText="Approval"
                  className="primary rounded-0"
                  disabled={selected.length > 0 ? null : "disabled"}
                  onClick={() => {
                    navigate("/openDemandApprovalForm", {
                      state: selectedRow?.id,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="Excess / Shortage Requested Details" />
      </div>
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
      <Paper>
        {/* Table Rendering */}
        <div className="row">
          <div className="col-12">
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
                            onClick={(event) => handleClick(data?.id, data)}
                            color="primary"
                            checked={selected.includes(data?.id)}
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${data?.id}`,
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
                          {data?.id}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {moment(data?.requestDate).format("DD/MM/YYYY")}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.instituteType?.reqType}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.instituteType?.instiute}
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
          </div>
        </div>
      </Paper>
    </>
  );
};

export default AnnualDemand;
