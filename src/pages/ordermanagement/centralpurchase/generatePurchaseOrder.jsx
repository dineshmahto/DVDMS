import React, { useState, useMemo, useEffect } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import NormalTableRow from "../../../components/tables/datatable/normalTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import { TableBody, Paper } from "@mui/material";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import CustomSelect from "../../../components/select/customSelect";
import BackButon from "../../../components/button/backButon";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  createPO,
  createPoResponse,
  getFreezeNotiDetails,
  getPrcessOrderInfo,
} from "../../../store/ordermanagement/action";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../../common/constant/constant";
import toastMessage from "../../../common/toastmessage/toastmessage";
import Basicbutton from "../../../components/button/basicbutton";
import CustDatepicker from "../../../components/datepicker/custDatepicker";
import BasicTextAreaField from "../../../components/inputbox/textarea";
import dayjs from "dayjs";
import ReactJoyride from "react-joyride";
import { useNavigate } from "react-router-dom";
const CreatePo = () => {
  const navigate = useNavigate();
  const processOrderInfoResp = useSelector(
    (state) => state?.ordermanaagement?.processOrderInfoResp
  );
  const createPoResp = useSelector(
    (state) => state?.ordermanaagement?.createPoResp
  );
  console.log("processOrderInfo", processOrderInfoResp);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const steps = [
    {
      target: "#step1",
      content: "This is my awesome feature!",
    },
    {
      target: "#step2",
      content: "This another awesome feature!",
    },
  ];
  console.log("state", state);

  const [loading, setLoading] = useState(false);
  const [clone, setClone] = useState([]);
  const [notificationData, setNotificationData] = useState([]);
  const [drugData, setDrugData] = useState([]);
  const [termsCondition, setTermsCondition] = useState([]);
  const [consigneeList, setConsigneeList] = useState([]);
  const [poPrefix, setPoPrefix] = useState("");
  const [deliveryDay, setDeliveryDay] = useState("");
  const [poDetails, setPoDetails] = useState({
    notificationId: "",
    fundingSourceName: "",
    financialYear: "",
    poTypeName: "",
  });

  const notificationColumn = useMemo(() => [
    {
      id: "notificationId",
      name: "NOTIFICATION ID",
      sortable: false,
    },
    {
      id: "fundingSourceName",
      name: "FUNDING SOURCE",
      sortable: false,
    },

    {
      id: "financialYear",
      name: "FINANCIAL YEAR",
      sortable: false,
    },

    {
      id: "poTypeName",
      name: "PO TYPE",
      sortable: false,
    },
  ]);

  const drugDetailColumn = useMemo(() => [
    {
      id: "slNo",
      name: "SL.NO",
      sortable: false,
    },
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
    },

    {
      id: "programName",
      name: "PROGRAMME NAME",
      sortable: false,
    },

    {
      id: "packDesc",
      name: "PACKING DESC",
      sortable: false,
    },
    {
      id: "addStripBottle",
      name: "NO. OF STRIP/BOTTLE",
      sortable: false,
    },

    {
      id: "totalQty",
      name: "TOTAL UNIT",
      sortable: false,
    },
    {
      id: "rateUnit",
      name: "RATE/UNIT (EXC. TAX)",
      sortable: false,
    },
    {
      id: "tax",
      name: "TAX",
      sortable: false,
    },
    {
      id: "rateInc",
      name: "RATE/UNIT (INC. TAX)",
      sortable: false,
    },
  ]);

  useEffect(() => {
    if (state && state != null) {
      dispatch(getPrcessOrderInfo(state));
    } else {
      {
        navigate("/openNotificationDetails");
      }
    }
  }, [state]);

  useEffect(() => {
    if (
      processOrderInfoResp &&
      processOrderInfoResp?.status === NETWORK_STATUS_CODE?.SUCCESS
    ) {
      setConsigneeList(processOrderInfoResp?.data?.getConsigneeList);
      const hold = [];
      if (processOrderInfoResp?.data?.singlePO) {
        processOrderInfoResp?.data?.getPoProcess?.drugList?.map(
          (item, index) => {
            let e = {};
            e["deliveryDays"] =
              processOrderInfoResp?.data?.getDeliveryDay?.deliveryDay;
            e["poPrefix"] = processOrderInfoResp?.data?.getPoPrefix?.poPrefix;
            processOrderInfoResp?.data?.getTermsAndCondition?.map((ele) => {
              e[`termsCondtion_${index}_${ele?.id}`] = {
                id: ele?.id,
                value: ele?.termsAndCondition,
              };
            });

            hold.push(e);
          }
        );
        setClone(hold);
      } else {
        processOrderInfoResp?.data?.getPoProcess?.supplierList.map(
          (item, index) => {
            let e = {};
            e["deliveryDays"] =
              processOrderInfoResp?.data?.getDeliveryDay?.deliveryDay;
            e["poPrefix"] = processOrderInfoResp?.data?.getPoPrefix?.poPrefix;
            processOrderInfoResp?.data?.getTermsAndCondition?.map((ele) => {
              e[`termsCondtion_${index}_${ele?.id}`] = {
                id: ele?.id,
                value: ele?.termsAndCondition,
              };
            });

            hold.push(e);
          }
        );
        setClone(hold);
      }

      setDrugData(processOrderInfoResp?.data?.getPoProcess?.drugDetail);
      setDeliveryDay(processOrderInfoResp?.data?.getDeliveryDay?.deliveryDay);
      setPoPrefix(processOrderInfoResp?.data?.getPoPrefix?.poPrefix);
      setTermsCondition(processOrderInfoResp?.data?.getTermsAndCondition);
      setPoDetails({
        notificationId:
          processOrderInfoResp?.data?.getPoProcess?.notificationId,
        fundingSourceName:
          processOrderInfoResp?.data?.getPoProcess?.fundingSourceName,
        financialYear: processOrderInfoResp?.data?.getPoProcess?.financialYear,
        poTypeName: processOrderInfoResp?.data?.getPoProcess?.poTypeName,
      });
    } else if (
      processOrderInfoResp &&
      processOrderInfoResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage("PO", processOrderInfoResp?.data?.message);
    }
  }, [processOrderInfoResp]);

  useEffect(() => {
    if (
      createPoResp &&
      createPoResp?.status === NETWORK_STATUS_CODE?.CREATED_SUCCESSFULLY
    ) {
      if (
        createPoResp &&
        createPoResp?.data?.status === SERVER_STATUS_CODE?.SUCCESS
      ) {
        toastMessage("CREATE PO", createPoResp?.data?.message);
        dispatch(createPoResponse(""));
      } else if (
        createPoResp &&
        createPoResp?.data?.status === SERVER_STATUS_CODE?.FAILED
      ) {
        toastMessage("CREATE PO", createPoResp?.data?.message);
        dispatch(createPoResponse(""));
      }
    } else if (
      createPoResp &&
      createPoResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage("CREATE PO", createPoResp?.data?.message);
      dispatch(createPoResponse(""));
    }
  }, [createPoResp]);

  const handleChange = (idx, id, e, drugList, type, uniqueId) => {
    const c = [...clone];
    if (type === "termsCondtion") {
      c[idx] = {
        ...c[idx],
        [`${id}_${idx}_${uniqueId}`]: { id: uniqueId, value: e },
        ["drugList"]: drugList,
      };
      setClone(c);
    } else {
      c[idx] = {
        ...c[idx],
        [id]: e,

        ["drugList"]: drugList,
      };
      setClone(c);
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  const getSum = (total, num) => {
    // console.log("total", total?.totalPoValue, num);
    return total + num?.totalPoValue;
  };
  const form = (sameSupplier, index) => {
    let sum = sameSupplier?.reduce(getSum, 0);
    return (
      <>
        <div className="row mb-2 mt-3">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="col-auto">
              <label>PO DATE</label>
            </div>
            <div className="col-auto">
              <CustDatepicker
                id={`${index}poDate`}
                value={clone[index]?.poDate ? clone[index]?.poDate : null}
                name="poDate"
                inputFormat="DD/MM/YYYY"
                // disablePast={name === "endDate" ? true : false}
                onChange={(newValue) => {
                  handleChange(
                    index,
                    `poDate`,
                    formatDate(newValue),
                    sameSupplier,
                    "normal",
                    "",
                    termsCondition
                  );
                }}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="col-auto">
              <label>DELIVERY DAYS</label>
            </div>
            <div className="col-auto">
              <BasicInput
                key={`delivryDays_${index}`}
                id={`delivryDays${index}`}
                name="deliveryDays"
                type="number"
                defaultValue={deliveryDay}
                onChange={(e) => {
                  handleChange(
                    index,
                    `deliveryDays`,
                    parseInt(e.target?.value),
                    sameSupplier,
                    "normal",
                    "",
                    termsCondition
                  );
                }}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="col-auto">
              <label>PO REFERNCE</label>
            </div>
            <div className="col-auto">
              <BasicInput
                key={`poPrefence_${index}`}
                id={`poPrefence${index}`}
                name={`poPreference${index}`}
                type="text"
                defaultValue={poPrefix}
                onChange={(e) => {
                  handleChange(
                    index,
                    `poPreference`,
                    e.target?.value,
                    sameSupplier,
                    "normal",
                    "",
                    termsCondition
                  );
                }}
              />
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="col-auto">
              <label>REMARKS</label>
            </div>
            <div className="col-auto">
              <BasicInput
                key={`${index}_remarks`}
                type="text"
                id={`${index}remarks`}
                name="remarks"
                onChange={(e) => {
                  handleChange(
                    index,
                    `remarks`,
                    e.target?.value,
                    sameSupplier,
                    "normal",
                    "",
                    termsCondition
                  );
                }}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="col-auto">
              <label>CONSIGNEE NAME</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                id={`${index}consigneName`}
                options={consigneeList}
                onChange={(selectedOption) => {
                  handleChange(
                    index,
                    `consigneeId`,
                    selectedOption?.value,
                    sameSupplier,
                    "normal",
                    "",
                    termsCondition
                  );
                }}
              />
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-start mb-2" key={index}>
          <div className="col-12">
            <div className="row align-items-center">
              <div className="col-auto">
                <label>SUPPLIER</label>
              </div>
              <div className="col-auto"></div>
              <div className="col-auto">
                <label>INSTITUTE</label>
              </div>
              <div className="col-auto"></div>

              <div className="col-auto">
                <label>TOTAL PO VALUE (INC. TAX) :{sum}</label>
              </div>
              <div className="col-auto"></div>
            </div>
          </div>
        </div>
        <HorizonatalLine text="DRUG DETAILS" />
        <Paper elevation={3} className="mb-1">
          <div className="row">
            <div className="col-12">
              <TableComponent columns={drugDetailColumn}>
                <TableBody>
                  {sameSupplier &&
                    sameSupplier?.length > 0 &&
                    sameSupplier.map((row, index) => {
                      return (
                        <NormalTableRow key={row?.programName}>
                          {drugDetailColumn.map((d, k) => {
                            return (
                              <StyledTableCell key={k} padding="none">
                                <span style={{ fontSize: "13px" }}>
                                  {row[d.id]}
                                </span>
                              </StyledTableCell>
                            );
                          })}
                        </NormalTableRow>
                      );
                    })}
                </TableBody>
              </TableComponent>
            </div>
          </div>

          <HorizonatalLine text="TERMS & CONDITIONS" />
          <div className="row   mb-3">
            {termsCondition &&
              termsCondition?.length > 0 &&
              termsCondition?.map((element, sl) => {
                return (
                  <>
                    <div className="row  d-flex justify-content-around align-items-center mb-2">
                      <div className="col-auto align-items-center">
                        <span className="fw-bold">{sl + 1}</span>
                      </div>
                      <div className="col-10">
                        {" "}
                        <BasicTextAreaField
                          defaultValue={element?.termsAndCondition}
                          rows={2}
                          cols={3}
                          onChange={(e) => {
                            handleChange(
                              index,
                              `termsCondtion`,
                              e?.target?.value,
                              sameSupplier,
                              "termsCondtion",
                              element?.id
                            );
                          }}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </Paper>
      </>
    );
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">PURCHASE ORDER</p>
        </div>
      </div>
      <BackButon
        routePath="openNotificationDetails"
        stateValue={{
          notificationId:
            processOrderInfoResp?.data?.getPoProcess?.notificationId,
        }}
      />
      <HorizonatalLine text="PO Details" />
      <div className="row">
        <div className="col-12">
          <TableComponent columns={notificationColumn}>
            <TableBody>
              {[poDetails] &&
                [poDetails]?.length > 0 &&
                [poDetails]?.map((row, index) => {
                  return (
                    <NormalTableRow key={row?.notificationId}>
                      {notificationColumn.map((d, k) => {
                        return (
                          <StyledTableCell key={k} padding="none">
                            <span style={{ fontSize: "13px" }}>
                              {row[d.id]}
                            </span>
                          </StyledTableCell>
                        );
                      })}
                    </NormalTableRow>
                  );
                })}

              <EmptyRow loading={loading} tableData={[poDetails]} />
            </TableBody>
          </TableComponent>
        </div>
      </div>

      <HorizonatalLine text="Enter Details" />
      {/* <ReactJoyride steps={steps} /> */}

      {processOrderInfoResp?.data?.singlePO === true &&
        processOrderInfoResp?.data?.getPoProcess?.drugList &&
        processOrderInfoResp?.data?.getPoProcess?.drugList.length > 0 &&
        processOrderInfoResp?.data?.getPoProcess?.drugList?.map(
          (row, index) => {
            let sameSupplier;
            processOrderInfoResp?.data?.getPoProcess?.supplierList?.map(
              (sup) => {
                sameSupplier = drugData.filter((drugEl) => {
                  if (drugEl?.drugId === row && drugEl?.supplierId === sup) {
                    return drugEl;
                  }
                });
              }
            );

            return form(sameSupplier, index);
          }
        )}

      {processOrderInfoResp?.data?.singlePO === false &&
        processOrderInfoResp?.data?.getPoProcess?.supplierList?.map(
          (sup, index) => {
            let sameSupplier;
            sameSupplier = drugData.filter((drugEl) => {
              if (drugEl?.supplierId === sup) {
                return drugEl;
              }
            });
            return form(sameSupplier, index);
          }
        )}

      <div className="row">
        <div className="d-flex justify-content-center">
          <Basicbutton
            buttonText="Save"
            id="step1"
            className="btn btn-success rounded-0"
            onClick={() => {
              const valid = [...clone].every(
                (ele) =>
                  ele?.hasOwnProperty("supplierListId") &&
                  ele?.hasOwnProperty("total")
              );
              dispatch(
                createPO({
                  id: processOrderInfoResp?.data?.getPoProcess?.notificationId,
                  list: clone,
                  tax: state?.tax,
                  idList:
                    termsCondition &&
                    termsCondition.length > 0 &&
                    termsCondition.map(({ id }) => {
                      return id;
                    }),
                  fundingSourceId:
                    processOrderInfoResp?.data?.getPoProcess?.fundingSourceId,
                })
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CreatePo;
