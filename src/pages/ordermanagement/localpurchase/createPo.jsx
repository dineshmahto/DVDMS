import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import NormalTableRow from "../../../components/tables/datatable/normalTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import { TableBody, Paper } from "@mui/material";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import CustomSelect from "../../../components/select/customSelect";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  createLocalPo,
  createLocalPoResponse,
  getLocalPoInfo,
  getLocalPoInfoResponse,
} from "../../../store/ordermanagement/action";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../../common/constant/constant";
import toastMessage from "../../../common/toastmessage/toastmessage";
import Basicbutton from "../../../components/button/basicbutton";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CustDatepicker from "../../../components/datepicker/custDatepicker";
import BasicTextAreaField from "../../../components/inputbox/textarea";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "react-bootstrap";
const AlertDialog = lazy(() => import("../../../components/dialog/dialog"));
const CreatePo = () => {
  const navigate = useNavigate();
  const getLocalPoInfoResp = useSelector(
    (state) => state?.ordermanaagement?.getLocalPORespInfo
  );
  const createLocalPoResp = useSelector(
    (state) => state?.ordermanaagement?.createLocalPoResp
  );
  console.log("getLocalPoInfoResp", getLocalPoInfoResp);
  console.log("createLocalPoResp", createLocalPoResp);
  const dispatch = useDispatch();
  const { state } = useLocation();

  console.log("state", state);
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [clone, setClone] = useState([]);
  const [notificationData, setNotificationData] = useState([]);
  const [message, setMessage] = useState("");
  const [drugData, setDrugData] = useState([]);
  const [programeList, setProgrameList] = useState([]);
  const [fundingSourceList, setFundingSourceList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [financialYearList, setFinancialYearList] = useState([]);
  const [termsAndCondition, setTermsCondition] = useState([]);
  const [showTax, setShowTax] = useState("");
  const [editData, setEditData] = useState({
    supplierId: "",
    fundingSourceId: "",
    programeId: "",
    financialYear: "",
    poDate: null,
    tax: "",
    poPrefernce: "",
    deliveryDays: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoding] = useState(false);
  const drugDetailColumn = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
    },
    {
      id: "packDesc",
      name: "PACKAGING DESCRIPTION",
      sortable: false,
    },
    {
      id: "unitPrice",
      name: "UNIT PRICE",
      sortable: false,
    },

    {
      id: "addStrip",
      name: "	ADD STRIP/BOTTLE",
      sortable: false,
    },
    {
      id: "total",
      name: "ADDED TOTAL UNIT",
      sortable: false,
    },
  ]);
  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };
  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(getLocalPoInfo());
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getLocalPoInfoResponse(""));
    };
  }, []);

  useEffect(() => {
    if (
      getLocalPoInfoResp &&
      getLocalPoInfoResp?.status === NETWORK_STATUS_CODE?.SUCCESS
    ) {
      if (getLocalPoInfoResp?.data?.status === SERVER_STATUS_CODE?.SUCCESS) {
        setLoading(false);
        setFundingSourceList(getLocalPoInfoResp?.data?.fundingSourceList);
        setProgrameList(getLocalPoInfoResp?.data?.programList);
        setSupplierList(getLocalPoInfoResp?.data?.supplierList);
        setTermsCondition(getLocalPoInfoResp?.data?.getTermsAndCondition);
        setFinancialYearList(getLocalPoInfoResp?.data?.getYearList);
        setEditData({
          ...editData,
          deliveryDays: getLocalPoInfoResp?.data?.getDeliveryDay?.deliveryDay,
          poPrefernce: getLocalPoInfoResp?.data?.getPoPrefix?.poPrefix,
        });
        setDrugData(getLocalPoInfoResp?.data?.drugList);
        setShowTax(getLocalPoInfoResp?.data?.poTax?.tax);
        dispatch(getLocalPoInfoResponse(""));
      } else if (
        getLocalPoInfoResp?.data?.status === SERVER_STATUS_CODE?.FAILED
      ) {
        console.log("message", getLocalPoInfoResp?.data?.amtExceed);
        setMessage(getLocalPoInfoResp?.data?.amtExceed);
        setShowDialog(true);
        dispatch(getLocalPoInfoResponse(""));
      }
    } else if (
      getLocalPoInfoResp &&
      getLocalPoInfoResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage("PO", getLocalPoInfoResp?.data?.message);
      dispatch(getLocalPoInfoResponse(""));
    }
  }, [getLocalPoInfoResp]);

  useEffect(() => {
    if (
      createLocalPoResp &&
      createLocalPoResp?.status === NETWORK_STATUS_CODE?.CREATED_SUCCESSFULLY
    ) {
      if (createLocalPoResp?.data?.status === SERVER_STATUS_CODE?.SUCCESS) {
        setIsLoding(false);
        navigate("/openPurchaseOrderList");
        toastMessage(
          "Create Local PO",
          createLocalPoResp?.data?.message,
          "success"
        );
        dispatch(createLocalPoResponse(""));
      } else if (
        createLocalPoResp?.data?.status === SERVER_STATUS_CODE?.FAILED
      ) {
        toastMessage(
          "Create Local PO",
          createLocalPoResp?.data?.message,
          "error"
        );
        dispatch(createLocalPoResponse(""));
      }
    } else if (
      createLocalPoResp &&
      createLocalPoResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage("PO", createLocalPoResp?.data?.message, "error");
      dispatch(createLocalPoResponse(""));
    } else if (
      createLocalPoResp &&
      createLocalPoResp?.status === NETWORK_STATUS_CODE?.PAGE_NOT_FOUND
    ) {
      setIsLoding(false);
      toastMessage("PO", createLocalPoResp?.data?.message, "error");
      dispatch(createLocalPoResponse(""));
    }
  }, [createLocalPoResp]);
  const handleTermsChange = (idx, id, e) => {
    const termClone = [...termsAndCondition];
    termClone[idx] = {
      ...termClone[idx],
      [id]: e,
    };
    console.log(termClone);
    setTermsCondition(termClone);
  };
  const handleChange = (idx, id, e) => {
    const clone = [...drugData];
    if (id === "addStrip") {
      clone[idx] = {
        ...clone[idx],
        [id]: e,
        ["total"]: parseInt(clone[idx]["packQty"]) * e,
      };
    } else {
      clone[idx] = {
        ...clone[idx],
        [id]: e,
      };
    }

    setDrugData(clone);
  };

  const handlePoSubmitValidataion = () => {
    setIsLoding(true);
    setTimeout(() => {
      console.log("submitData", editData, drugData);

      const filteredItem = [...drugData]?.filter((drugElement, index) => {
        if (
          drugElement.hasOwnProperty("total") &&
          drugElement.hasOwnProperty("unitPrice")
        ) {
          return drugElement;
        }
      });
      console.log("filteredItem", filteredItem);
      // const valid = [...drugData].every(
      //   (ele) =>
      //     ele?.hasOwnProperty("supplierListId") && ele?.hasOwnProperty("total")
      // );
      // console.log("valid", valid);
      // if (!valid) {
      //   console.log("drugData", drugData);
      //   toastMessage("GENERATE PO", "Fill all the Relevant Details");
      // } else {
      //   navigate("/generatePurchaseOrder", {
      //     state: {
      //       id: state[0]?.id,
      //       list: drugData,
      //       fundingSourceId: fundingSource,
      //       tax: tax,
      //       institueId: institue,
      //       poTypeId: poType,
      //     },
      //   });
      //   console.log("drugData", drugData);
      // }

      let data = {
        ...editData,
        drugList: filteredItem,
        termsAndCondition: termsAndCondition,
      };
      console.log("submitData", data);

      dispatch(createLocalPo(data));
    }, 5000);
  };
  const handleRedirect = () => {
    navigate("/stockListing");
  };

  const handleClose = (reason) => {
    const CLOSE_REASON = {
      BUTTON: "closeButtonClick",
      BACKDROP: "backdropClick",
      ESCAPE: "escapeKeyDown",
    };
    const IGNORED_REASONS = [CLOSE_REASON.BACKDROP, CLOSE_REASON.ESCAPE];
    if (IGNORED_REASONS.includes(reason)) {
      return;
    }
    setShowDialog(false);
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">PO FORM</p>
        </div>
      </div>

      <HorizonatalLine text="PO Details" />

      <div className="row mt-3 mb-3">
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="col-auto">
            <label htmlFor="store">Your Store</label>
          </div>
          <div className="col-auto">
            <BasicInput
              id="store"
              name="store"
              value={getLocalPoInfoResp?.data?.yourStoreName}
              readOnly
            />
          </div>
        </div>

        {/*  */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="col-auto">
            <label htmlFor="financialYear">Financial Year</label>
          </div>
          <div className="col-auto">
            <CustomSelect
              name="financialYear"
              id="financialYear"
              options={financialYearList}
              onChange={(selectedOption) => {
                setEditData({
                  ...editData,
                  financialYear: selectedOption?.value,
                });
              }}
            />
          </div>
        </div>

        {/*  */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="col-auto">
            <label htmlFor="fundingSrc">Funding source</label>
          </div>
          <div className="col-auto">
            <CustomSelect
              name="fundingSrc"
              id="fundingSrc"
              options={fundingSourceList}
              onChange={(selectedOption) => {
                setEditData({
                  ...editData,
                  fundingSourceId: selectedOption?.value,
                });
              }}
            />
          </div>
        </div>

        {/*  */}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="col-auto">
            <label htmlFor="program">Select Program</label>
          </div>
          <div className="col-auto">
            <CustomSelect
              name="program"
              id="program"
              options={programeList}
              onChange={(selectedOption) => {
                setEditData({
                  ...editData,
                  programeId: selectedOption?.value,
                });
              }}
            />
          </div>
        </div>

        {/*  */}
      </div>

      {/*  */}

      <div className="row mt-3 mb-3">
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="col-auto">
            <label htmlFor="supplierName">Supplier Name</label>
          </div>
          <div className="col-auto">
            <CustomSelect
              id="supplierName"
              name="supplierName"
              options={supplierList}
              onChange={(selectedOption) => {
                setEditData({
                  ...editData,
                  supplierId: selectedOption?.value,
                });
              }}
            />
          </div>
        </div>

        {/*  */}

        {showTax === "No" ? (
          <>
            <div className="col-sm-12 col-md-2 col-lg-2">
              <div className="col-auto">
                <label htmlFor="tax">Tax(%)</label>
              </div>
              <div className="col-auto">
                <BasicInput
                  type="text"
                  name="tax"
                  id="tax"
                  onChange={(e) => {
                    setEditData({
                      ...editData,
                      tax: e?.target?.value,
                    });
                  }}
                />
              </div>
            </div>
          </>
        ) : null}

        {/*  */}
        <div className="col-sm-12 col-md-2 col-lg-2">
          <div className="col-auto">
            <label htmlFor="poDate">Po Date</label>
          </div>
          <div className="col-auto">
            <CustDatepicker
              id="poDate"
              value={editData?.poDate}
              name="poDate"
              inputFormat="DD/MM/YYYY"
              // disablePast={name === "endDate" ? true : false}
              onChange={(newValue) => {
                setEditData({
                  ...editData,
                  poDate: formatDate(newValue),
                });
              }}
            />
          </div>
        </div>

        {/*  */}

        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="col-auto">
            <label htmlFor="poPrefenrence">PO Prefernce</label>
          </div>
          <div className="col-auto">
            <BasicInput
              id="poPrefenrence"
              type="text"
              name="poPrefenrence"
              defaultValue={editData?.poPrefernce}
              onChange={(e) => {
                setEditData({
                  ...editData,
                  poPrefernce: e.target.value.trim(),
                });
              }}
            />
          </div>
        </div>

        {/*  */}

        {/*  */}
        <div className="col-sm-12 col-md-2 col-lg-2">
          <div className="col-auto">
            <label htmlFor="deliveryDays">Delivery(in days)</label>
          </div>
          <div className="col-auto">
            <BasicInput
              id="deliveryDays"
              type="text"
              name="deliveryDays"
              defaultValue={editData?.deliveryDays}
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);
                if (isNaN(val)) {
                  toastMessage("Create Po", "Invalid Input");
                  setEditData({
                    ...editData,
                    deliveryDays: parseInt(val),
                  });
                  return;
                } else {
                  val = val >= 0 ? val : 0;
                  setEditData({
                    ...editData,
                    deliveryDays: parseInt(val),
                  });
                }
              }}
            />
          </div>
        </div>

        {/*  */}
      </div>

      <HorizonatalLine text="Drug Details" />
      <Paper elevation={3} className="mb-2">
        <TableComponent
          overFlow={true}
          columns={drugDetailColumn}
          colouredHeader={true}
          stickyHeader={true}
        >
          <TableBody>
            {loading ? (
              <TableRowLaoder />
            ) : (
              drugData &&
              drugData?.length > 0 &&
              drugData?.map((row, index) => {
                return (
                  <NormalTableRow key={row?.drugId}>
                    {drugDetailColumn.map((d, k) => {
                      if (d.id === "addStrip" || d.id === "unitPrice") {
                        return (
                          <StyledTableCell padding="none">
                            <BasicInput
                              type="number"
                              value={
                                row[d.id] != null || "undefined"
                                  ? row[d.id]
                                  : ""
                              }
                              onChange={(e) => {
                                let val = parseInt(e.target.value, 10);
                                if (isNaN(val)) {
                                  toastMessage("Create Po", "Invalid Input");
                                  return;
                                } else {
                                  // is A Number
                                  val = val >= 0 ? val : 0;
                                  handleChange(
                                    index,
                                    d.id,
                                    parseInt(e.target.value)
                                  );
                                }
                              }}
                            />
                          </StyledTableCell>
                        );
                      }
                      return (
                        <StyledTableCell padding="none">
                          <span style={{ fontSize: "13px" }}>{row[d.id]}</span>
                        </StyledTableCell>
                      );
                    })}
                  </NormalTableRow>
                );
              })
            )}
            <EmptyRow loading={loading} tableData={drugData} />
          </TableBody>
        </TableComponent>
        <HorizonatalLine text="TERMS & CONDITIONS" />
        <div className="row   mb-3">
          {termsAndCondition &&
            termsAndCondition?.length > 0 &&
            termsAndCondition?.map((element, index) => {
              return (
                <>
                  <div className="row  d-flex justify-content-around align-items-center mb-2">
                    <div className="col-auto align-items-center">
                      <span className="fw-bold">{index + 1}</span>
                    </div>
                    <div className="col-10">
                      {" "}
                      <BasicTextAreaField
                        defaultValue={element?.termsAndCondition}
                        rows={2}
                        cols={3}
                        onChange={(e) => {
                          handleTermsChange(
                            index,
                            `termsAndCondition`,
                            e?.target?.value
                          );
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="row">
          <div className="d-flex justify-content-center">
            <Basicbutton
              buttonText="Process"
              className="btn btn-success rounded-0 mb-2"
              onClick={handlePoSubmitValidataion}
              icon={<FontAwesomeIcon icon={faFloppyDisk} className="me-1" />}
              disabled={isLoading}
              isLoading={isLoading}
              loadingText={<Spinner />}
            />
          </div>
        </div>
      </Paper>

      {showDialog && (
        <Suspense>
          <AlertDialog
            open={showDialog}
            handleClose={handleClose}
            description={message}
            background={true}
            colorCode="#FF5733"
            dialogTitle="Create Local Po"
          >
            <Basicbutton
              buttonText="OK"
              className="btn btn-outline-light btn-sm    rounded"
              onClick={handleRedirect}
            />
          </AlertDialog>
        </Suspense>
      )}
    </>
  );
};

export default CreatePo;
