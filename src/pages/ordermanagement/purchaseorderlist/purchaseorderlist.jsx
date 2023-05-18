import React, { useState, useMemo, useEffect } from "react";
import BasicButton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import SelectOption from "../../../components/option/option";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import { TableBody, TableRow, TableCell, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { getPurchaseOrderList } from "../../../store/admin/action";
import moment from "moment";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
const PurchaseOrderList = () => {
  const dispatch = useDispatch();
  const purchaseOrderListResponse = useSelector(
    (state) => state.admin.purchaseOrderListResponse
  );
  console.log("purchaseOrderListResponse", purchaseOrderListResponse);
  const [tableData, setTableData] = useState([]);
  const [sortedData, handleSorting] = useSortableTable();
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = useMemo(() => [
    {
      id: "id",
      name: "SL.NO",
      sortable: true,
    },
    {
      id: "poRef",
      name: "PO.NO",
      sortable: true,
    },

    {
      id: "poDate",
      name: "PO DATE",
      sortable: true,
    },

    {
      id: "supplierName",
      name: "SUPPLIER NO",
      sortable: true,
    },
    {
      id: "consignee",
      name: "CONSIGNEE",
      sortable: true,
    },
    {
      id: "programName",
      name: "PROGRAMME NAME",
      sortable: true,
    },
    {
      id: "drugName",
      name: "DRUG NAME|ORDERED QTY| RECEIVED QTY",
      sortable: true,
    },
    {
      id: "tax",
      name: "TOTAL PO VALUE (INC TAX)",
      sortable: true,
    },
    {
      id: "poStatus",
      name: "STATUS",
      sortable: true,
    },
    {
      id: "dwonload",
      name: "VIEW/DOWNLOAD",
      sortable: false,
    },
  ]);
  const handlePageChange = (event, newPage) => {
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

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);

    handleSorting(accessor, sortOrder);
    console.log("sortedData", sortedData);
    setTableData(sortedData);
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getPurchaseOrderList({
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
      purchaseOrderListResponse &&
      purchaseOrderListResponse?.status === 200
    ) {
      setTotalRows(purchaseOrderListResponse?.data?.pageList?.totalElements);
      setTableData(purchaseOrderListResponse?.data?.pageList?.content);
      setLoading(false);
    } else if (
      purchaseOrderListResponse &&
      purchaseOrderListResponse?.status == 400
    ) {
      setLoading(false);
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [purchaseOrderListResponse]);
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">PURCHASE ORDER</p>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-start">
            <div className="me-3">
              <div className="row g-0">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="storeName">
                    Store Name
                  </label>
                </div>
                <div className="col-6">
                  <SelectOption id="storeName" data={[]} />
                </div>
              </div>
            </div>
            <div className=" col-4">
              <div className="row g-0">
                <div className="col-6 text-center">
                  <label
                    className="labellineHeight"
                    htmlFor="notificationStatus"
                  >
                    Notification Status
                  </label>
                </div>
                <div className="col-4">
                  <SelectOption id="notificationStatus" data={[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Purchase Order Management Desk" />
        </div>
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <BasicButton
              type="button"
              buttonText="Cancel PO"
              className="secondary btn-sm me-2 rounded-0"
              disabled={selected.length > 0 ? null : "disabled"}
              onClick={(e) => console.log("Selected Data", selectedRow)}
            />
            <BasicButton
              type="button"
              buttonText="Edit PO"
              className="secondary btn-sm rounded-0"
              disabled={selected.length > 0 ? null : "disabled"}
              onClick={(e) => console.log("Selected Data", selectedRow)}
            />
          </div>
        </div>
        <Paper>
          <div className="row mt-1">
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
          <div className="row">
            <div className="col-12">
              <TableComponent
                columns={columns}
                sortField={sortField}
                order={order}
                checkBoxRequired={true}
                handleSorting={handleSortingChange}
              >
                <TableBody>
                  {loading ? (
                    <TableRowLaoder />
                  ) : (
                    tableData &&
                    tableData?.length > 0 &&
                    tableData?.map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <StyledTableRow
                          role="checkbox"
                          aria-checked={selected.includes(index)}
                          tabIndex={-1}
                          key={row.id}
                          selected={selected.includes(index)}
                        >
                          <StyledTableCell padding="none">
                            <Checkbox
                              onClick={(event) =>
                                handleClick(event, index, row)
                              }
                              color="primary"
                              checked={selected.includes(index)}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </StyledTableCell>
                          {columns.map((d, k) => {
                            if (d.id === "poDate") {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  {moment(row[d.id]).format("DD/MM/YYYY")}
                                </StyledTableCell>
                              );
                            }
                            return (
                              <StyledTableCell key={k} padding="none">
                                {row[d.id]}
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
      </div>
    </>
  );
};

export default PurchaseOrderList;
