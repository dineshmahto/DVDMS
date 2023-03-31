import React, { useState, useMemo } from "react";
import BasicButton from "../../components/button/basicbutton";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import SelectOption from "../../components/option/option";
import TableComponent from "../../components/tables/datatable/tableComponent";
import SearchField from "../../components/search/search";
import { faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import { TableBody, TableRow, TableCell } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
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
const CentralDemand = () => {
  const [tableData, setTableData] = useState(tempData);
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
      id: "notiId",
      name: "NOTI. ID",
      sortable: true,
    },
    {
      id: "notiDate",
      name: "NOTI. DATE",
      sortable: true,
    },

    {
      id: "financialYear",
      name: "FINANCIAL YEAR",
      sortable: true,
    },

    {
      id: "demandType",
      name: "DEMAND TYPE",
      sortable: true,
    },
    {
      id: "submLastDate",
      name: "SUBM. LAST DATE",
      sortable: true,
    },
    {
      id: "institute",
      name: "INSTITUTE",
      sortable: true,
    },
    {
      id: "programDetail",
      name: "PROGRAM DETAIL",
      sortable: true,
    },
    {
      id: "drugDetail",
      name: "DRUG DETAIL",
      sortable: true,
    },
    {
      id: "status",
      name: "STATUS",
      sortable: true,
    },
    {
      id: "dwonload",
      name: "DOWNLOAD",
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

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      console.log("sortField", sortField);
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        console.log("Dinesh", a[sortField]);
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">DEMAND NOTIFICATION DESK</p>
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
        <div className="row mt-2 lightBlueBackGround">
          <div className="d-flex justify-content-start">
            <BasicButton
              type="button"
              buttonText="New Notification (HQ)"
              className="secondary btn-sm"
              disabled={selected.length > 0 ? null : "disabled"}
              onClick={(e) => console.log("Selected Data", selectedRow)}
            />
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Notification Details" />
        </div>
        <div className="row">
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
              tableTitle="Central Purchase List"
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleSorting={handleSorting}
              numSelected={selected.length}
              rowCount={tableData?.length}
              actionIcon={faAdd}
              showTableActionBar={false}
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

export default CentralDemand;
