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
  approvePoInfoResponse,
  dispatchPoInfo,
  getPoApprovedList,
  getPoInfoById,
  rejectPoInfo,
  rejectPoInfoResponse,
} from "src/store/supplier/action";
import { useNavigate } from "react-router-dom";
import BasicTextAreaField from "src/components/inputbox/textarea";
import BackButon from "src/components/button/backButon";
import { useLocation } from "react-router-dom";
import CustomSelect from "src/components/select/customSelect";
import BasicInput from "src/components/inputbox/floatlabel/basicInput";
import CustDatepicker from "src/components/datepicker/custDatepicker";
import {
  faCircleXmark,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import NormalTableRow from "src/components/tables/datatable/normalTableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import dayjs from "dayjs";
const DispatchDesk = () => {
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
  const [displayData, setDisplayData] = useState([]);
  const [submitData, setSubmitData] = useState({
    boxReceived: "",
    remarks: "",
    consignmentNo: "",
    challanNo: "",
    challanDate: null,
    transporterName: "",
    expectedDelvDays: "",
    scheduleNo: null,

    id: state?.id,
  });
  const columns = useMemo(() => [
    {
      id: "sl",
      name: "SL.NO",
      sortable: false,
    },
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
    },
    {
      id: "batchNo",
      name: "BATCH NO",
      sortable: false,
    },
    {
      id: "expiryDate",
      name: "EXPIRY DATE",
      sortable: false,
    },
    {
      id: "mfgDate",
      name: "MFG. DATE",
      sortable: false,
    },
    {
      id: "orderQty",
      name: "ORDERED QTY",
      sortable: false,
    },
    {
      id: "deliveredQty",
      name: "DELIVERED QTY",
      sortable: false,
    },
    {
      id: "qtyDelivering",
      name: "QUANTITY DELIVERING",
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
      }
      //   else {
      //     navigate("/supplierInterface");
      //   }
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
      setSubmitData({
        ...submitData,
        id: poInfoIdByResp?.data?.getPoInfoById?.id,
        expectedDelvDays:
          poInfoIdByResp?.data?.getPoInfoById?.supplierInfo?.deliveryDays,
      });
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
  const handleChange = (idx, id, e, data, setData) => {
    const clone = [...data];
    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };
    setData(clone);
  };

  const handleIssueDrugList = (data) => {
    const filtered = [...data]?.filter((ele) => {
      if (
        ele?.hasOwnProperty("qtyDelivering") &&
        ele?.hasOwnProperty("batchNo") &&
        ele?.hasOwnProperty("expiryDate") &&
        ele?.hasOwnProperty("mfgDate")
      ) {
        return ele;
      }
    });
    if (filtered.length === 0) {
      toastMessage(
        "Dispatch Desk",
        "please Enter all Field required int the Drug Table",
        "info"
      );
      return;
    }
    let newElement = [];
    filtered?.map((element, index) => {
      const elementExist = displayData?.filter((item) => {
        return item?.drugId === element?.drugId;
      });
      if (elementExist.length === 0) {
        // if (element?.issuedQty > element?.AvailableQty) {
        //   toastMessage(
        //     "Dispatch Desk",
        //     `Issued Qty cannot be greater than available Qty for stock Id ${element?.stockId}`,
        //     "error",
        //     "top-center"
        //   );
        //   return;
        // }
        newElement.push(element);
      } else {
        for (let [i, item] of [...displayData]?.entries()) {
          if (item.drugId === element?.drugId) {
            displayData.splice(i, 1);
          }
        }
        // if (element?.issuedQty > element?.AvailableQty) {
        //   toastMessage(
        //     "INTENT ISSUE",
        //     `Issued Qty cannot be greater than available Qty for stock Id ${element?.stockId}`,
        //     "error",
        //     "top-center"
        //   );
        //   return;
        // }
        newElement.push(element);
      }
    });

    setDisplayData([...displayData, ...newElement]);
  };

  const sheduleDrpDown = [
    { value: "1", label: "Schedule1" },
    { value: "2", label: "Schedule2" },
  ];
  const handleRemoveSpecificRow = (idx) => {
    const clone = [...displayData];
    clone.splice(idx, 1);
    setDisplayData(clone);
  };

  const formatDate = (date) => {
    return dayjs(date).format("MMMM-YYYY");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">DISPATCH DESK</p>
          </div>
        </div>
        <div className="row">
          <BackButon routePath="/supplierInterface" />
        </div>
        <HorizonatalLine text="PO Details" />
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="col-auto">
              <label className="labellineHeight fw-bold" htmlFor="storeName">
                Supplier Name :{" "}
                {poInfoIdByResp?.data?.getPoInfoById?.supplierInfo?.supplierId}
              </label>
            </div>
          </div>
          <div className=" col-sm-12 col-md-4 col-lg-4">
            <div className="col-auto">
              <label
                className="labellineHeight fw-bold"
                htmlFor="notificationStatus"
              >
                PO Number : {poInfoIdByResp?.data?.getPoInfoById?.poNo}
              </label>
            </div>
          </div>
          <div className=" col-sm-12 col-md-4 col-lg-4">
            <div className="col-auto">
              <label
                className="labellineHeight fw-bold"
                htmlFor="notificationStatus"
              >
                PO Date: {poInfoIdByResp?.data?.getPoInfoById?.poDate}
              </label>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Drug Warehouse Delivery Details" />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="scheduleNo">
                Schedule Number
              </label>
            </div>
            <div className="col-auto">
              <CustomSelect
                name="scheduleNo"
                id="scheduleNo"
                value={
                  sheduleDrpDown &&
                  sheduleDrpDown?.find(
                    (c) => c.value === submitData?.scheduleNo
                  )
                }
                options={sheduleDrpDown}
                onChange={(selectedOption) => {
                  setSubmitData({
                    ...submitData,
                    scheduleNo: selectedOption?.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="cwareHouse">
                Consignee Warehouse
              </label>
            </div>
            <div className="col-auto">
              <BasicInput
                value={
                  poInfoIdByResp?.data?.getPoInfoById?.supplierInfo
                    ?.consigneeInfo
                }
                name="consignNo"
                id="consignNo"
                readOnly
                type="text"
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="consignNo">
                Consignment No
              </label>
            </div>
            <div className="col-auto">
              <BasicInput
                value={submitData?.consignmentNo}
                name="consignNo"
                id="consignNo"
                type="text"
                onChange={(e) => {
                  setSubmitData({
                    ...submitData,
                    consignmentNo: e.target.value.trim(),
                  });
                }}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="noOfBox">
                No of Box
              </label>
            </div>
            <div className="col-auto">
              <BasicInput
                name="noOfBox"
                id="noOfBox"
                type="number"
                onChange={(e) => {
                  setSubmitData({
                    ...submitData,
                    boxReceived: e.target.value.trim(),
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="scheduleNo">
                Challan/Invoice No
              </label>
            </div>
            <div className="col-auto">
              <BasicInput
                type="text"
                onChange={(e) => {
                  setSubmitData({
                    ...submitData,
                    challanNo: e.target.value.trim(),
                  });
                }}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="cwareHouse">
                Challan/Invoice Date
              </label>
            </div>
            <div className="col-auto">
              <CustDatepicker
                value={submitData?.challanDate}
                format="DD/MM/YYYY"
                onChange={(newValue) => {
                  setSubmitData({
                    ...submitData,
                    challanDate: newValue,
                  });
                }}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="transpName">
                Transporter Name
              </label>
            </div>
            <div className="col-auto">
              <BasicInput
                name="transpName"
                id="transpName"
                type="text"
                onChange={(e) => {
                  setSubmitData({
                    ...submitData,
                    transporterName: e.target.value.trim(),
                  });
                }}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="expectedDDays">
                Expected Delivery Days
              </label>
            </div>
            <div className="col-auto">
              <BasicInput
                value={submitData?.expectedDelvDays}
                name="expectedDDays"
                id="expectedDDays"
                type="number"
                onChange={(e) => {
                  setSubmitData({
                    ...submitData,
                    expectedDelvDays: e.target.value.trim(),
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className="row mt-2">
          {displayData && displayData.length > 0 ? (
            <>
              <HorizonatalLine text="Selected List" />
              <div className="col-12">
                <Paper elevation={2}>
                  <TableComponent columns={columns}>
                    <TableBody>
                      {displayData &&
                        displayData?.length > 0 &&
                        displayData?.map((row, index) => {
                          return (
                            <NormalTableRow key={row?.stockId}>
                              {columns.map((d, k) => {
                                if (
                                  d.id === "expiryDate" ||
                                  d.id === "mfgDate"
                                ) {
                                  return (
                                    <StyledTableCell padding="none">
                                      {formatDate(row[d.id])}
                                    </StyledTableCell>
                                  );
                                }
                                return (
                                  <StyledTableCell padding="none">
                                    {row[d.id]}
                                  </StyledTableCell>
                                );
                              })}
                            </NormalTableRow>
                          );
                        })}
                    </TableBody>
                  </TableComponent>

                  <div className="col-12 mb-1">
                    <div className="row mb-2">
                      <div className="col-sm-12 col-md-8 col-lg-8 offset-md-2 offset-lg-2">
                        <label htmlFor="remarks" className="form-label">
                          Remarks
                        </label>
                        <BasicTextAreaField
                          name="remarks"
                          className="form-control shadow-none"
                          rows="3"
                          id="remarks"
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
                  <div className="d-flex justify-content-center">
                    <div className="me-1 mb-2">
                      <BasicButton
                        className="primary rounded-0 me-2"
                        buttonText="Full/Final"
                        icon={
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="me-1"
                          />
                        }
                        onClick={() => {
                          if (submitData?.remarks === "") {
                            toastMessage(
                              "Intent Issue",
                              "Enter the Remarks",
                              "error"
                            );
                          } else {
                            const dateFormatedList = [...displayData]?.map(
                              (ele) => {
                                ele["expiryDate"] = formatDate(ele?.expiryDate);
                                ele["mfgDate"] = formatDate(ele?.mfgDate);

                                return ele;
                              }
                            );
                            const data = {
                              ...submitData,
                              challanDate: dayjs(
                                submitData?.challanDate
                              ).format("MM/DD/YYYY"),
                              list: dateFormatedList,
                            };
                            console.log("data", data);
                            dispatch(dispatchPoInfo(data));
                          }
                        }}
                      />

                      <BasicButton
                        className="primary rounded-0 me-2"
                        buttonText="Partly"
                        icon={
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="me-1"
                          />
                        }
                        onClick={() => {
                          if (submitData?.remarks === "") {
                            toastMessage(
                              "Dispatch Desk",
                              "Enter the Remarks",
                              "error"
                            );
                          } else {
                            const data = {
                              ...submitData,
                              list: displayData,
                            };
                            console.log("data", data);
                            dispatch(dispatchPoInfo(data));
                          }
                        }}
                      />

                      <BasicButton
                        className="danger rounded-0"
                        buttonText="Cancel"
                        icon={
                          <FontAwesomeIcon icon={faXmark} className="me-1" />
                        }
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </Paper>
              </div>
            </>
          ) : null}
        </div>
        <HorizonatalLine text="Drug Details" />
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
                            } else if (d.id === "batchNo") {
                              return (
                                <BasicInput
                                  value={
                                    row[d.id] != null || "undefined"
                                      ? row[d.id]
                                      : ""
                                  }
                                  type="text"
                                  onChange={(e) => {
                                    handleChange(
                                      index,
                                      d?.id,
                                      e?.target?.value,
                                      tableData,
                                      setTableData
                                    );
                                  }}
                                />
                              );
                            } else if (d.id === "qtyDelivering") {
                              return (
                                <StyledTableCell padding="none">
                                  <BasicInput
                                    value={
                                      row[d.id] != null || "undefined"
                                        ? row[d.id]
                                        : ""
                                    }
                                    type="number"
                                    onChange={(e) => {
                                      handleChange(
                                        index,
                                        d?.id,
                                        parseInt(e?.target?.value),
                                        tableData,
                                        setTableData
                                      );
                                    }}
                                  />
                                </StyledTableCell>
                              );
                            } else if (
                              d.id === "expiryDate" ||
                              d.id === "mfgDate"
                            ) {
                              return (
                                <StyledTableCell padding="none">
                                  <CustDatepicker
                                    value={
                                      row[d.id] != null && "undefined"
                                        ? row[d.id]
                                        : null
                                    }
                                    openTo="month"
                                    views={["year", "month"]}
                                    onChange={(newValue) => {
                                      handleChange(
                                        index,
                                        d?.id,
                                        newValue,
                                        tableData,
                                        setTableData
                                      );
                                    }}
                                  />
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
            <div className="d-flex justify-content-center">
              <BasicButton
                className="btn btn-primary rounded-0"
                buttonText="Add"
                onClick={(e) => {
                  e.preventDefault();
                  handleIssueDrugList(tableData);
                }}
              />
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default DispatchDesk;
