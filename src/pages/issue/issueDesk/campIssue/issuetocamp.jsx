import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import { Spinner } from "react-bootstrap";
import {
  faSearch,
  faShareFromSquare,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import SearchField from "../../../../components/search/search";
import { useDispatch, useSelector } from "react-redux";
import {
  getIssueCampList,
  getIssueCampListResponse,
} from "../../../../store/issue/action";
import { useNavigate } from "react-router-dom";
import Basicbutton from "../../../../components/button/basicbutton";
import { Paper } from "@mui/material";
import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../../components/tables/datatable/sortable";
const IssueDrugModal = lazy(() =>
  import("../issueToThirdParty/issuedrugmodal")
);
const IssueToCamp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const issueToCampResponse = useSelector(
    (state) => state?.issuereturn?.issueCampListResponse
  );
  console.log("issueToCampResponse", issueToCampResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [campName, setCampName] = useState([]);
  const columns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "programName",
      name: "PROGRAM NAME.",
      sortable: true,
    },
    {
      id: "packDes",
      name: "PACKAGING. DESCRIPTION",
      sortable: true,
    },

    {
      id: "availableQty",
      name: "AVAILABLE QTY",
      sortable: true,
    },

    {
      id: "issueDrugs",
      name: "ISSUE DRUGS",
      sortable: false,
    },
    ,
  ]);

  const handlePageChange = (event, newPage) => {
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (current, pageSize) => {
    console.log(current, pageSize);
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

  const handleAddDrugModal = () => {
    setShowAddDrugModal(false);
  };
  useEffect(() => {
    setLoading(false);

    setTimeout(() => {
      dispatch(
        getIssueCampList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }, 10000);
    return () => {
      clearTimeout();
      dispatch(getIssueCampListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (issueToCampResponse && issueToCampResponse?.status === 200) {
      setTableData(issueToCampResponse?.data?.pageList?.content);
      setTotalRows(issueToCampResponse?.data?.pageList?.totalElements);
      setCampName(issueToCampResponse?.data?.campNameList);
      setLoading(false);
    }
  }, [issueToCampResponse]);

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
          <p className="fs-6">ISSUE TO CAMP</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Your Store</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "statewarehouse",
                  label: "STATE WAREHOUSE",
                }}
                options={[
                  { value: "statewarehouse", label: "STATE WAREHOUSE" },
                ]}
              />
            </div>

            <div className="col-auto">
              <label>Camp Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect options={campName} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="New Issue Drug Details" />
      </div>
      <Paper>
        <div className="row mb-1">
          <div className="d-flex justify-content-end">
            <SearchField
              className="me-1 mt-1"
              iconPosition="end"
              iconName={faSearch}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
              handleSorting={handleSortingChange}
              checkBoxRequired={false}
            >
              <TableBody>
                {loading ? (
                  <StyledTableRow>
                    <StyledTableCell colSpan={12}>
                      <Spinner />
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  tableData.length > 0 &&
                  tableData.map((data, index) => (
                    <StyledTableRow key={data.id}>
                      {columns.map((d, k) => {
                        if (d.id === "issueDrugs") {
                          return (
                            <StyledTableCell
                              key={k}
                              padding="none"
                              onClick={() => {
                                setShowAddDrugModal(true);
                                setModalData(data);
                              }}
                            >
                              <span>
                                <FontAwesomeIcon icon={faShareFromSquare} />{" "}
                                Click Here
                              </span>
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
              </TableBody>
            </TableComponent>
            <TablePagination
              page={controller.page + 1}
              count={totalRows}
              rowsPerPage={controller?.rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </Paper>
      <Suspense fallback={<Spinner />}>
        <IssueDrugModal
          loading={true}
          data={modalData}
          showAddDrugModal={showAddDrugModal}
          handleAddDrugModal={handleAddDrugModal}
        />
      </Suspense>
    </>
  );
};

export default IssueToCamp;
