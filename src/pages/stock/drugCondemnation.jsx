import React, { useState, useMemo } from "react";
import TableComponent from "../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import CustomSelect from "../../components/select/customSelect";
import SelectOption from "../../components/option/option";
import { useSortableTable } from "../../components/tables/datatable/useSortableTable";
import Basicbutton from "../../components/button/basicbutton";
import SearchField from "../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Paper } from "@mui/material";
const DrugCondemnationRegister = () => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [sortedData, handleSorting] = useSortableTable(tableData);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const columns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
      type: "YMDPicker",
    },

    {
      id: "pName",
      name: "PROGRAM NAME",
      sortable: false,
      type: "select",
    },
    {
      id: "batchNO",
      name: "BATCH NO",
      sortable: false,
      type: "select",
    },
    {
      id: "CondemQty",
      name: "CONDEM QTY",
      sortable: false,
      type: "select",
    },
    {
      id: "condemType",
      name: "CONDEM. TYPE",
      sortable: false,
      type: "select",
    },
    {
      id: "reqDate",
      name: "REQUEST DATE",
      sortable: false,
      type: "input",
    },
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
    handleSorting(accessor, sortOrder);
    setTableData(sortedData);
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">DRUG CONDEMNATION REGISTER</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start">
        <div className="col-6">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Store Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{ value: "AZ", label: "Arizona" }}
                options={[
                  { value: "AL", label: "Alabama" },
                  { value: "AK", label: "Alaska" },
                  { value: "AS", label: "American Samoa" },
                  { value: "AZ", label: "Arizona" },
                  { value: "AR", label: "Arkansas" },
                  { value: "CA", label: "California" },
                  { value: "CO", label: "Colorado" },
                  { value: "CT", label: "Connecticut" },
                  { value: "DE", label: "Delaware" },
                  { value: "DC", label: "District Of Columbia" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Drug Condemnation Registered List" />
      </div>
      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Add New Condemnation"
              outlineType={true}
              className="primary rounded-0 mb-2 me-1 mt-2"
            />
          </div>
        </div>
        <div className="row mb-1">
          <div className="d-flex justify-content-end">
            <SearchField
              className="me-1 "
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
              count={totalPages}
              rowsPerPage={controller.rowsPerPage}
              order={order}
              paginationRequired={true}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleSorting={handleSortingChange}
              checkBoxRequired={false}
            ></TableComponent>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default DrugCondemnationRegister;