import React, { useState, useMemo, useEffect } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import NormalTableRow from "../../../components/tables/datatable/normalTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import { TableBody } from "@mui/material";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import CustomSelect from "../../../components/select/customSelect";
import BackButon from "../../../components/button/backButon";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getFreezeNotiDetails } from "../../../store/ordermanagement/action";
import { NETWORK_STATUS_CODE } from "../../../common/constant/constant";
import toastMessage from "../../../common/toastmessage/toastmessage";
import Basicbutton from "../../../components/button/basicbutton";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const CreatePo = () => {
  const navigate = useNavigate();
  const getFreezeNotiDetailsResp = useSelector(
    (state) => state?.ordermanaagement?.getFreezeNotiDetailsResp
  );
  console.log("getFreezeNotiDetailsResp", getFreezeNotiDetailsResp);
  const dispatch = useDispatch();
  const { state } = useLocation();

  console.log("state", state);
  const [poType, setPoType] = useState("");
  const [fundingSource, setFundingSource] = useState("");
  const [tax, setTax] = useState(0);
  const [institue, setInstitute] = useState("");
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [clone, setClone] = useState([]);
  const [drugData, setDrugData] = useState([]);
  const [fundingSourceList, setFundingSourceList] = useState([]);
  const [poList, setPoList] = useState([]);
  const [institueList, setInstituteList] = useState([]);
  const [notificationDetails, setNotificationDetails] = useState({
    notificationId: "",
    notificationDate: "",
    financialYear: "",
    demandTypeName: "",
    lastDate: "",
  });
  const notificationColumn = useMemo(() => [
    {
      id: "notificationId",
      name: "NOT. ID",
      sortable: false,
    },
    {
      id: "notificationDate",
      name: "NOT. DATE",
      sortable: false,
    },

    {
      id: "financialYear",
      name: "FINANCIAL YEAR",
      sortable: false,
    },

    {
      id: "demandTypeName",
      name: "DEMAND TYPE",
      sortable: false,
    },
    {
      id: "lastDate",
      name: "SUBM. LAST DATE",
      sortable: false,
    },
  ]);

  const drugDetailColumn = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
    },
    {
      id: "programName",
      name: "PROG NAME",
      sortable: false,
    },
    {
      id: "packingQty",
      name: "PACKING QTY",
      sortable: false,
    },
    {
      id: "supplierList",
      name: "SUPPLIER NAME",
      sortable: false,
    },

    {
      id: "requestQty",
      name: "REQUEST QUANTITY",
      sortable: false,
    },

    {
      id: "availableQty",
      name: "STOCK QUANTITY",
      sortable: false,
    },
    {
      id: "pileLineQty",
      name: "QTY (IN TRANSIT)",
      sortable: false,
    },
    {
      id: "orderQty",
      name: "ADDED NO OF STRIP/BOTTLES",
      sortable: false,
    },
    {
      id: "total",
      name: "ADDED TOTAL UNIT",
      sortable: false,
    },

    {
      id: "addStrip",
      name: "	ADD STRIP/BOTTLE",
      sortable: false,
    },
    {
      id: "addTotalQty",
      name: "	ADD TOTAL QTY",
      sortable: false,
    },
  ]);
  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };
  useEffect(() => {
    if (state && state != null) {
      if (state?.notificationId) {
        dispatch(getFreezeNotiDetails({ id: state[0]?.id }));
      } else if (state[0]?.id) {
        dispatch(getFreezeNotiDetails({ id: state[0]?.id }));
      }
    } else {
      //navigate("/")
    }
  }, [state]);

  useEffect(() => {
    if (
      getFreezeNotiDetailsResp &&
      getFreezeNotiDetailsResp?.status === NETWORK_STATUS_CODE?.SUCCESS
    ) {
      setNotificationDetails({
        notificationId:
          getFreezeNotiDetailsResp?.data?.getFreezeNotificationDetail?.id,
        notificationDate: formatDate(
          getFreezeNotiDetailsResp?.data?.getFreezeNotificationDetail
            ?.notificationDate
        ),
        financialYear:
          getFreezeNotiDetailsResp?.data?.getFreezeNotificationDetail
            ?.financialYear,
        demandTypeName:
          getFreezeNotiDetailsResp?.data?.getFreezeNotificationDetail
            ?.demandTypeName,
        lastDate: formatDate(
          getFreezeNotiDetailsResp?.data?.getFreezeNotificationDetail?.lastDate
        ),
      });
      setPoList(getFreezeNotiDetailsResp?.data?.poTypeList);
      setInstituteList(getFreezeNotiDetailsResp?.data?.userTypeList);
      setClone(
        getFreezeNotiDetailsResp?.data?.getFreezeNotificationDetail?.drugInfo
      );
      setDrugData(
        getFreezeNotiDetailsResp?.data?.getFreezeNotificationDetail?.drugInfo
      );
      setFundingSourceList(getFreezeNotiDetailsResp?.data?.getFundingSource);
    } else if (
      getFreezeNotiDetailsResp &&
      getFreezeNotiDetailsResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage("PO", getFreezeNotiDetailsResp?.data?.message);
    }
  }, [getFreezeNotiDetailsResp]);

  const handleChange = (idx, id, e) => {
    const clone = [...drugData];
    if (id === "addStrip") {
      clone[idx] = {
        ...clone[idx],
        [id]: e,
        ["addTotalQty"]: "",
        ["total"]: parseInt(clone[idx]["packingQty"]) * e,
      };
    } else if (id === "addTotalQty") {
      clone[idx] = {
        ...clone[idx],
        [id]: e,
        ["addStrip"]: Math.floor(e / parseInt(clone[idx]["packingQty"])),
        ["total"]: e,
      };
    }

    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };

    setDrugData(clone);
  };

  const handlePoSubmitValidataion = () => {
    const valid = [...drugData].every(
      (ele) =>
        ele?.hasOwnProperty("supplierListId") && ele?.hasOwnProperty("total")
    );
    console.log("valid", valid);
    if (!valid) {
      console.log("drugData", drugData);
      toastMessage("GENERATE PO", "Fill all the Relevant Details");
    } else {
      navigate("/generatePurchaseOrder", {
        state: {
          id: state[0]?.id,
          list: drugData,
          fundingSourceId: fundingSource,
          tax: tax,
          institueId: institue,
          poTypeId: poType,
        },
      });
      console.log("drugData", drugData);
    }
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">PURCHASE ORDER</p>
        </div>
      </div>
      <BackButon routePath="openCentralPurchase" />
      <HorizonatalLine text="Notification Details" />
      <TableComponent columns={notificationColumn}>
        <TableBody>
          {[notificationDetails] &&
            [notificationDetails]?.length > 0 &&
            [notificationDetails]?.map((row, index) => {
              return (
                <NormalTableRow key={row?.notificationId}>
                  {notificationColumn.map((d, k) => {
                    return (
                      <StyledTableCell key={k} padding="none">
                        <span style={{ fontSize: "13px" }}>{row[d.id]}</span>
                      </StyledTableCell>
                    );
                  })}
                </NormalTableRow>
              );
            })}

          <EmptyRow loading={loading} tableData={notificationDetails} />
        </TableBody>
      </TableComponent>

      <HorizonatalLine text="Enter Details" />
      <div className="row mb-2">
        <div className="col-sm-12 col-md-2 col-lg-2">
          <div className="col-auto">
            <label>Store Name</label>
          </div>
          <div className="col-auto">
            <CustomSelect
              options={[{ value: "statewarehouse", label: "STATE WAREHOUSE" }]}
              onChange={(selectedOption) => {
                setStoreName(selectedOption?.value);
              }}
            />
          </div>
        </div>

        <div className="col-sm-12 col-md-2 col-lg-2">
          <div className="col-auto">
            <label>PO Type</label>
          </div>
          <div className="col-auto">
            <CustomSelect
              options={poList}
              onChange={(selectedOption) => {
                setPoType(selectedOption?.value);
              }}
            />
          </div>
        </div>

        <div className="col-sm-12 col-md-2 col-lg-2">
          <div className="col-auto">
            <label>Funding Source</label>
          </div>
          <div className="col-auto">
            <CustomSelect
              options={fundingSourceList}
              onChange={(selectedOption) => {
                setFundingSource(selectedOption?.value);
              }}
            />
          </div>
        </div>

        <div className="col-sm-12 col-md-2 col-lg-2">
          {getFreezeNotiDetailsResp &&
          getFreezeNotiDetailsResp?.data?.poTax?.tax === "No" ? (
            <>
              {" "}
              <div className="col-auto">
                <label>Tax(%)</label>
              </div>
              <div className="col-auto">
                <BasicInput
                  type="text"
                  onChange={(e) => setTax(parseInt(e?.target?.value))}
                />
              </div>
            </>
          ) : null}
        </div>

        <div className="col-sm-12 col-md-2 col-lg-2">
          <div className="col-auto">
            <label>Institute</label>
          </div>
          <div className="col-auto">
            <CustomSelect
              options={institueList}
              onChange={(selectedOption) => {
                setInstitute(selectedOption?.value);
              }}
            />
          </div>
        </div>
      </div>

      <HorizonatalLine text="Drug Information" />

      <TableComponent columns={drugDetailColumn}>
        <TableBody>
          {loading ? (
            <TableRowLaoder />
          ) : (
            drugData &&
            drugData?.length > 0 &&
            drugData?.map((row, index) => {
              return (
                <NormalTableRow key={row?.drugId + row?.programId + index}>
                  {drugDetailColumn.map((d, k) => {
                    if (d.id === "orderdQty") {
                      return (
                        <StyledTableCell key={k} padding="none">
                          <BasicInput type="number" />
                        </StyledTableCell>
                      );
                    } else if (d.id === "supplierList") {
                      return (
                        <StyledTableCell padding="none">
                          <CustomSelect
                            options={row[d.id]}
                            // defaultValue={props.option?.find(
                            //   (c) => c.value === row[`${d.id}Id`]
                            // )}
                            // value={
                            //   props?.option &&
                            //   props?.option?.find(
                            //     (c) => c.value === row[`${d.id}Id`]
                            //   )
                            // }
                            onChange={(val) => {
                              handleChange(index, `${d.id}Id`, val?.value);
                            }}
                          />
                        </StyledTableCell>
                      );
                    } else if (d.id === "addStrip" || d.id === "addTotalQty") {
                      return (
                        <StyledTableCell padding="none">
                          <BasicInput
                            min="0"
                            step="1"
                            type="number"
                            value={
                              row[d.id] != null || "undefined" ? row[d.id] : ""
                            }
                            // onChange={(e) => {
                            //   let val = parseInt(e.target.value, 10);
                            //   if (isNaN(val)) {
                            //     toastMessage("Create Po", "Invalid Input");
                            //     return;
                            //   } else {
                            //     // is A Number
                            //     val = val >= 0 ? val : 0;
                            //     handleChange(
                            //       index,
                            //       d.id,
                            //       parseInt(e.target.value)
                            //     );
                            //   }
                            // }}

                            onChange={(e) => {
                              let val = parseInt(e.target.value);
                              if (isNaN(val)) {
                                toastMessage("Create Po", "Invalid Input");
                                handleChange(
                                  index,
                                  d.id,
                                  parseInt(e.target.value)
                                );
                                return;
                              } else if (!isNaN(val) && val < 0) {
                                toastMessage(
                                  "Create Po",
                                  "Value cannot be Negative"
                                );
                                handleChange(
                                  index,
                                  d.id,
                                  parseInt(e.target.value)
                                );
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

      <div className="row">
        <div className="d-flex justify-content-center">
          <Basicbutton
            buttonText="Process"
            className="btn btn-success rounded-0"
            onClick={handlePoSubmitValidataion}
          />
        </div>
      </div>
    </>
  );
};

export default CreatePo;
