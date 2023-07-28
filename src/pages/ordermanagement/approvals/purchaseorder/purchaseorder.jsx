import React, {
  useState,
  useMemo,
  useEffect,
  lazy,
  Suspense,
  useCallback,
} from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import SearchField from "../../../../components/search/search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalDeskList } from "../../../../store/ordermanagement/action";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@mui/material";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import {
  getPurchaseOrderList,
  getPurchaseOrderListResponse,
} from "../../../../store/admin/action";
import TableRowLaoder from "../../../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";
const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const tempData = [
  {
    id: 1,
    storeName: "STATE WAREHOUSE",
    drugName: "PARACETAMOL TAB. 500MG",
    progName: "COVID19",
    batchNo: "	21443792",
    expDate: "NOV-2024",
    mfgDate: "DEC-2021",
    dToExp: "597",
    avalQty: "579",
    rack: "0 ",
    instiute: "BOTH(NHM & DHS)",
    source: "ECRP",
  },
];
const PurchaseOrder = () => {
  const dispatch = useDispatch();
  const purchaseOrderListApprovalResponse = useSelector(
    (state) => state.ordermanaagement?.purchaseOrderListResponse
  );
  console.log(
    "purchaseOrderListApprovalResponse",
    purchaseOrderListApprovalResponse
  );
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState(tempData);
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
      id: "id",
      name: "SL.NO",
      sortable: true,
    },

    {
      id: "poRef",
      name: "PO NO",
      sortable: true,
    },

    {
      id: "poDate",
      name: "PO DATE",
      sortable: true,
    },
    {
      id: "supplierName",
      name: "SUPPLIER NAME",
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
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "institute",
      name: "INSTITUTE",
      sortable: true,
    },
    {
      id: "tax",
      name: "TAX PO VALUE(INC TAX)",
      sortable: true,
    },
    {
      id: "poStatus",
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
          getPurchaseOrderList({
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 500);
    }
    return () => {
      clearTimeout();
      dispatch(getPurchaseOrderListResponse(""));
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (
      purchaseOrderListApprovalResponse &&
      purchaseOrderListApprovalResponse?.status === 200
    ) {
      if (
        purchaseOrderListApprovalResponse?.data?.pageList?.content &&
        purchaseOrderListApprovalResponse?.data?.pageList?.content?.length > 0
      ) {
        setTotalRows(
          purchaseOrderListApprovalResponse?.data?.pageList?.totalElements
        );
        setTableData(
          purchaseOrderListApprovalResponse?.data?.pageList?.content
        );
      }
      dispatch(getPurchaseOrderListResponse(""));
      setLoading(false);
    } else if (
      purchaseOrderListApprovalResponse &&
      purchaseOrderListApprovalResponse?.status == 400
    ) {
      setLoading(false);
      dispatch(getPurchaseOrderListResponse(""));
      toastMessage("Purchase Order", "Try again", "error");
    }
  }, [purchaseOrderListApprovalResponse]);

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
          <p className="fs-6">PURCHASE ORDER</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start mb-2">
        <div className="col-6">
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
              <label>PO Status</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "1",
                  label: "Approval Pending",
                }}
                options={[
                  {
                    value: "1",
                    label: "Approval Pending",
                  },
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
                  buttonText="Approve / Reject PO"
                  className="primary rounded-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="Purchase Order Management Desk" />
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
                            onClick={(event) => handleClick(event, index, data)}
                            color="primary"
                            checked={selected.includes(index)}
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${index}`,
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data.poRef}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {moment(data.poDate).format("DD/MM/YYYY")}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.supplierName}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.consignee}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.programName}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.drugName}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.instiute}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.tax}
                        </StyledTableCell>
                        <TableCell padding="none">{data?.poStatus}</TableCell>
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

export default PurchaseOrder;
