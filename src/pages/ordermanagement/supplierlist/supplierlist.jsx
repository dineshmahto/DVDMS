import React, { useState, useMemo, useEffect } from "react";
import BasicButton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import SelectOption from "../../../components/option/option";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import { TableBody, TableRow, TableCell } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { getSupplierList } from "../../../store/admin/action";
import moment from "moment";
const SupplierList = () => {
  const dispatch = useDispatch();
  const supplierListResponse = useSelector(
    (state) => state.admin.supplierListResponse
  );
  console.log("supplierListResponse", supplierListResponse);
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

  const columns = useMemo(() => [
    {
      id: "id",
      name: "SUPPLIER ID",
      sortable: true,
    },
    {
      id: "supplierName",
      name: "SUPPLIER NAME",
      sortable: true,
    },

    {
      id: "poDate",
      name: "USER NAME",
      sortable: true,
    },

    {
      id: "address",
      name: "ADDRESS",
      sortable: true,
    },
    {
      id: "consignee",
      name: "CITY",
      sortable: true,
    },
    {
      id: "state",
      name: "STATE",
      sortable: true,
    },
    {
      id: "pin",
      name: "PIN",
      sortable: true,
    },
    {
      id: "country",
      name: "COUNTRY",
      sortable: true,
    },
    {
      id: "emailId",
      name: "EMAIL ID",
      sortable: true,
    },
    {
      id: "mobileNo",
      name: "MOBILE NO",
      sortable: false,
    },

    {
      id: "action",
      name: "EDIT / DELETE",
      sortable: false,
    },
  ]);
  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
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

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);

    handleSorting(accessor, sortOrder);
    console.log("sortedData", sortedData);
    setTableData(sortedData);
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getSupplierList({
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
    if (supplierListResponse && supplierListResponse?.status === 200) {
      setTotalRows(supplierListResponse?.data?.totalElements);
      setTableData(supplierListResponse?.data?.content);
      setLoading(false);
    } else if (supplierListResponse && supplierListResponse?.status == 400) {
      setLoading(false);
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [supplierListResponse]);
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">SUPPLIER MANAGEMENT DESK</p>
          </div>
        </div>

        <div className="row mt-2">
          <HorizonatalLine text="Supplier Management Desk" />
        </div>

        <div className="row mt-1 mb-2">
          <div className="d-flex justify-content-end ">
            <SearchField
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
              page={controller.page + 1}
              count={totalRows}
              rowsPerPage={controller.rowsPerPage}
              order={order}
              checkBoxRequired={true}
              paginationRequired={true}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              numSelected={selected.length}
              rowCount={tableData?.length}
              actionIcon={faAdd}
              showTableActionBar={false}
              handleSorting={handleSortingChange}
            >
              <TableBody>
                {tableData &&
                  tableData?.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={selected.includes(index)}
                        tabIndex={-1}
                        key={row.id}
                        selected={selected.includes(index)}
                      >
                        <TableCell padding="none">
                          <Checkbox
                            onClick={(event) => handleClick(event, index, row)}
                            color="primary"
                            checked={selected.includes(index)}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        {columns.map((d, k) => {
                          if (d.id === "poDate") {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "4px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                {moment(row[d.id]).format("DD/MM/YYYY")}
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell
                              key={k}
                              padding="none"
                              style={{ padding: "4px", fontSize: "0.7rem" }}
                            >
                              {row[d.id]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </TableComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierList;
