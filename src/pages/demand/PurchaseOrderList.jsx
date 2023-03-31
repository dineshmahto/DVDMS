import React, { useState, useMemo } from "react";
import BasicButton from "../../components/button/basicbutton";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import SelectOption from "../../components/option/option";
import TableComponent from "../../components/tables/datatable/tableComponent";
import SearchField from "../../components/search/search";
import { faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import { TableBody, TableRow, TableCell } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useSortableTable } from "../../components/tables/datatable/useSortableTable";
const tempData = [
  {
    id: 1,
    notiId: "142",
    notiDate: "30/11/2022",
    financialYear: "2022-2023",
    demandType: "ANNUAL PURCHASE DEMAND",
    submLastDate: "13/12/2022",
    institute: "MULTIPLE PROGRAMS",
    programDetail: "MULTIPLE PROGRAMS",
    drugDetail: "MULTIPLE PROGRAMS",
    status: "CLOSED",
  },
  {
    id: 2,
    notiId: "141",
    notiDate: "3/11/2022",
    financialYear: "2022-2023",
    demandType: "ANNUAL PURCHASE DEMAND",
    submLastDate: "13/12/2022",
    institute: "MULTIPLE PROGRAMS",
    programDetail: "MULTIPLE PROGRAMS",
    drugDetail: "MULTIPLE PROGRAMS",
    status: "CLOSED",
  },
];
const PurchaseOrderList = () => {
  const [tableData, setTableData] = useState(tempData);
  const [sortedData, handleSorting] = useSortableTable(tableData);
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
      id: "slNo",
      name: "SL.NO",
      sortable: true,
    },
    {
      id: "poNo",
      name: "PO.NO",
      sortable: true,
    },

    {
      id: "poDate",
      name: "PO DATE",
      sortable: true,
    },

    {
      id: "supplierName",
      name: "SUPPLIER NO",
      sortable: true,
    },
    {
      id: "conssignee",
      name: "CONSIGNEE",
      sortable: true,
    },
    {
      id: "programmeName",
      name: "PROGRAMME NAME",
      sortable: true,
    },
    {
      id: "drugName",
      name: "DRUG NAME|ORDERED QTY| RECEIVED QTY",
      sortable: true,
    },
    {
      id: "poTotalValue",
      name: "TOTAL PO VALUE (INC TAX)",
      sortable: true,
    },
    {
      id: "status",
      name: "STATUS",
      sortable: true,
    },
    {
      id: "dwonload",
      name: "VIEW/DOWNLOAD",
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
    setTableData(sortedData);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">PURCHASE ORDER</p>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-start">
            <div className="me-3">
              <div className="row g-0">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="storeName">
                    Store Name
                  </label>
                </div>
                <div className="col-6">
                  <SelectOption id="storeName" data={[]} />
                </div>
              </div>
            </div>
            <div className=" col-4">
              <div className="row g-0">
                <div className="col-6 text-center">
                  <label
                    className="labellineHeight"
                    htmlFor="notificationStatus"
                  >
                    Notification Status
                  </label>
                </div>
                <div className="col-4">
                  <SelectOption id="notificationStatus" data={[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Purchase Order Management Desk" />
        </div>
        <div className="row mt-2 lightBlueBackGround">
          <div className="d-flex justify-content-start">
            <BasicButton
              type="button"
              buttonText="Cancel PO"
              className="secondary btn-sm me-2 rounded-0"
              disabled={selected.length > 0 ? null : "disabled"}
              onClick={(e) => console.log("Selected Data", selectedRow)}
            />
            <BasicButton
              type="button"
              buttonText="Edit PO"
              className="secondary btn-sm rounded-0"
              disabled={selected.length > 0 ? null : "disabled"}
              onClick={(e) => console.log("Selected Data", selectedRow)}
            />
          </div>
        </div>

        <div className="row mt-1">
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
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              page={controller.page}
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

export default PurchaseOrderList;
