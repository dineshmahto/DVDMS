import React, { useMemo, useEffect, useState } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { Paper } from "@mui/material";
import NormalTableRow from "../../../components/tables/datatable/normalTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import Checkbox from "@mui/material/Checkbox";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import CustomSelect from "../../../components/select/customSelect";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import BackButon from "../../../components/button/backButon";
import { TableBody } from "@mui/material";
import Basicbutton from "../../../components/button/basicbutton";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewContractRate,
  addNewContractRateResponse,
  getNewRateContractList,
  getNewRateContractListResp,
} from "../../../store/ordermanagement/action";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../../common/constant/constant";
import toastMessage from "../../../common/toastmessage/toastmessage";
import CustDatepicker from "../../../components/datepicker/custDatepicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const NewRateContract = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newContractListResponse = useSelector(
    (state) => state?.ordermanaagement?.newRateContractListResp
  );
  console.log("newContractList", newContractListResponse);
  const addNewContractRateResp = useSelector(
    (state) => state?.ordermanaagement?.addNewContractRateResp
  );
  const [tableData, setTableData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const [drugClassList, setDrugClassList] = useState([]);
  const [drugManufactureList, setDrugManufactureList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [post, setPost] = useState([]);
  const [show, setShow] = useState(false);
  const [tenderNo, setTenderNo] = useState("");
  const [tenderDate, setTenderDate] = useState(null);
  const [contractDate, setContractDate] = useState(null);
  const [contractFromDate, setContractFromDate] = useState(null);
  const [contractToDate, setContractToDate] = useState(null);
  const [supplierId, setSupplierId] = useState("");
  const [storeName, setStoreName] = useState("");
  const column = useMemo(() => [
    {
      id: "drugId",
      name: "DRUG ID",
      sortable: false,
    },

    {
      id: "drugName",
      name: "GENERIC NAME",
      sortable: false,
    },

    {
      id: "mfgName",
      name: "MANUFACTURER NAME",
      sortable: false,
    },
    {
      id: "brandId",
      name: "BRAND ID",
      sortable: false,
    },
    {
      id: "unit",
      name: "UNIT",
      sortable: false,
    },
    {
      id: "rate",
      name: "RATE",
      sortable: false,
    },
    {
      id: "tax",
      name: "TAX",
      sortable: false,
    },
  ]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableData.map((n) => n.drugId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    console.log("newSlected", newSelected);
    setSelected(newSelected);
  };

  const handleChange = (idx, id, e) => {
    console.log("idx", idx);
    console.log("id", id);

    const result = [...totalElements]?.map((ele) => {
      if (ele?.drugId === id) {
        let clone = JSON.parse(JSON.stringify(ele));
        clone[`${idx}`] = e;
        return clone;
      }
      return ele;
    });
    console.log("result", result);
    const newItem = [...result].find((e, index) => {
      if (e?.drugId === id) {
        return e;
      }
    });
    console.log("newItem", newItem);
    const elementExist = [...selectedRow]?.filter((item) => {
      return item?.drugId === id;
    });
    if (elementExist.length === 0) {
      setSelectedRow([...selectedRow, newItem]);
    } else {
      for (let [i, item] of [...selectedRow]?.entries()) {
        if (item?.drugId === id) {
          selectedRow.splice(i, 1);
        }
      }
      setSelectedRow([...selectedRow, newItem]);
    }
    setTotalElements(result);
    setPost(result);
    console.log("totalELements", result);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handlePageChange = (newPage) => {
    setLoading(true);
    setCurrentPage(newPage);
    setController({
      ...controller,
      page: newPage,
    });
    updateTable(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    console.log("e", e);
    const offset = 1 * e;
    const currentPageData = [...totalElements].slice(offset, offset + e);
    setController({
      ...controller,
      rowsPerPage: e,
      page: 1,
    });
    setLoading(false);
    setTableData(currentPageData);
  };

  const updateTable = (newPage) => {
    const offset = newPage * controller.rowsPerPage;
    console.log("totalElements", totalElements);
    const currentPageData = [...totalElements].slice(
      offset,
      offset + controller.rowsPerPage
    );
    setLoading(false);
    setTableData(currentPageData);
  };

  useEffect(() => {
    dispatch(
      getNewRateContractList({
        pageNumber: controller.page,
        pageSize: controller.rowsPerPage,
      })
    );
  }, []);

  useEffect(() => {
    if (
      newContractListResponse &&
      newContractListResponse?.status === NETWORK_STATUS_CODE?.SUCCESS
    ) {
      setBrandList(newContractListResponse?.data?.getBrandListList);
      setDrugClassList(newContractListResponse?.data?.getDrugClassList);
      setDrugManufactureList(
        newContractListResponse?.data?.getDrugManufactureList
      );
      setSupplierList(newContractListResponse?.data?.getSupplierList);
      setTotalElements(newContractListResponse?.data?.getRateContactInfo);
      setStoreName(newContractListResponse?.data?.storeName);
      setPost(newContractListResponse?.data?.getRateContactInfo);
      const totalPageCount = Math.ceil(
        [...newContractListResponse?.data?.getRateContactInfo]?.length /
          controller?.rowsPerPage
      );

      setTotalPages(totalPageCount);
      console.log("totalpageCOunt", totalPageCount);

      const offset = controller.page * controller.rowsPerPage;

      console.log("offset", offset);
      const currentPageData = [
        ...newContractListResponse?.data?.getRateContactInfo,
      ].slice(offset, offset + controller.rowsPerPage);
      console.log("data", newContractListResponse?.data?.getRateContactInfo);
      console.log("currentPageData", currentPageData);
      //setTableData(newContractListResponse?.data?.getRateContactInfo);
      setTableData(currentPageData);
    } else if (
      newContractListResponse &&
      newContractListResponse?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage("NEW CONTRACT", newContractListResponse?.data?.message);
      dispatch(getNewRateContractListResp(""));
    }
  }, [newContractListResponse]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    if (
      addNewContractRateResp &&
      addNewContractRateResp?.status ===
        NETWORK_STATUS_CODE?.CREATED_SUCCESSFULLY
    ) {
      if (
        addNewContractRateResp?.data?.status === SERVER_STATUS_CODE?.SUCCESS
      ) {
        toastMessage(
          "NEW RATE CONTRACT",
          addNewContractRateResp?.data?.message
        );
        dispatch(addNewContractRateResponse(""));
        navigate("/openRateContractListing");
      } else if (
        addNewContractRateResp?.data?.status === SERVER_STATUS_CODE?.FAILED
      ) {
        toastMessage(
          "NEW RATE CONTRACT",
          addNewContractRateResp?.data?.message
        );
        dispatch(addNewContractRateResponse(""));
      }
    } else if (
      addNewContractRateResp &&
      addNewContractRateResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage(
        "ADD NEW CONTRACT RATE",
        addNewContractRateResp?.data?.message
      );
    }
  }, [addNewContractRateResp]);

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">RATE CONTRACT</p>
        </div>
      </div>
      <BackButon buttonText="Back" routePath="openRateContractListing" />
      <div className="row mt-2">
        <HorizonatalLine text="Add New Drug" />
      </div>

      {show && (
        <>
          <TableComponent columns={column} overFlow={true}>
            <TableBody>
              {loading ? (
                <TableRowLaoder />
              ) : (
                finalList &&
                finalList?.map((row, index) => {
                  return (
                    <NormalTableRow hover>
                      {column.map((d, k) => {
                        if (d.id === "unit") {
                          return (
                            <StyledTableCell padding="none">
                              <CustomSelect
                                defaultValue={drugClassList.find(
                                  (c) => c.value === row?.unit
                                )}
                                options={drugClassList}
                                onChange={(selectedOption) => {
                                  handleChange(
                                    d?.id,
                                    row?.drugId,
                                    selectedOption?.value
                                  );
                                }}
                                id={row.id + row[d.id]}
                              />
                            </StyledTableCell>
                          );
                        } else if (d.id === "mfgName") {
                          return (
                            <StyledTableCell padding="none">
                              <CustomSelect
                                defaultValue={drugManufactureList.find(
                                  (c) => c.value === row?.mfgName
                                )}
                                options={drugManufactureList}
                                onChange={(selectedOption) => {
                                  handleChange(
                                    d?.id,
                                    row?.drugId,
                                    selectedOption?.value
                                  );
                                }}
                                id={row.id + row[d.id]}
                              />
                            </StyledTableCell>
                          );
                        } else if (d.id === "brandId") {
                          return (
                            <StyledTableCell padding="none">
                              <CustomSelect
                                defaultValue={brandList.find(
                                  (c) => c.value === row?.brandId
                                )}
                                options={brandList}
                                onChange={(selectedOption) => {
                                  handleChange(
                                    d?.id,
                                    row?.drugId,
                                    selectedOption?.value
                                  );
                                }}
                                id={row.id + row[d.id]}
                              />
                            </StyledTableCell>
                          );
                        } else if (d.id === "tax" || d.id === "rate") {
                          return (
                            <StyledTableCell padding="none">
                              <BasicInput
                                onChange={(e) =>
                                  handleChange(
                                    d.id,
                                    row?.drugId,
                                    parseInt(e.target.value)
                                  )
                                }
                                type="text"
                                placeholder="Enter the Quantity"
                                value={row[`${d.id}`]}
                              />
                            </StyledTableCell>
                          );
                        } else {
                          return (
                            <StyledTableCell
                              className="text-center"
                              key={k}
                              padding="none"
                            >
                              {row[d.id]}
                            </StyledTableCell>
                          );
                        }
                      })}
                    </NormalTableRow>
                  );
                })
              )}
              <EmptyRow loading={loading} tableData={tableData} />
            </TableBody>
          </TableComponent>
          <div className="row">
            <div className="d-flex justify-content-around">
              <div>
                <div className="col-auto">
                  <label htmlFor="" className="col-form-label">
                    Supplier List :
                  </label>
                </div>
                <div className="col-auto">
                  <CustomSelect
                    options={supplierList}
                    onChange={(selectedOption) => {
                      setSupplierId(selectedOption?.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="col-auto">
                  <label htmlFor="" className="col-form-label">
                    Tender No :
                  </label>
                </div>
                <div className="col-auto">
                  <BasicInput
                    value={tenderNo}
                    name="tenderNo"
                    type="text"
                    // disablePast={name === "endDate" ? true : false}
                    onChange={(e) => {
                      setTenderNo(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="col-auto">
                  <label htmlFor="" className="col-form-label">
                    Tender Date :
                  </label>
                </div>
                <div className="col-auto">
                  <CustDatepicker
                    key="tenderDate"
                    value={tenderDate}
                    name="tenderDate"
                    inputFormat="DD/MM/YYYY"
                    // disablePast={name === "endDate" ? true : false}
                    onChange={(newValue) => {
                      setTenderDate(newValue);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="col-auto">
                  <label htmlFor="" className="col-form-label">
                    Contract Date :
                  </label>
                </div>
                <div className="col-auto">
                  <CustDatepicker
                    key="contractDate"
                    value={contractDate}
                    name="contractDate"
                    inputFormat="DD/MM/YYYY"
                    // disablePast={name === "endDate" ? true : false}
                    onChange={(newValue) => {
                      setContractDate(newValue);
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="col-auto">
                  <label htmlFor="" className="col-form-label">
                    Contract From :
                  </label>
                </div>
                <div className="col-auto">
                  <CustDatepicker
                    key="contractFrom"
                    value={contractFromDate}
                    name="contractFrom"
                    inputFormat="DD/MM/YYYY"
                    // disablePast={name === "endDate" ? true : false}
                    onChange={(newValue) => {
                      setContractFromDate(newValue);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="col-auto">
                  <label htmlFor="" className="col-form-label">
                    Contract To :
                  </label>
                </div>
                <div className="col-auto">
                  <CustDatepicker
                    key="contractTo"
                    value={contractToDate}
                    name="contractTo"
                    inputFormat="DD/MM/YYYY"
                    // disablePast={name === "endDate" ? true : false}
                    onChange={(newValue) => {
                      setContractToDate(newValue);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="d-flex justify-content-center">
              <Basicbutton
                buttonText="Save"
                className="btn btn-success rounded-0 mt-1 mb-1"
                onClick={() => {
                  dispatch(
                    addNewContractRate({
                      list: selectedRow,
                      tenderDate: formatDate(tenderDate),
                      contractDate: formatDate(contractDate),
                      contractFromDate: formatDate(contractFromDate),
                      contractToDate: formatDate(contractToDate),
                      tenderNo: tenderNo,
                      supplierId: supplierId,
                    })
                  );
                }}
              />
            </div>
          </div>
        </>
      )}

      <Paper>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={column}
              checkBoxRequired={true}
              multipleSelect={true}
              numSelected={selected.length}
              rowCount={tableData?.length}
              onSelectAllClick={handleSelectAllClick}
              overFlow={true}
              colouredHeader={true}
              stickyHeader={true}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  currentPosts &&
                  currentPosts?.map((row, index) => {
                    const isItemSelected = isSelected(row?.drugId);
                    console.log("isItemSelected", isItemSelected);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <NormalTableRow
                        hover
                        role="checkbox"
                        aria-checked={selected.includes(row?.drugId)}
                        tabIndex={-1}
                        key={row?.drugId}
                        selected={isItemSelected}
                      >
                        <StyledTableCell padding="none">
                          {/* <BasicInput
                            className="form-check-input"
                            type="checkbox"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(row?.drugId, row)}
                          /> */}
                          <Checkbox
                            onClick={(event) => handleClick(row?.drugId, row)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </StyledTableCell>

                        {column.map((d, k) => {
                          if (d.id === "unit") {
                            return (
                              <StyledTableCell padding="none">
                                <CustomSelect
                                  defaultValue={
                                    row[d.id] != null ||
                                    row[d.id] != "undefined"
                                      ? drugClassList.find(
                                          (c) => c.value === row[d.id]
                                        )
                                      : null
                                  }
                                  options={drugClassList}
                                  onChange={(selectedOption) => {
                                    handleChange(
                                      d?.id,
                                      row?.drugId,
                                      selectedOption?.value
                                    );
                                  }}
                                  id={row.id + row[d.id]}
                                  disabled={!isItemSelected}
                                />
                              </StyledTableCell>
                            );
                          } else if (d.id === "mfgName") {
                            return (
                              <StyledTableCell padding="none">
                                <CustomSelect
                                  defaultValue={
                                    row[d.id] != null ||
                                    row[d.id] != "undefined"
                                      ? drugManufactureList.find(
                                          (c) => c.value === row[d.id]
                                        )
                                      : null
                                  }
                                  options={drugManufactureList}
                                  onChange={(selectedOption) => {
                                    handleChange(
                                      d?.id,
                                      row?.drugId,
                                      selectedOption?.value
                                    );
                                  }}
                                  id={row.id + row[d.id]}
                                  disabled={!isItemSelected}
                                />
                              </StyledTableCell>
                            );
                          } else if (d.id === "brandId") {
                            return (
                              <StyledTableCell padding="none">
                                <CustomSelect
                                  defaultValue={
                                    row[d.id] != null ||
                                    row[d.id] != "undefined"
                                      ? brandList.find(
                                          (c) => c.value === row[d.id]
                                        )
                                      : null
                                  }
                                  options={brandList}
                                  onChange={(selectedOption) => {
                                    handleChange(
                                      d?.id,
                                      row?.drugId,
                                      selectedOption?.value
                                    );
                                  }}
                                  id={row.id + row[d.id]}
                                  disabled={!isItemSelected}
                                />
                              </StyledTableCell>
                            );
                          } else if (d.id === "tax" || d.id === "rate") {
                            return (
                              <StyledTableCell padding="none">
                                <BasicInput
                                  defaultValue={
                                    row[d.id] != null &&
                                    row[d.id] != "undefined"
                                      ? row[d.id]
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleChange(
                                      d.id,
                                      row?.drugId,
                                      parseInt(e.target.value)
                                    )
                                  }
                                  type="text"
                                  placeholder="Enter the Quantity"
                                  disabled={!isItemSelected}
                                />
                              </StyledTableCell>
                            );
                          } else {
                            return (
                              <StyledTableCell
                                className="text-center"
                                key={k}
                                padding="none"
                              >
                                {row[d.id]}
                              </StyledTableCell>
                            );
                          }
                        })}
                      </NormalTableRow>
                    );
                  })
                )}
                <EmptyRow loading={loading} tableData={post} />
              </TableBody>
            </TableComponent>
            <TablePagination
              page={currentPage}
              count={totalElements.length}
              rowsPerPage={postsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {tableData && tableData?.length > 0 ? (
              <>
                <div className="row">
                  <div className="d-flex justify-content-center">
                    <Basicbutton
                      buttonText="Cancel"
                      className="btn btn-danger rounded-0 me-2 mt-2"
                      onClick={() => {}}
                    />

                    <Basicbutton
                      buttonText="Add"
                      className="btn btn-primary rounded-0 mt-2"
                      onClick={() => {
                        setShow(true);
                        setFinalList(selectedRow);
                        console.log("selected", selectedRow);

                        // if (selected && selected.length > 0) {
                        //   const selectedList = [...tableData].filter((elem) => {
                        //     return selected.find((ele) => {
                        //       return ele === elem.drugId;
                        //     });
                        //   });
                        //   displayData.concat(selectedList);
                        //   const totalSelectedList = [
                        //     ...displayData,
                        //     ...selectedList,
                        //   ];

                        //   const newIssueList = tableData.filter((elem) => {
                        //     return !selected.find((ele) => {
                        //       return ele === elem.id;
                        //     });
                        //   });
                        // }

                        //reset the table Data
                      }}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Paper>
    </>
  );
};

export default NewRateContract;
