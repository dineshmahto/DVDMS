import React, { useState, useMemo, useEffect } from "react";
import BasicButton from "src/components/button/basicbutton";
import HorizonatalLine from "src/components/horizontalLine/horizonatalLine";
import TableComponent from "src/components/tables/datatable/tableComponent";
import { TableBody, Paper } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import toastMessage from "src/common/toastmessage/toastmessage";
import TableRowLaoder from "src/components/tables/datatable/tableRowLaoder";
import EmptyRow from "src/components/tables/datatable/emptyRow";
import StyledTableRow from "src/components/tables/datatable/customTableRow";
import StyledTableCell from "src/components/tables/datatable/customTableCell";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../common/constant/constant";
import { getPoApprovedList } from "src/store/supplier/action";
import { useNavigate } from "react-router-dom";
import BasicTextAreaField from "src/components/inputbox/textarea";
import BackButon from "src/components/button/backButon";
const AcceptanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const poApprovedListResp = useSelector(
    (state) => state.admin.purchaseOrderListResponse
  );
  const cancelPoResp = useSelector(
    (state) => state?.supplier?.poApprovedListResp
  );
  console.log("poApprovedListResp", poApprovedListResp);
  console.log("cancelPores", cancelPoResp);
  const [tableData, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  const [isCancelable, setIsCancelable] = useState(false);
  const [open, setOpen] = useState([]);
  const columns = useMemo(() => [
    {
      id: "id",
      name: "SL.NO",
      sortable: true,
    },
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
    },
    {
      id: "orderedQty",
      name: "ORDERED QTY",
      sortable: false,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getPoApprovedList({
          pageNumber: 0,
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
      poApprovedListResp &&
      poApprovedListResp?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setTotalRows(poApprovedListResp?.data?.pageList?.totalElements);
      setTableData(poApprovedListResp?.data?.pageList?.content);
      setLoading(false);
    } else if (
      poApprovedListResp &&
      poApprovedListResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      setLoading(false);
      toastMessage("Supplier List", "Something went wrong", "error");
    }
  }, [poApprovedListResp]);

  useEffect(() => {
    if (
      cancelPoResp &&
      cancelPoResp?.status === NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (cancelPoResp?.data?.status === SERVER_STATUS_CODE.SUCCESS) {
        setSelectedRow([]);
        setSelected([]);

        setShowDialog(false);
        toastMessage("CANCEL PO", cancelPoResp?.data?.message, "success");
      } else if (cancelPoResp?.data?.status === SERVER_STATUS_CODE.FAILED) {
        setSelectedRow([]);
        setSelected([]);
        setShowDialog(false);
        toastMessage("CANCEL PO", cancelPoResp?.data?.message, "error");
      }
    } else if (
      cancelPoResp &&
      cancelPoResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      setSelectedRow([]);
      setSelected([]);
      setShowDialog(false);
      toastMessage("CANCEL PO", "Something went wrong", "error");
    } else if (
      cancelPoResp &&
      cancelPoResp?.status === NETWORK_STATUS_CODE?.PAGE_NOT_FOUND
    ) {
      setShowDialog(false);
      toastMessage("CANCEL PO", cancelPoResp?.data?.message, "error");
    }
  }, [cancelPoResp]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">ACCEPTANCE DESK</p>
          </div>
        </div>
        <div className="row">
          <BackButon routePath="/" />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="storeName">
                Supplier Name
              </label>
            </div>
            <div className="col-auto"></div>
          </div>
          <div className=" col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="notificationStatus">
                PO Number
              </label>
            </div>
            <div className="col-auto"></div>
          </div>
          <div className=" col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="notificationStatus">
                PO Date
              </label>
            </div>
            <div className="col-auto"></div>
          </div>
          <div className=" col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="notificationStatus">
                Consignee Warehouse
              </label>
            </div>
            <div className="col-auto"></div>
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Purchase Order Management Desk" />
        </div>

        <Paper elevation={3} className="mb-2">
          <div className="row">
            <div className="col-12">
              <TableComponent columns={columns}>
                <TableBody>
                  {loading ? (
                    <TableRowLaoder />
                  ) : (
                    tableData &&
                    tableData.length > 0 &&
                    tableData.map((row, index) => (
                      <>
                        <StyledTableRow key={row.id}>
                          {columns.map((d, k) => {
                            return (
                              <StyledTableCell padding="none">
                                {row[d.id]}
                              </StyledTableCell>
                            );
                          })}
                        </StyledTableRow>
                      </>
                    ))
                  )}
                  <EmptyRow loading={loading} tableData={tableData} />
                </TableBody>
              </TableComponent>
            </div>
          </div>
        </Paper>
      </div>

      <div className="row d-flex justify-content-center">
        <BasicTextAreaField rows={1} onChange={(e) => {}} />
      </div>

      <div className="row d-flex justify-content-center">
        <BasicButton buttonText="Accept" onClick={() => {}} />
        <BasicButton buttonText="Reject" onClick={() => {}} />
      </div>
    </>
  );
};

export default AcceptanceForm;
