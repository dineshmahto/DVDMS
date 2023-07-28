import React, { useState, useMemo, useEffect, useCallback } from "react";
import TableComponent from "src/components/tables/datatable/tableComponent";
import TablePagination from "src/components/tables/datatable/tablepagination";
import { TableBody } from "@mui/material";
import SearchField from "../../../components/search/search";
import {
  faSearch,
  faDownload,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";

import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "src/common/toastmessage/toastmessage";
import TableRowLaoder from "src/components/tables/datatable/tableRowLaoder";
import StyledTableRow from "src/components/tables/datatable/customTableRow";
import StyledTableCell from "src/components/tables/datatable/customTableCell";
import EmptyRow from "src/components/tables/datatable/emptyRow";

import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
  SORTINGORDER,
} from "../../../common/constant/constant";
import Basicbutton from "src/components/button/basicbutton";
import { getReceivedPoChallanListResponse } from "src/store/receiving/action";
import HorizonatalLine from "src/components/horizontalLine/horizonatalLine";
import BasicInput from "src/components/inputbox/floatlabel/basicInput";
import CustDatepicker from "src/components/datepicker/custDatepicker";
import BasicTextAreaField from "src/components/inputbox/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { validateDate } from "@mui/x-date-pickers/internals";

const ReceiveChallan = () => {
  const dispatch = useDispatch();
  const receivedPoChallanListResp = useSelector(
    (state) => state?.receiving?.receivedPoChallanListResp
  );
  console.log("receivedPoChallanListResp", receivedPoChallanListResp);
  let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [drugData, setDrugData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [submitData, setSubmitData] = useState({
    receivedDate: null,
    remarks: "",
    packetReceived: "",
  });
  const columns = useMemo(() => [
    {
      id: "poNo",
      name: "PO NO.",
      sortable: false,
    },

    {
      id: "challanNumber",
      name: "CHALLAN NUMBER",
      sortable: false,
    },

    {
      id: "challanDate",
      name: "CHALLAN DATE",
      sortable: false,
    },

    {
      id: "supllierName",
      name: "SUPPLIER NAME",
      sortable: false,
    },
    {
      id: "tranpName",
      name: "TRANSPORTER NAME",
      sortable: false,
    },
    {
      id: "loryNumber",
      name: "LORY NUMBER",
      sortable: false,
    },

    {
      id: "noOfBox",
      name: "NO. OF BOX SENT",
      sortable: false,
    },
  ]);

  const drugColumns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
    },

    {
      id: "mfgDate",
      name: "MANUFACTURE DATE",
      sortable: false,
    },

    {
      id: "expDate",
      name: "EXPIRY DATE",
      sortable: false,
    },

    {
      id: "shelfLife",
      name: "SHEL FILE(%)",
      sortable: false,
    },
    {
      id: "deliverdQty",
      name: "DELIVERED QTY",
      sortable: false,
    },
    {
      id: "rcvdQty",
      name: "RECEIVED QTY",
      sortable: false,
    },
  ]);
  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
    }
    return () => {
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (
      receivedPoChallanListResp &&
      receivedPoChallanListResp?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setTableData(receivedPoChallanListResp?.data?.pageList?.content);
      setLoading(false);
      dispatch(getReceivedPoChallanListResponse(""));
    } else if (
      receivedPoChallanListResp &&
      receivedPoChallanListResp?.status == NETWORK_STATUS_CODE.BAD_REQUEST
    ) {
      setLoading(false);
      dispatch(getReceivedPoChallanListResponse(""));
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [receivedPoChallanListResp]);

  const handleChange = (idx, id, e) => {
    const clone = [...drugData];

    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };

    setDrugData(clone);
  };
  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">CHALLAN RECEIVE </p>
        </div>
      </div>

      <HorizonatalLine text="Challan Details" />
      <Paper>
        {/* Table Rendering */}
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
                      <StyledTableRow key={data?.id}>
                        {columns.map((d, k) => {
                          if (d.id === "challanData") {
                            return (
                              <StyledTableCell padding="none">
                                {moment(data[d.id]).format("DD/MM/YYYY")}
                              </StyledTableCell>
                            );
                          } else {
                            return (
                              <StyledTableCell padding="none">
                                {data[d.id]}
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
        </div>
      </Paper>

      <HorizonatalLine text="Drug Details" />
      <Paper>
        {/* Table Rendering */}
        <div className="row">
          <div className="col-12">
            <TableComponent columns={drugColumns}>
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  tableData &&
                  tableData?.length > 0 &&
                  tableData?.map((data, index) => {
                    return (
                      <StyledTableRow key={data?.id}>
                        {drugColumns.map((d, k) => {
                          if (d.id === "expDate") {
                            return (
                              <StyledTableCell padding="none">
                                {moment(data[d.id]).format("DD/MM/YYYY")}
                              </StyledTableCell>
                            );
                          } else if (d.id === "receivedQty") {
                            return (
                              <StyledTableCell padding="none">
                                <BasicInput
                                  type="number"
                                  onChange={(e) => {
                                    handleChange(index, d.id, e.target.value);
                                  }}
                                />
                              </StyledTableCell>
                            );
                          } else {
                            return (
                              <StyledTableCell padding="none">
                                {data[d.id]}
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
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className="col-auto">
              <label className="form-label">NO OF PACKET RECEIVED</label>
            </div>
            <div className="col-auto">
              <BasicInput
                type="number"
                value={submitData?.packetReceived}
                onChange={(e) => {
                  setSubmitData({
                    ...submitData,
                    packetReceived: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className="col-auto">
              <label className="form-label">RECEIVED DATE</label>
            </div>
            <div className="col-auto">
              <CustDatepicker
                name="receivedDate"
                inputFormat="DD/MM/YYYY"
                value={submitData?.receivedDate}
                // disablePast={name === "endDate" ? true : false}
                onChange={(newValue) => {
                  setSubmitData({
                    ...submitData,
                    receivedDate: formatDate(newValue),
                  });
                }}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className="col-auto">
              <label className="form-label">REMARKS</label>
            </div>
            <div className="col-auto">
              <BasicTextAreaField
                rows={1}
                value={submitData?.remarks}
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
        <div className="row d-flex justify-content-center">
          <Basicbutton
            buttonText="Save"
            icon={<FontAwesomeIcon icon={faFloppyDisk} className="me-1" />}
          />
        </div>
      </Paper>
    </>
  );
};

export default ReceiveChallan;
