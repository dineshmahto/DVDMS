import { React, useState, useEffect, useMemo, lazy, Suspense } from "react";
import BasicButton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { faList, faSearch } from "@fortawesome/free-solid-svg-icons";
import { TableBody, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import moment from "moment";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import { getCentralpurchaseList } from "../../../store/ordermanagement/action";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  NETWORK_STATUS_CODE,
  SORTINGORDER,
} from "../../../common/constant/constant";
import searchFunc from "../../../components/tables/searchFunc";
const AcitvityListModal = lazy(() => import("./ActtivityList"));
const CentralPurchase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CentralPurchaseListResponse = useSelector(
    (state) => state.ordermanaagement.centralPurchaseListResponse
  );
  console.log("CentralPurchaseListResponse", CentralPurchaseListResponse);

  const [tableData, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState(SORTINGORDER.ASC);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openPreview, setOpenPreview] = useState(false);
  const [prevData, setPrevdata] = useState([]);
  const [modalHeadLine, setModalHeadLine] = useState("");
  const [colKey, setColKey] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterData, setFilterData] = useState([]);
  const columns = useMemo(() => [
    {
      id: "id",
      name: "ID",
      sortable: true,
    },
    {
      id: "financialYear",
      name: "Financial Year",
      sortable: true,
    },

    {
      id: "demandType",
      name: "Demand Type",
      sortable: true,
    },

    {
      id: "LastSubDate",
      name: "Last Sub date",
      sortable: true,
    },
    {
      id: "programList",
      name: "Program Name",
      sortable: true,
    },
    {
      id: "drugList",
      name: "Drug details",
      sortable: true,
    },
    {
      id: "status",
      name: "Status",
      sortable: true,
    },
  ]);
  const handlePageChange = (newPage) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (e) => {
    setController({
      ...controller,
      rowsPerPage: e,
      page: 0,
    });
  };

  const handleClick = (index, row) => {
    if (selected.includes(index)) {
      const openCopy = selected.filter((element) => {
        return element !== index;
      });
      const newselrow = selectedRow.filter((ele) => {
        return ele.id !== row.id;
      });
      setSelectedRow(newselrow);
      setSelected(openCopy);
    } else {
      selectedRow.push(row);
      const openCopy = [...selected];
      openCopy.push(index);
      setSelected(openCopy);
    }
  };

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === SORTINGORDER.ASC
        ? SORTINGORDER.DESC
        : SORTINGORDER.ASC;
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getCentralpurchaseList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      isApiSubcribed = false;
      setSelected([]);
    };
  }, [controller]);

  useEffect(() => {
    if (
      CentralPurchaseListResponse &&
      CentralPurchaseListResponse?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setTotalRows(CentralPurchaseListResponse?.data?.pageList?.totalElements);
      setTableData(CentralPurchaseListResponse?.data?.pageList?.content);
      setFilterData(CentralPurchaseListResponse?.data?.pageList?.content);
      setLoading(false);
    } else if (
      CentralPurchaseListResponse &&
      CentralPurchaseListResponse?.status == NETWORK_STATUS_CODE.INTERNAL_ERROR
    ) {
      setLoading(false);
      toastMessage(
        "Central Purchase",
        CentralPurchaseListResponse?.data?.message,
        "error"
      );
    }
  }, [CentralPurchaseListResponse]);

  const handleView = (data) => {
    console.log(data);
    setPrevdata(data);
    setOpenPreview(true);
  };

  const handleClose = () => {
    setPrevdata([]);
    setOpenPreview(false);
  };

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <span className="fs-5">CENTRAL PURCHASE DESK</span>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <label htmlFor="store_name" className=" fs-5">
            Store Name :
          </label>
          <label
            className="fs-6"
            style={{ height: "19px", width: "150px", marginLeft: "3px" }}
          >
            State Hq
          </label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <HorizonatalLine text="Notification details" />
        </div>
      </div>

      <Paper>
        <div className="row mt-2">
          <div className="col-2">
            {
              <BasicButton
                disabled={selectedRow.length === 0}
                className="btn btn-primary border rounded-0 mb-1"
                buttonText="Create Po."
                outlineType={true}
                onClick={() =>
                  navigate("/openNotificationDetails", { state: selectedRow })
                }
              ></BasicButton>
            }
          </div>
          <div className="col-10">
            <div className="d-flex justify-content-end">
              <SearchField
                iconPosition="end"
                iconName={faSearch}
                onChange={(e) => {
                  if (e.target?.value != "") {
                    setSearchValue(e?.target?.value);
                    setTableData(searchFunc(filterData, e.target?.value));
                  } else {
                    setTableData(filterData);
                    setSearchValue("");
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
              checkBoxRequired={true}
              handleSorting={handleSortingChange}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  tableData &&
                  tableData?.length > 0 &&
                  tableData?.map((row, index) => {
                    console.log("checked", selected.includes(index));
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <StyledTableRow
                        role="checkbox"
                        aria-checked={selected.includes(index)}
                        tabIndex={-1}
                        key={row.id}
                        selected={selected.includes(index)}
                      >
                        <StyledTableCell padding="none">
                          <Checkbox
                            onClick={() => handleClick(index, row)}
                            color="primary"
                            checked={selected.includes(index)}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </StyledTableCell>
                        {columns.map((d, k) => {
                          if (d.id === "SubDate") {
                            return (
                              <StyledTableCell
                                key={k}
                                padding="none"
                                style={{ fontSize: "13px" }}
                              >
                                {moment(row[d.id]).format("DD/MM/YYYY")}
                              </StyledTableCell>
                            );
                          }
                          if (d.id === "programList") {
                            return (
                              <StyledTableCell key={k} padding="none">
                                <span
                                  className="text-decoration-underline me-2"
                                  style={{
                                    fontSize: "0.8rem",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setModalHeadLine("Programe List");
                                    setColKey("programName");
                                    handleView(row[d.id]);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faList}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="VIEW PROGRMME"
                                  />
                                </span>
                              </StyledTableCell>
                            );
                          }
                          if (d.id === "drugList") {
                            return (
                              <StyledTableCell key={k} padding="none">
                                <span
                                  className="text-decoration-underline me-2"
                                  style={{
                                    fontSize: "0.8rem",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setModalHeadLine("Drug List");
                                    setColKey("drugName");
                                    handleView(row[d.id]);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faList}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="SHOW DRUG"
                                  />
                                </span>
                              </StyledTableCell>
                            );
                          }
                          return (
                            <StyledTableCell key={k} padding="none">
                              <span style={{ fontSize: "13px" }}>
                                {row[d.id]}
                              </span>
                            </StyledTableCell>
                          );
                        })}
                      </StyledTableRow>
                    );
                  })
                )}
                <EmptyRow loading={loading} tableData={tableData} />
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

      {openPreview && (
        <Suspense>
          <AcitvityListModal
            showActivityModal={openPreview}
            handleActivityShowModal={handleClose}
            activityList={prevData}
            title={modalHeadLine}
            colKey={colKey}
          />
        </Suspense>
      )}
    </>
  );
};

export default CentralPurchase;
