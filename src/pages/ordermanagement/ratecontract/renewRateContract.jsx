import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { Paper, TableBody } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import moment from "moment";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";

import Basicbutton from "../../../components/button/basicbutton";
import { useNavigate } from "react-router-dom";
import {
  postRenewRateContract,
  postRenewRateContractResponse,
  renewRateContract,
  renewRateContractResponse,
} from "../../../store/ordermanagement/action";
import { useLocation } from "react-router-dom";
import BackButon from "../../../components/button/backButon";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../../common/constant/constant";
import dayjs from "dayjs";
import CustDatepicker from "../../../components/datepicker/custDatepicker";
const RenewRateContractDesk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state;
  console.log("state", state);
  const renewRateContractResp = useSelector(
    (state) => state?.ordermanaagement?.renewRateContrctResp
  );
  const postRenewRateContractResp = useSelector(
    (state) => state?.ordermanaagement?.postRenewRateContractResp
  );
  console.log("renewRateContractResp", renewRateContractResp);
  const [tableData, setTableData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [tenderDate, setTenderDate] = useState(null);
  const [contractFromDate, setContractFromDate] = useState(null);
  const [contractToDate, setContractToDate] = useState(null);
  const [contractDate, setContractDate] = useState(null);

  const column = useMemo(() => [
    {
      id: "drugId",
      name: "DRUG ID",
      sortable: false,
    },

    {
      id: "drugName",
      name: "GENERIC NAME",
      sortable: false,
    },

    {
      id: "manuFacName",
      name: "MANUFACTURER NAME",
      sortable: false,
    },
    {
      id: "brandId",
      name: "BRAND ID",
      sortable: false,
    },
    {
      id: "unit",
      name: "UNIT",
      sortable: false,
    },
    {
      id: "rate",
      name: "RATE",
      sortable: false,
    },
    {
      id: "tax",
      name: "TAX",
      sortable: false,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(renewRateContract({ id: state }));
    }
    return () => {
      isApiSubcribed = false;
      dispatch(renewRateContractResponse(""));
    };
  }, [state]);

  useEffect(() => {
    if (renewRateContractResp && renewRateContractResp?.status === 200) {
      setTableData(
        renewRateContractResp?.data?.getRateContactInfoById?.druglist
      );
      setContractFromDate(
        renewRateContractResp?.data?.getRateContactInfoById?.contactFrom
      );
      setContractToDate(
        renewRateContractResp?.data?.getRateContactInfoById?.contactTo
      );
      setTenderDate(
        renewRateContractResp?.data?.getRateContactInfoById?.tenderDate
      );
      setContractDate(
        renewRateContractResp?.data?.getRateContactInfoById?.contactDate
      );

      setLoading(false);
    } else if (renewRateContractResp && renewRateContractResp?.status == 400) {
      setLoading(false);
      // dispatch(getRateContractDeskListResponse(""));
      toastMessage("Renew Rate Contract Desk", "", "error");
    }
  }, [renewRateContractResp]);

  useEffect(() => {
    if (
      postRenewRateContractResp &&
      postRenewRateContractResp?.status ===
        NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (
        postRenewRateContractResp &&
        postRenewRateContractResp?.data?.status === SERVER_STATUS_CODE?.SUCCESS
      ) {
        toastMessage(
          "RATE CONTRACT DESK",
          postRenewRateContractResp?.data?.message
        );
        dispatch(postRenewRateContractResponse(""));
        navigate("/openRateContractListing");
      } else if (
        postRenewRateContractResp &&
        postRenewRateContractResp?.data?.status === SERVER_STATUS_CODE?.FAILED
      ) {
        toastMessage(
          "RATE CONTRACT DESK",
          postRenewRateContractResp?.data?.message
        );
        dispatch(postRenewRateContractResponse(""));
      }
    } else if (
      postRenewRateContractResp &&
      postRenewRateContractResp?.status == 400
    ) {
      toastMessage(
        "Renew Rate Contract Desk",
        postRenewRateContractResp?.data?.message,
        "error"
      );
    }
  }, [postRenewRateContractResp]);

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-1 mb-2">
          <div className="d-flex justify-content-between ">
            <BackButon routePath="openRateContractListing" />
          </div>
        </div>
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">RATE CONTRACT DETAILS</p>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-around">
            <div>
              <div className="col-auto">
                <label htmlFor="" className="col-form-label">
                  Supplier Name :{" "}
                </label>
              </div>
              <div className="col-auto">
                {" "}
                {
                  renewRateContractResp?.data?.getRateContactInfoById
                    ?.supplierName
                }
              </div>
            </div>
            <div>
              <div className="col-auto">
                <label htmlFor="" className="col-form-label">
                  Store ID :
                </label>
              </div>
              <div className="col-auto">
                {" "}
                {renewRateContractResp?.data?.getRateContactInfoById?.id}
              </div>
            </div>

            <div>
              <div className="col-auto">
                <label htmlFor="" className="col-form-label">
                  Tender No :
                </label>
              </div>
              <div className="col-auto"></div>
            </div>

            <div>
              <div className="col-auto">
                <label htmlFor="" className="col-form-label">
                  Contract ID :
                </label>
              </div>
              <div className="col-auto">
                {" "}
                {renewRateContractResp?.data?.getRateContactInfoById?.tenderNo}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-around">
            <div>
              <div className="col-auto">
                <label htmlFor="" className="col-form-label">
                  Tender Date :
                </label>
              </div>
              <div className="col-auto">
                <CustDatepicker
                  key="tenderDate"
                  value={tenderDate}
                  name="tenderDate"
                  inputFormat="DD/MM/YYYY"
                  // disablePast={name === "endDate" ? true : false}
                  onChange={(newValue) => {
                    //setFieldValue(name, newValue);
                    setTenderDate(newValue);
                  }}
                />
              </div>
            </div>

            <div>
              <div className="col-auto">
                <label htmlFor="" className="col-form-label">
                  Contract From :
                </label>
              </div>
              <div className="col-auto">
                {" "}
                <CustDatepicker
                  key="contractFromDate"
                  value={contractFromDate}
                  name="contractFromDate"
                  inputFormat="DD/MM/YYYY"
                  // disablePast={name === "endDate" ? true : false}
                  onChange={(newValue) => {
                    //setFieldValue(name, newValue);
                    setContractFromDate(newValue);
                  }}
                />
              </div>
            </div>

            <div>
              <div className="col-auto">
                <label htmlFor="" className="col-form-label">
                  Contract To :
                </label>
              </div>
              <div className="col-auto">
                {" "}
                <CustDatepicker
                  key="contractToDate"
                  value={contractToDate}
                  name="contractToDate"
                  inputFormat="DD/MM/YYYY"
                  // disablePast={name === "endDate" ? true : false}
                  onChange={(newValue) => {
                    //setFieldValue(name, newValue);
                    setContractToDate(newValue);
                  }}
                />
              </div>
            </div>

            <div>
              <div className="col-auto">
                <label htmlFor="" className="col-form-label">
                  Contract Date :
                </label>
              </div>
              <div className="col-auto">
                {" "}
                <CustDatepicker
                  key="contractDate"
                  value={contractDate}
                  name="contractDate"
                  inputFormat="DD/MM/YYYY"
                  // disablePast={name === "endDate" ? true : false}
                  onChange={(newValue) => {
                    //setFieldValue(name, newValue);
                    setContractDate(newValue);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Drug List" />
        </div>

        <Paper>
          <div className="row">
            <div className="col-12">
              <TableComponent columns={column}>
                <TableBody>
                  {loading ? (
                    <TableRowLaoder />
                  ) : (
                    tableData &&
                    tableData?.map((row, index) => {
                      return (
                        <StyledTableRow>
                          {column.map((d, k) => {
                            if (
                              d.id === "contactTo" ||
                              d.id === "contactFrom" ||
                              d.id === "contactDate" ||
                              d.id === "tenderDate"
                            ) {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  {moment(row[d.id]).format("DD/MM/YYYY")}
                                </StyledTableCell>
                              );
                            } else {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  {row[d.id]}
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
            </div>
            <div className="d-flex justify-content-center">
              <Basicbutton
                buttonText="Save"
                className="btn btn-primary rounded-0 mb-2"
                onClick={() => {
                  dispatch(
                    postRenewRateContract({
                      id: state,
                      contractDate: formatDate(contractDate),
                      contactTo: formatDate(contractToDate),
                      contactFrom: formatDate(contractFromDate),
                      tenderDate: formatDate(tenderDate),
                    })
                  );
                }}
              />
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default RenewRateContractDesk;
