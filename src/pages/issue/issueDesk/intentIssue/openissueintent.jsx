import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import {
  getIntentDrug,
  getIntentDrugResponse,
} from "../../../../store/issue/action";
import { useNavigate } from "react-router-dom";
import TableRowLaoder from "../../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";
import BasicInput from "../../../../components/inputbox/floatlabel/basicInput";
import { useLocation } from "react-router-dom";
import { NETWORK_STATUS_CODE } from "../../../../common/constant/constant";

const IntentIssue = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log("state", state);
  const navigate = useNavigate();
  const intentDrgResp = useSelector(
    (state) => state.issuereturn?.intentDrugResponse
  );
  console.log("intentDrgResp", intentDrgResp);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [newIssueDrugDetails, setNewIssueDrugDetails] = useState([]);
  const [issueDrugDetails, setIssueDrugDetails] = useState([]);
  const [data, setData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    status: 99,
  });
  const [loading, setLoading] = useState(false);

  const column1 = useMemo(() => [
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
      id: "requestQty",
      name: "REQUEST QTY",
      sortable: false,
    },
    {
      id: "transferQty",
      name: "ISSUED QTY",
      sortable: false,
    },
    {
      id: "balance",
      name: "BALANCE",
      sortable: false,
    },
  ]);

  const columns = useMemo(() => [
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
      id: "manufactureDate",
      name: "MANUFACTURE DATE",
      sortable: false,
    },
    {
      id: "availableQty",
      name: "AVAILABLE QTY",
      sortable: false,
    },
    {
      id: "unitPrice",
      name: "UNIT PRICE",
      sortable: false,
    },
    {
      id: "tax",
      name: "TAX",
      sortable: false,
    },

    {
      id: "issuedQty",
      name: "ISSUED QTY",
      sortable: false,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getIntentDrug({
            requestId: state,
          })
        );
      }, 1000);
    }
    return () => {
      isApiSubcribed = false;
      clearTimeout();
      dispatch(getIntentDrugResponse(""));
    };
  }, [controller, state]);

  useEffect(() => {
    if (
      intentDrgResp &&
      intentDrgResp?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setNewIssueDrugDetails(intentDrgResp?.data?.getIndentDrug);
      setIssueDrugDetails(intentDrgResp?.data?.getIndentRequestDetail);
    }
  }, [intentDrgResp]);

  const handleStatusChange = (selectedOption) => {
    setController({
      ...controller,
      status: selectedOption?.value,
    });
  };

  const handleChange = (idx, id, e, data, setData) => {
    const clone = [...data];
    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };
    setData(clone);
  };

  useEffect(() => {
    setNewIssueDrugDetails([state]);
    setIssueDrugDetails([state]);
    setLoading(false);
  }, [state]);

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex jsutify-content-start">
          <Basicbutton
            buttonText="Back"
            className="warning rounded-0"
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => navigate("/openIssueDesk")}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">ISSUE TO SUB-STORE</p>
        </div>
      </div>
      <HorizonatalLine text="Intent Details" />
      <div className="row d-flex justify-content-start mb-2">
        <div className="col-6">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Store Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: 99,
                  label: "NHM and Family Welfare",
                }}
                options={[
                  {
                    value: 99,
                    label: "NHM and Family Welfare",
                  },
                ]}
                onChange={handleStatusChange}
              />
            </div>

            <div className="col-auto">
              <label>Receiving Store : </label>
            </div>
            <div className="col-auto">
              <label>Intent ID : </label>
            </div>
            <div className="col-auto">
              <label>Intent Date : </label>
            </div>
          </div>
        </div>
      </div>
      <Paper elevation={2}>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={column1}
              sortField={sortField}
              order={order}
              stickyHeader={true}
              colouredHeader={true}
              overFlow={true}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  issueDrugDetails &&
                  issueDrugDetails.length > 0 &&
                  issueDrugDetails.length > 0 &&
                  issueDrugDetails.map((data, index) => (
                    <StyledTableRow key={data.id}>
                      {column1.map((d, k) => {
                        return (
                          <StyledTableCell key={k} padding="none">
                            {data[d.id]}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  ))
                )}
                <EmptyRow loading={loading} tableData={issueDrugDetails} />
              </TableBody>
            </TableComponent>
          </div>
        </div>
      </Paper>
      <div className="row mt-2">
        <HorizonatalLine text="New Issue Drug Details" />
      </div>
      <Paper elevation={2}>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  newIssueDrugDetails &&
                  newIssueDrugDetails.length > 0 &&
                  newIssueDrugDetails.length > 0 &&
                  newIssueDrugDetails.map((data, index) => (
                    <StyledTableRow key={data.id}>
                      {columns.map((d, k) => {
                        if (d.id === "issuedQty") {
                          return (
                            <StyledTableCell key={k} padding="none">
                              <BasicInput
                                type="number"
                                onChange={(e) => {
                                  handleChange(
                                    index,
                                    d?.id,
                                    parseInt(e?.target?.value),
                                    newIssueDrugDetails,
                                    setData
                                  );
                                }}
                              />
                            </StyledTableCell>
                          );
                        } else {
                          return (
                            <StyledTableCell key={k} padding="none">
                              {data[d.id]}
                            </StyledTableCell>
                          );
                        }
                      })}
                    </StyledTableRow>
                  ))
                )}
                <EmptyRow loading={loading} tableData={newIssueDrugDetails} />
              </TableBody>
            </TableComponent>
            <div className="row">
              <div className="d-flex justify-content-center">
                <Basicbutton
                  buttonText="Preview"
                  className="primary rounded-0 mb-1"
                />
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default IntentIssue;
