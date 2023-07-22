import React, { useState, useMemo, useEffect } from "react";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import { TableBody } from "@mui/material";
import { faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../../components/tables/datatable/tableRowLaoder";
import BasicTextAreaField from "../../../../components/inputbox/textarea";
import { Paper } from "@mui/material";
import BackButon from "../../../../components/button/backButon";
import { useSelector } from "react-redux";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../../../common/constant/constant";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  approveAnnualDemand,
  approveAnnualDemandResponse,
  getAnnualDemandByNotifId,
} from "../../../../store/ordermanagement/action";
const OpenDemandApprovalForm = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log("state", state);
  const annualDemandByIdResp = useSelector(
    (state) => state?.ordermanaagement?.annualDemandNotiByIdResp
  );

  const annualDemandApprovalResponse = useSelector(
    (state) => state?.ordermanaagement?.annualDemandApprovalResp
  );
  console.log("annualDemandNotiByIdResp", annualDemandByIdResp);
  console.log("annualDemandApprovalResponse", annualDemandApprovalResponse);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [financialYear, setFinancialYear] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [notificationId, setNotificationId] = useState("");
  const [yourStore, setYourStore] = useState("");
  const [toStore, setToStore] = useState("");
  const columns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
    },

    {
      id: "programName",
      name: "PROGRAM NAME",
      sortable: false,
    },

    {
      id: "availableQty",
      name: "AVAILABLE QUANTITY",
      sortable: false,
    },
    {
      id: "requestQty",
      name: "REQUEST QTY",
      sortable: false,
    },
  ]);

  useEffect(() => {
    if (state != null) {
      console.log("state", state);
      dispatch(getAnnualDemandByNotifId({ id: parseInt(state) }));
    } else {
      navigate("/openDemandApproval", { replace: true });
    }
    return () => {};
  }, [state]);
  useEffect(() => {
    if (
      annualDemandByIdResp &&
      annualDemandByIdResp?.status === NETWORK_STATUS_CODE?.SUCCESS
    ) {
      console.log(
        "Data",
        annualDemandByIdResp?.data?.getRequestData?.requestDetail
      );
      setTableData(annualDemandByIdResp?.data?.getRequestData?.requestDetail);
      setNotificationId(annualDemandByIdResp?.data?.getRequestData?.Id);
      setFinancialYear(
        annualDemandByIdResp?.data?.getRequestData?.financialDate
      );
      setLastDate(annualDemandByIdResp?.data?.getRequestData?.lastDate);
      setToStore(annualDemandByIdResp?.data?.getRequestData?.toStore);
      setYourStore(annualDemandByIdResp?.data?.getRequestData?.yourStore);
    } else if (
      annualDemandByIdResp &&
      annualDemandByIdResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage("ANNUAL DEMAND", annualDemandByIdResp?.data?.message);
    }
  }, [annualDemandByIdResp]);

  useEffect(() => {
    if (
      annualDemandApprovalResponse &&
      annualDemandApprovalResponse?.status ===
        NETWORK_STATUS_CODE?.CREATED_SUCCESSFULLY
    ) {
      if (
        annualDemandApprovalResponse?.data?.status ===
        SERVER_STATUS_CODE?.SUCCESS
      ) {
        toastMessage(
          "APPROVAL DESK",
          annualDemandApprovalResponse?.data?.message
        );
        dispatch(approveAnnualDemandResponse(""));
        navigate("/openDemandApproval");
      } else if (
        annualDemandApprovalResponse?.data?.status ===
        SERVER_STATUS_CODE?.FAILED
      ) {
        toastMessage(
          "APPROVAL DESK",
          annualDemandApprovalResponse?.data?.message
        );
        dispatch(approveAnnualDemandResponse(""));
      }
    } else if (
      annualDemandApprovalResponse &&
      annualDemandApprovalResponse?.status ===
        NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage(
        "ANNUAL DEMAND",
        annualDemandApprovalResponse?.data?.message
      );
      dispatch(approveAnnualDemandResponse(""));
    }
  }, [annualDemandApprovalResponse]);
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">APPORVAL DESK</p>
        </div>
      </div>
      <BackButon buttonText="Back" routePath="openDemandApproval" />
      <div className="row d-flex justify-content-start mb-2">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="financialYear">
                Financial Year:{financialYear}
              </label>
            </div>

            <div className="col-auto">
              <label className="labellineHeight" htmlFor="NotificationId">
                Notification ID:{notificationId}
              </label>
            </div>

            <div className="col-auto">
              <label className="labellineHeight" htmlFor="lastDate">
                Last Date:{lastDate}
              </label>
            </div>
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="storeName">
                Your Store:
              </label>
            </div>
            <div className="col-auto">{yourStore}</div>

            <div className="col-auto">
              <label className="labellineHeight" htmlFor="storeName">
                Reporting Store:
              </label>
            </div>
            <div className="col-auto">{toStore}</div>
          </div>
        </div>
      </div>
      <HorizonatalLine text="Drug Details" />
      <div className="row">
        <div className="col-12">
          <TableComponent columns={columns}>
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
                        {data?.drugName}
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {data?.programName}
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {data?.availableQty}
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {data?.requestQty}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              )}
              <EmptyRow loading={loading} tableData={tableData} />
            </TableBody>
          </TableComponent>

          {tableData && tableData?.length > 0 ? (
            <>
              <div className="row">
                <div className="d-flex justify-content-center">
                  <label>Remarks </label>
                  <BasicTextAreaField
                    cols={20}
                    row={5}
                    type="textarea"
                    onChange={(e) => setRemarks(e.target?.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="d-flex justify-content-center">
                  <Basicbutton
                    buttonText="Approve"
                    className="btn btn-primary rounded-0 me-2 mt-2"
                    onClick={() => {
                      dispatch(
                        approveAnnualDemand({ id: state, remarks: remarks })
                      );
                    }}
                  />

                  <Basicbutton
                    buttonText="Reject"
                    className="btn btn-primary rounded-0 mt-2"
                    onClick={() => {
                      console.log("clicked");
                    }}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default OpenDemandApprovalForm;
