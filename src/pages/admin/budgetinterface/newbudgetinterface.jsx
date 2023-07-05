import React, { useState, useEffect, useMemo } from "react";

import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import CustomSelect from "../../../components/select/customSelect";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { Paper } from "@mui/material";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Basicbutton from "../../../components/button/basicbutton";
import {
  createNewBudgetDesk,
  createNewBudgetDeskResponse,
  getBudgetDetals,
  getBudgetDetalsResponse,
} from "../../../store/admin/action";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import { TableBody } from "@mui/material";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const OpenNotification = () => {
  const budgetDetails = useSelector((state) => state?.admin?.budgetDetailsResp);
  const createNewBudgetDeskResp = useSelector(
    (state) => state?.admin?.createBudgetDeskResp
  );
  console.log("budgetDetailsResp", budgetDetails, createNewBudgetDeskResp);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log("State", state);
  const [tableData, setTableData] = useState([]);
  const [fetchDetails, setFetchDetails] = useState({
    financialYear: "2021-2022",

    programId: "",
    fundingSource: "",
  });

  useEffect(() => {
    if (state === null || "") {
      navigate("/openBudgetListingInterface");
    }
  }, [state]);

  const handleFetchDetails = () => {
    if (
      fetchDetails?.store === "" ||
      fetchDetails?.programId === "" ||
      fetchDetails?.fundingSource === ""
    ) {
      toastMessage("Please select all the Required Fields");
    } else {
      console.log("Data", fetchDetails);
      dispatch(getBudgetDetals(fetchDetails));
    }
  };

  useEffect(() => {
    if (budgetDetails && budgetDetails?.status === 200) {
      setTableData(budgetDetails?.data?.budgetDataCall);
      dispatch(getBudgetDetalsResponse(""));
    } else if (budgetDetails && budgetDetails?.status === 500) {
      dispatch(getBudgetDetalsResponse(""));
      toastMessage("Budget Interface", "Something went wrong Try again");
    }
  }, [budgetDetails]);

  useEffect(() => {
    if (createNewBudgetDeskResp && createNewBudgetDeskResp?.status === 201) {
      if (
        createNewBudgetDeskResp &&
        createNewBudgetDeskResp?.data?.status === 1
      ) {
        setTableData([]);
        setFetchDetails({
          financialYear: "2021-2022",

          programId: null,
          fundingSource: "",
        });
        openBudgetForm();
        toastMessage(
          "Budget Interface",
          createNewBudgetDeskResp?.data?.message
        );
        dispatch(createNewBudgetDeskResponse(""));
      } else if (
        createNewBudgetDeskResp &&
        createNewBudgetDeskResp?.data?.status === 0
      ) {
        toastMessage(
          "Budget Interface",
          createNewBudgetDeskResp?.data?.message
        );
        dispatch(createNewBudgetDeskResponse(""));
      }
    } else if (
      createNewBudgetDeskResp &&
      createNewBudgetDeskResp?.status === 500
    ) {
      toastMessage("Create New Budget Interface", "Something went wrong");
      dispatch(createNewBudgetDeskResponse(""));
    }
  }, [createNewBudgetDeskResp]);
  const columns = useMemo(() => [
    {
      id: "budget_type",
      name: "BUDGET TYPE ",
      sortable: true,
    },

    {
      id: "sourceName",
      name: "FUNDING SOURCE",
      sortable: true,
    },
    {
      id: "budget_amount",
      name: "BUDGET ALLOCATED(TOTAL)",
      sortable: true,
    },
    {
      id: "utilized_budget",
      name: "UTILIZED BUDGET",
      sortable: true,
    },
    {
      id: "availableBudget",
      name: "AVAILABLE BUDGET",
      sortable: true,
    },
    {
      id: "newBudget",
      name: "NEW BUDGET",
      sortable: false,
    },
  ]);

  const handleChange = (idx, id, e) => {
    const clone = [...tableData];
    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };

    setTableData(clone);
  };

  const openBudgetForm = () => {
    return (
      <>
        <div className="row mt-3">
          <div className="d-flex">
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="financialYear">
                    Financial Year
                  </label>
                </div>
                <div className="col-7 m-0">
                  <CustomSelect
                    defaultValue={{ value: "2023-2024", label: "2023-2024" }}
                    options={[
                      { value: "select", label: "Select" },
                      { value: "2020-2021", label: "2020-2021" },
                      { value: "2021-2022", label: "2021-2022" },
                      { value: "2022-2023", label: "2022-2023" },
                    ]}
                    onChange={(selectedOption) => {
                      setFetchDetails({
                        ...fetchDetails,
                        financialYear: selectedOption?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="budgetAllocated">
                    Budget Allocated By
                  </label>
                </div>
                <div className="col-7">
                  <CustomSelect
                    defaultValue={{ value: "CMS HQ", label: "CMS HQ" }}
                    options={[{ value: "CMS HQ", label: "CMS HQ" }]}
                    onChange={(selectedOption) => {
                      console.log(selectedOption?.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="budgetForStore">
                    Budget For Store
                  </label>
                </div>
                <div className="col-7">
                  <CustomSelect
                    options={state?.storeList ? state?.storeList : []}
                    onChange={(selectedOption) => {}}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="programmeName">
                    Programme Name
                  </label>
                </div>
                <div className="col-7">
                  <CustomSelect
                    value={state?.programmeList?.find(
                      (c) => c.value === fetchDetails?.programId
                    )}
                    options={state?.programmeList}
                    onChange={(selectedOption) => {
                      setFetchDetails({
                        ...fetchDetails,
                        programId: selectedOption?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-6 text-center">
                  <label className="labellineHeight" htmlFor="fundingSource">
                    Funding Source
                  </label>
                </div>
                <div className="col-6">
                  <CustomSelect
                    options={state?.sourceList}
                    onChange={(selectedOption) => {
                      setFetchDetails({
                        ...fetchDetails,
                        fundingSource: selectedOption?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="d-flex justify-content-center">
            <Basicbutton
              className="success rounded-0"
              buttonText="Go"
              onClick={handleFetchDetails}
            />
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Paper className="p-2 mt-2">
        <div className="row">
          <div className="d-flex justify-content-start">
            <Basicbutton
              buttonText="Back"
              onClick={() => navigate("/openBudgetListingInterface")}
              className="warning rounded-0"
              icon={<FontAwesomeIcon icon={faArrowLeft} className="me-1" />}
            />
          </div>
        </div>
        {openBudgetForm()}
        {tableData && tableData?.length > 0 ? (
          <>
            <TableComponent columns={columns} checkBoxRequired={false}>
              <TableBody>
                {tableData &&
                  tableData.length > 0 &&
                  tableData.map((data, index) => {
                    return (
                      <StyledTableRow>
                        {columns.map((d, k) => {
                          if (d.id === "newBudget") {
                            return (
                              <StyledTableCell>
                                <BasicInput
                                  id={data?.id + d.id}
                                  type="number"
                                  className="form-control form-control-sm shadow-none"
                                  placeholder="Amount"
                                  onChange={(e) => {
                                    handleChange(index, d.id, e.target.value);
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
                    );
                  })}
              </TableBody>
            </TableComponent>
            <div className="row">
              <div className="d-flex justify-content-center">
                <Basicbutton
                  buttonText="Save"
                  className="success rounded-0"
                  icon={
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                  }
                  onClick={() => {
                    console.log(tableData);
                    const cloneData = [...tableData];
                    const isEmpty = tableData?.some(function (object) {
                      if (Object.keys(object).includes("newBudget")) {
                        return (
                          object.newBudget === "" ||
                          object.newBudget === "undefined"
                        );
                      } else {
                        return true;
                      }
                    });
                    if (isEmpty) {
                      toastMessage(
                        "New Budget Interface",
                        "Please fill all the Amount fields",
                        "error"
                      );
                    } else {
                      const finalData = cloneData?.map((item) => {
                        return {
                          newBudget: item?.newBudget,
                          programId: item?.programId,
                          sourceId: item?.sourceId,
                          year: item?.year,
                        };
                      });
                      console.log("finalData", finalData);
                      dispatch(createNewBudgetDesk({ list: finalData }));
                    }
                  }}
                />
              </div>
            </div>
          </>
        ) : null}
      </Paper>
    </>
  );
};

export default OpenNotification;
