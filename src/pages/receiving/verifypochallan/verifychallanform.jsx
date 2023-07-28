import React, { useState, useMemo, useEffect } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { TableBody, Checkbox } from "@mui/material";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import moment from "moment";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import { SORTINGORDER } from "src/common/constant/constant";
import handleSortingFunc from "src/components/tables/datatable/sortable";
import HorizonatalLine from "src/components/horizontalLine/horizonatalLine";
import CheckBoxs from "src/components/switch/switchcheckbox";
import BasicInput from "src/components/inputbox/floatlabel/basicInput";
import CustDatepicker from "src/components/datepicker/custDatepicker";
import Basicbutton from "src/components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
const VerifyPoChallanForm = () => {
  const dispatch = useDispatch();
  const rateContractListResponse = useSelector(
    (state) => state.admin.rateContractListResponse
  );
  console.log("rateContractListResponse", rateContractListResponse);
  const [tableData, setTableData] = useState([]);
  const [sortedData, handleSorting] = useSortableTable();
  const [totalRows, setTotalRows] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const columns = useMemo(() => [
    {
      id: "poNo",
      name: "REQUEST NO.",
      sortable: true,
    },
    {
      id: "challanNo",
      name: "CHALLAN NO",
      sortable: true,
    },

    {
      id: "challandDate",
      name: "CHALLAN DATE",
      sortable: true,
    },

    {
      id: "supplierDate",
      name: "SUPPLIER DATE",
      sortable: true,
    },
    {
      id: "transporterName",
      name: "TRANSPORTER NAME",
      sortable: true,
    },
    {
      id: "loryNumber",
      name: "LORY NUMBER",
      sortable: true,
    },
    {
      id: "noOfBox",
      name: "NO. OF BOX",
      sortable: true,
    },
  ]);

  const drugColumns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "bactchNo",
      name: "BATCH NO",
      sortable: true,
    },

    {
      id: "mfgDate",
      name: "MANUFACTURE DATE",
      sortable: true,
    },

    {
      id: "expDate",
      name: "EXXPIRY DATE",
      sortable: true,
    },
    {
      id: "shelfLife",
      name: "SHELF LIFE(%)",
      sortable: true,
    },
    {
      id: "deliveredQty",
      name: "DELIVERED QTY",
      sortable: true,
    },
    {
      id: "reeivedQty",
      name: "RECEIVED QTY",
      sortable: true,
    },
    {
      id: "rackNo",
      name: "RACK NO",
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

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === SORTINGORDER.ASC
        ? SORTINGORDER.DESC
        : SORTINGORDER.ASC;
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

  const handleClick = (event, index, row) => {
    if (selected.includes(index)) {
      const openCopy = selected.filter((element) => {
        return element !== index;
      });
      setSelectedRow([]);
      setSelected(openCopy);
    } else {
      setSelectedRow(row);
      const openCopy = [...selected];
      openCopy.shift();
      openCopy.push(index);
      setSelected(openCopy);
    }
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getRateContractDeskList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      isApiSubcribed = false;
    };
  }, [controller]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">CHALLAN RECEIVE</p>
          </div>
        </div>

        <HorizonatalLine text="Challan Details" />
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
              handleSorting={handleSortingChange}
              checkBoxRequired={true}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  tableData &&
                  tableData?.map((row, index) => {
                    return (
                      <StyledTableRow>
                        {columns.map((d, k) => {
                          if (d.id === "challanDate") {
                            return (
                              <StyledTableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "10px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                {moment(row[d.id]).format("DD/MM/YYYY")}
                              </StyledTableCell>
                            );
                          } else {
                            return (
                              <StyledTableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "10px",
                                  fontSize: "0.7rem",
                                }}
                              >
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
        </div>
        <HorizonatalLine text="Drug Details" />

        <div className="row">
          <div className="col-6">
            <div className="col-auto">
              <label>DISCREPANCY IN THE DATA ENTERED BY SUPPLIER</label>
            </div>
            <div className="col-auto">
              <CheckBoxs
                type="checkbox"
                labelText="DISCREPANCY IN THE DATA ENTERED BY SUPPLIER"
              />
            </div>
          </div>
        </div>
        <TableComponent
          columns={drugColumns}
          sortField={sortField}
          order={order}
          checkBoxRequired={true}
        >
          <TableBody>
            {loading ? (
              <TableRowLaoder />
            ) : (
              tableData &&
              tableData?.map((row, index) => {
                return (
                  <StyledTableRow>
                    <StyledTableCell padding="none">
                      <Checkbox
                        onClick={(event) => handleClick(event, index, data)}
                        color="primary"
                        checked={selected.includes(index)}
                        inputProps={{
                          "aria-labelledby": `enhanced-table-checkbox-${index}`,
                        }}
                      />
                    </StyledTableCell>
                    {columns.map((d, k) => {
                      if (d.id === "batchNo") {
                        return (
                          <StyledTableCell key={k} padding="none">
                            <BasicInput type="text" onChange={(e) => {}} />
                          </StyledTableCell>
                        );
                      } else if (d.id === "expiryDate") {
                        return (
                          <StyledTableCell padding="none">
                            <CustDatepicker
                              name="receivedDate"
                              inputFormat="DD/MM/YYYY"
                              // disablePast={name === "endDate" ? true : false}
                              onChange={(newValue) => {}}
                            />
                          </StyledTableCell>
                        );
                      } else if (d.id === "mfgDate") {
                        return (
                          <StyledTableCell>
                            <CustDatepicker
                              name="receivedDate"
                              inputFormat="DD/MM/YYYY"
                              // disablePast={name === "endDate" ? true : false}
                              onChange={(newValue) => {}}
                            />
                          </StyledTableCell>
                        );
                      } else if (
                        d.id === "receivedQty" ||
                        d.id === "rejectedQty" ||
                        d.id === "rackNo"
                      ) {
                        return (
                          <StyledTableCell>
                            <BasicInput type="number" onChange={(e) => {}} />
                          </StyledTableCell>
                        );
                      } else {
                        return (
                          <StyledTableCell
                            key={k}
                            padding="none"
                            style={{
                              padding: "10px",
                              fontSize: "0.7rem",
                            }}
                          >
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

        <div className="row d-flex justify-content-center">
          <Basicbutton
            buttonText="Add"
            icon={<FontAwesomeIcon icon={faAdd} className="me-1" />}
          />
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="col-auto">
              <label className="form-label">NO OF PACKET RECEIVED</label>
            </div>
            <div className="col-auto">
              <BasicInput type="number" onChange={(e) => {}} />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="col-auto">
              <label className="form-label">RECEIVED DATE</label>
            </div>
            <div className="col-auto">
              <CustDatepicker
                name="receivedDate"
                inputFormat="DD/MM/YYYY"
                // disablePast={name === "endDate" ? true : false}
                onChange={(newValue) => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyPoChallanForm;
