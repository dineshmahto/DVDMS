import React, { useState, useMemo, useEffect } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import SearchField from "../../../components/search/search";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import { Paper, TableBody } from "@mui/material";
import moment from "moment";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../../components/checkbox/checkbox";
import {
  getStockUpdateRackList,
  getStockUpdateRackListResponse,
} from "../../../store/stock/action";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";

const UpdateStockRack = () => {
  const dispatch = useDispatch();
  const updateStockRackResponse = useSelector(
    (state) => state?.stock?.updateStockRackListResponse
  );
  console.log("updateStockRackResponse", updateStockRackResponse);

  const [tableData, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    check: 0,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const columns = useMemo(() => [
    {
      id: "storeName",
      name: "STORE NAME",
      sortable: true,
    },

    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "programName",
      name: "PROGRAMME NAME",
      sortable: false,
      type: "select",
    },
    {
      id: "batchNo",
      name: "BATCH NO.",
      sortable: true,
    },
    {
      id: "expDate",
      name: "EXPIRY DATE",
      sortable: true,
    },
    {
      id: "mfgDate",
      name: "MANUFACTURE DATE",
      sortable: true,
    },
    {
      id: "dayToExpire",
      name: "NO OF DAYS TO EXP",
      sortable: true,
    },
    {
      id: "stockQty",
      name: "AVAIL. QTY",
      sortable: true,
    },
    {
      id: "unitPrice",
      name: "UNIT. PRICE",
      sortable: true,
    },
    {
      id: "institute",
      name: "INSTITUTE",
      sortable: true,
    },
    {
      id: "rack",
      name: "RACK",
      sortable: false,
    },
  ]);
  const handlePageChange = (event, newPage) => {
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
  };
  const handleCheckboxChange = (e) => {
    console.log("checked", e.target.checked ? 1 : 0);
    setController({
      ...controller,
      check: e.target.checked ? 1 : 0,
    });
  };
  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getStockUpdateRackList({
            ...controller,
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 1000);
    }
    return () => {
      dispatch(getStockUpdateRackListResponse(""));
      clearTimeout();
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (updateStockRackResponse && updateStockRackResponse?.status === 200) {
      setTotalRows(updateStockRackResponse?.data?.pageList?.totalElements);
      setTableData(updateStockRackResponse?.data?.pageList?.content);
      dispatch(getStockUpdateRackListResponse(""));
      setLoading(false);
    }
  }, [updateStockRackResponse]);
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">STOCK UPDATE RACK</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Stock Management Desk" />
      </div>

      <div className="row mb-1">
        <div className="d-flex justify-content-between m-2">
          <Checkbox
            label="List for all Stores"
            name="forAllStore"
            type="checkbox"
            onChange={(e) => handleCheckboxChange(e)}
            className="shawdow-none"
          />
          <SearchField
            className="m-2 "
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
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  tableData.length > 0 &&
                  tableData.map((data, index) => (
                    <StyledTableRow key={data.id}>
                      {columns.map((d, k) => {
                        if (d.id === "rack") {
                          return (
                            <StyledTableCell key={k} padding="none">
                              <BasicInput
                                value={data?.rack}
                                type="number"
                                onChange={(e) => {
                                  console.log("value", e?.target?.value);
                                }}
                                placeholder="Enter the Quantity"
                              />
                            </StyledTableCell>
                          );
                        } else if (d.id === "mfgDate" || d.id === "expDate") {
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
        {tableData && tableData?.length > 0 ? (
          <div className="row  mt-2">
            <div className="col-12">
              <div className="d-flex justify-content-center mb-1">
                <Basicbutton
                  icon={
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                  }
                  type="submit"
                  buttonText="Update"
                  className="warning rounded-0 me-1"
                />
                <Basicbutton
                  icon={<FontAwesomeIcon icon={faXmark} className="me-1" />}
                  type="button"
                  buttonText="Cancel"
                  className="danger rounded-0"
                />
              </div>
            </div>
          </div>
        ) : null}
      </Paper>
    </>
  );
};

export default UpdateStockRack;
