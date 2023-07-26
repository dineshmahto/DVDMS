import React, { useState, useMemo, useEffect, useCallback } from "react";
import TableComponent from "src/components/tables/datatable/tableComponent";
import TablePagination from "src/components/tables/datatable/tablepagination";
import { TableBody } from "@mui/material";
import SearchField from "../../../components/search/search";
import { faSearch, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";

import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "src/common/toastmessage/toastmessage";
import TableRowLaoder from "src/components/tables/datatable/tableRowLaoder";
import StyledTableRow from "src/components/tables/datatable/customTableRow";
import StyledTableCell from "src/components/tables/datatable/customTableCell";
import EmptyRow from "src/components/tables/datatable/emptyRow";

import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
  SORTINGORDER,
} from "../../../common/constant/constant";
import Basicbutton from "src/components/button/basicbutton";
import { getReceivedPoChallanListResponse } from "src/store/receiving/action";

const ReceivePoChallan = () => {
  const dispatch = useDispatch();
  const receivedPoChallanListResp = useSelector(
    (state) => state?.receiving?.receivedPoChallanListResp
  );
  console.log("receivedPoChallanListResp", receivedPoChallanListResp);
  let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState(SORTINGORDER.ASC);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const columns = useMemo(() => [
    {
      id: "poNo",
      name: "PO NO.",
      sortable: true,
    },

    {
      id: "challanNumber",
      name: "CHALLAN NUMBER",
      sortable: true,
    },

    {
      id: "challanDate",
      name: "CHALLAN DATE",
      sortable: true,
    },

    {
      id: "supllierName",
      name: "SUPPLIER NAME",
      sortable: true,
    },
    {
      id: "tranpName",
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
      sortable: false,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
    }
    return () => {
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (
      receivedPoChallanListResp &&
      receivedPoChallanListResp?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setTotalRows(receivedPoChallanListResp?.data?.pageList?.totalElements);
      setTableData(receivedPoChallanListResp?.data?.pageList?.content);
      setLoading(false);
      dispatch(getReceivedPoChallanListResponse(""));
    } else if (
      receivedPoChallanListResp &&
      receivedPoChallanListResp?.status == NETWORK_STATUS_CODE.BAD_REQUEST
    ) {
      setLoading(false);
      dispatch(getReceivedPoChallanListResponse(""));
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [receivedPoChallanListResp]);

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

    handleSorting(accessor, sortOrder);
  };
  const handleSorting = useCallback(
    (sortField, sortOrder) => {
      if (sortField) {
        const sorted = [...tableData].sort((a, b) => {
          if (a[sortField] === null) return 1;
          if (b[sortField] === null) return -1;
          if (a[sortField] === null && b[sortField] === null) return 0;

          return (
            a[sortField]
              .toString()
              .localeCompare(b[sortField].toString(), "en", {
                numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
          );
        });
        setSelected([]);

        setTableData(sorted);
      }
    },
    [sortField, order, tableData]
  );

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
          <p className="fs-6">CHALLAN RECEIVE / VERIFY</p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          {selected.length > 0 ? (
            <>
              <Basicbutton
                type="button"
                buttonText="Receive"
                outlineType={true}
                className="danger btn-sm ms-1 rounded-0"
                disabled={selected.length > 0 ? null : "disabled"}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="row mb-2">
        <div className="d-flex justify-content-end">
          <SearchField
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
                      <StyledTableRow key={data?.id}>
                        <StyledTableCell padding="none">
                          <Checkbox
                            onClick={(event) => handleClick(event, index, data)}
                            color="primary"
                            checked={selected.includes(index)}
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${index}`,
                            }}
                          />
                        </StyledTableCell>
                        {columns.map((d, k) => {
                          if (d.id === "challanData") {
                            return (
                              <StyledTableCell padding="none">
                                {moment(data[d.id]).format("DD/MM/YYYY")}
                              </StyledTableCell>
                            );
                          } else {
                            return (
                              <StyledTableCell padding="none">
                                {data[d.id]}
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
    </>
  );
};

export default ReceivePoChallan;
