import { React, useState, useEffect, useMemo } from "react";

import BasicButton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";

import Modal from "react-awesome-modal";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { TableBody, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
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
import { faClose } from "@fortawesome/free-solid-svg-icons";

const CentralPurchase = () => {
  const dispatch = useDispatch();
  const CentralPurchaseListResponse = useSelector(
    (state) => state.ordermanaagement.centralPurchaseListResponse
  );

  console.log("CentralPurchaseListResponse", CentralPurchaseListResponse);
  const [tableData, setTableData] = useState([]);
  const [sortedData, handleSorting] = useSortableTable();
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openPreview, setOpenPreview] = useState(false);
  const [prevData, setPrevdata] = useState([]);
  const [modalHeadLine, setModalHeadLine] = useState("");
  const [modelCol, setModelCol] = useState("");

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
  const handlePageChange = (event, newPage) => {
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

  // const handleClick = (event, index, row) => {
  //   if (selected.includes(index)) {
  //     const openCopy = selected.filter((element) => {
  //       return element !== index;
  //     });
  //     setSelectedRow([]);
  //     setSelected(openCopy);
  //   } else {
  //     setSelectedRow(row);
  //     const openCopy = [...selected];
  //     openCopy.shift();
  //     openCopy.push(index);
  //     setSelected(openCopy);
  //   }
  // };

  const handleClick = (event, index, row) => {
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
      //openCopy.shift();
      openCopy.push(index);
      setSelected(openCopy);
    }
  };
  useEffect(() => {
    console.log("selected", selected);
    console.log("selectedRow", selectedRow);
  }, [selected, selectedRow]);

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
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
    };
  }, [controller]);

  useEffect(() => {
    if (
      CentralPurchaseListResponse &&
      CentralPurchaseListResponse?.status === 200
    ) {
      setTotalRows(CentralPurchaseListResponse?.data?.pageList?.totalElements);
      setTableData(CentralPurchaseListResponse?.data?.pageList?.content);
      setLoading(false);
    } else if (
      CentralPurchaseListResponse &&
      CentralPurchaseListResponse?.status == 400
    ) {
      setLoading(false);
      toastMessage("Login Error", "Please enter valid ID", "error");
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
      {/* <div className="row mt-2 mb-3">
          <div className="col-md-12">
            <label htmlFor="Show" >Show</label>
            <select name="" id="" style={{height:'19px',width:'80px' ,marginLeft:'3px' ,marginRight:'3px'}}>
                <option value={10}>10</option>
                <option value={10}>20</option>
                <option value={10}>50</option>
                <option value={10}>100</option>
            </select>
            <label htmlFor="Entries" >Entries</label>
          </div>
        </div> */}

      <Paper>
        <div className="row mt-2">
          <div className="col-2">
            {
              <BasicButton
                disabled={selectedRow.length === 0}
                className="btn btn-success border rounded"
                buttonText="Create Po."
                outlineType={true}
              ></BasicButton>
            }
          </div>
          <div className="col-10">
            <div className="d-flex justify-content-end">
              <SearchField
                iconPosition="end"
                iconName={faSearch}
                onChange={(e) => {
                  console.log(e);
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
                            onClick={(event) => handleClick(event, index, row)}
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
                                <a
                                  href="##"
                                  onClick={() => {
                                    setModalHeadLine("Programme List");
                                    setModelCol("programName");
                                    handleView(row[d.id]);
                                  }}
                                >
                                  <p
                                    style={{
                                      textDecoration: "underline",
                                      fontSize: "13px",
                                    }}
                                  >
                                    view Programme
                                  </p>
                                </a>
                              </StyledTableCell>
                            );
                          }
                          if (d.id === "drugList") {
                            return (
                              <StyledTableCell key={k} padding="none">
                                <a
                                  href="##"
                                  onClick={() => {
                                    setModalHeadLine("Drug List");
                                    setModelCol("drugName");
                                    handleView(row[d.id]);
                                  }}
                                >
                                  <p
                                    style={{
                                      textDecoration: "underline",
                                      fontSize: "13px",
                                    }}
                                  >
                                    view Druglist
                                  </p>
                                </a>
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

      <Modal visible={openPreview} width="700" height="400" effect="fadeInLeft">
        <div
          style={{ maxHeight: "100%", overflowY: "auto", overflowX: "hidden" }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="row  mt-2 mb-4">
                <div className="col-md-10  offset-1 ">
                  <h4 className="text-primary">{modalHeadLine}</h4>
                </div>
                <div className="col-md-1">
                  <span type="button" onClick={handleClose}>
                    <FontAwesomeIcon
                      icon={faClose}
                      className="fa-2xl"
                      color="red"
                    />
                  </span>
                </div>
                <hr></hr>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <ul>
                    {prevData.map((data, index) => {
                      return (
                        <>
                          <span style={{ marginRight: "16px" }}>
                            {index + 1}
                          </span>
                          <span key={data.id}>{data[modelCol]}</span>; <br></br>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CentralPurchase;
