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
import {
  approvePoInfo,
  approvePoInfoResponse,
  getPoApprovedList,
  getPoInfoById,
  rejectPoInfo,
  rejectPoInfoResponse,
} from "src/store/supplier/action";
import { useNavigate } from "react-router-dom";
import BasicTextAreaField from "src/components/inputbox/textarea";
import BackButon from "src/components/button/backButon";
import { useLocation } from "react-router-dom";
const AcceptanceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log("state", state);
  const poInfoIdByResp = useSelector((state) => state?.supplier?.poInfoIdResp);
  const approvePoInfoResp = useSelector(
    (state) => state?.supplier?.approvePoInfoResp
  );
  const rejectPoInfoResp = useSelector(
    (state) => state?.supplier?.rejectPoInfoResp
  );
  console.log("approvePoInfoResp", approvePoInfoResp);
  console.log("rejectPoInfoResp", rejectPoInfoResp);
  console.log("poInfoIdByResp", poInfoIdByResp);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitData, setSubmitData] = useState({
    remarks: "",
    id: state?.id,
  });
  const columns = useMemo(() => [
    {
      id: "sl",
      name: "SL.NO",
      sortable: true,
    },
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
    },
    {
      id: "orderQty",
      name: "ORDERED QTY",
      sortable: false,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      if (state != null) {
        setLoading(true);
        dispatch(
          getPoInfoById({
            id: state?.id,
          })
        );
      } else {
        navigate("/supplierInterface");
      }
    }
    return () => {
      isApiSubcribed = false;
    };
  }, [state]);

  useEffect(() => {
    if (
      poInfoIdByResp &&
      poInfoIdByResp?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setTableData(poInfoIdByResp?.data?.getPoInfoById.drugInfo);
      setLoading(false);
    } else if (
      poInfoIdByResp &&
      poInfoIdByResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      setLoading(false);
      toastMessage("Supplier List", "Something went wrong", "error");
    }
  }, [poInfoIdByResp]);

  useEffect(() => {
    if (
      rejectPoInfoResp &&
      rejectPoInfoResp?.status === NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (rejectPoInfoResp?.data?.status === SERVER_STATUS_CODE.SUCCESS) {
        toastMessage(
          "ACCEPTANCE FORM REJECT",
          rejectPoInfoResp?.data?.message,
          "success"
        );
        dispatch(rejectPoInfoResponse(""));
        navigate("/supplierInterface");
      } else if (rejectPoInfoResp?.data?.status === SERVER_STATUS_CODE.FAILED) {
        toastMessage(
          "ACCEPTANCE FORM REJECT",
          rejectPoInfoResp?.data?.message,
          "error"
        );
        dispatch(rejectPoInfoResponse(""));
      }
    } else if (
      rejectPoInfoResp &&
      rejectPoInfoResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage("ACCEPTANCE FORM REJECT", "Something went wrong", "error");
      dispatch(rejectPoInfoResponse(""));
    } else if (
      rejectPoInfoResp &&
      rejectPoInfoResp?.status === NETWORK_STATUS_CODE?.PAGE_NOT_FOUND
    ) {
      toastMessage(
        "ACCEPTANCE FORM REJECT",
        rejectPoInfoResp?.data?.message,
        "error"
      );
      dispatch(rejectPoInfoResponse(""));
    }
  }, [rejectPoInfoResp]);

  useEffect(() => {
    if (
      approvePoInfoResp &&
      approvePoInfoResp?.status === NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (approvePoInfoResp?.data?.status === SERVER_STATUS_CODE.SUCCESS) {
        toastMessage(
          "ACCEPTANCE FORM APPROVE",
          approvePoInfoResp?.data?.message,
          "success"
        );
        dispatch(approvePoInfoResponse(""));
        navigate("/supplierInterface");
      } else if (
        approvePoInfoResp?.data?.status === SERVER_STATUS_CODE.FAILED
      ) {
        toastMessage(
          "ACCEPTANCE FORM APPROVE",
          approvePoInfoResp?.data?.message,
          "error"
        );
        dispatch(approvePoInfoResponse(""));
      }
    } else if (
      approvePoInfoResp &&
      approvePoInfoResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage("ACCEPTANCE FORM APPROVE", "Something went wrong", "error");
      dispatch(approvePoInfoResponse(""));
    } else if (
      approvePoInfoResp &&
      approvePoInfoResp?.status === NETWORK_STATUS_CODE?.PAGE_NOT_FOUND
    ) {
      toastMessage(
        "ACCEPTANCE FORM APPROVE",
        approvePoInfoResp?.data?.message,
        "error"
      );
      dispatch(approvePoInfoResponse(""));
    }
  }, [approvePoInfoResp]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">ACCEPTANCE DESK</p>
          </div>
        </div>
        <div className="row">
          <BackButon routePath="/supplierInterface" />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight fw-bold" htmlFor="storeName">
                Supplier Name :{" "}
                {poInfoIdByResp?.data?.getPoInfoById?.supplierInfo?.supplierId}
              </label>
            </div>
          </div>
          <div className=" col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label
                className="labellineHeight fw-bold"
                htmlFor="notificationStatus"
              >
                PO Number : {poInfoIdByResp?.data?.getPoInfoById?.poNo}
              </label>
            </div>
          </div>
          <div className=" col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label
                className="labellineHeight fw-bold"
                htmlFor="notificationStatus"
              >
                PO Date: {poInfoIdByResp?.data?.getPoInfoById?.poDate}
              </label>
            </div>
          </div>
          <div className=" col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label
                className="labellineHeight fw-bold"
                htmlFor="notificationStatus"
              >
                Consignee Warehouse :{" "}
                {
                  poInfoIdByResp?.data?.getPoInfoById?.supplierInfo
                    ?.consigneeInfo
                }
              </label>
            </div>
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
                            if (d.id === "sl") {
                              return (
                                <StyledTableCell padding="none">
                                  {index + 1}
                                </StyledTableCell>
                              );
                            }
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

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 offset-md-3 offset-lg-3 offset-xl-3">
          <div className="col-auto">
            <label className="form-label">Remarks</label>
          </div>
          <div className="col-auto">
            <BasicTextAreaField
              rows={1}
              onChange={(e) => {
                setSubmitData({
                  ...submitData,
                  remarks: e.target.value.trim(),
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="d-flex justify-content-center">
          <BasicButton
            className="btn btn-primary rounded-0 me-1"
            buttonText="Accept"
            onClick={() => {
              if (submitData?.remarks === "") {
                toastMessage("ACCEPTANCE DESK", "Remarks is Required", "error");
              } else {
                dispatch(approvePoInfo(submitData));
              }
            }}
          />
          <BasicButton
            className="btn btn-danger rounded-0"
            buttonText="Reject"
            onClick={() => {
              if (submitData?.remarks === "") {
                toastMessage("ACCEPTANCE DESK", "Remarks is Required", "error");
              } else {
                dispatch(rejectPoInfo(submitData));
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AcceptanceForm;
