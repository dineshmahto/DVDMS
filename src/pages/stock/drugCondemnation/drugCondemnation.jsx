import React, { useState, useMemo, useEffect } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrugCondemnation,
  getDrugCondemnationListResponse,
} from "../../../store/stock/action";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { Link } from "react-router-dom";

const DrugCondemnationRegister = () => {
  const dispatch = useDispatch();
  const drugCondemnationListResp = useSelector(
    (state) => state?.stock?.drugCondemnationListResponse
  );
  console.log("drugCondemnationListResp", drugCondemnationListResp);
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
  const columns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },

    {
      id: "programName",
      name: "PROGRAM NAME",
      sortable: true,
    },
    {
      id: "batchNO",
      name: "BATCH NO",
      sortable: false,
      type: "select",
    },
    {
      id: "condemQty",
      name: "CONDEM QTY",
      sortable: true,
    },
    {
      id: "condemType",
      name: "CONDEM. TYPE",
      sortable: true,
    },
    {
      id: "reqDate",
      name: "REQUEST DATE",
      sortable: true,
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
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };
  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getDrugCondemnation({
            ...controller,
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 1000);
    }
    return () => {
      dispatch(getDrugCondemnationListResponse(""));
      clearTimeout();
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (drugCondemnationListResp && drugCondemnationListResp?.status === 200) {
      setTotalRows(drugCondemnationListResp?.data?.pageList?.totalElements);
      setTableData(drugCondemnationListResp?.data?.pageList?.content);
      setLoading(false);
      dispatch(getDrugCondemnationListResponse(""));
    } else if (
      drugCondemnationListResp &&
      drugCondemnationListResp?.status === 400
    ) {
      setLoading(false);
      dispatch(getDrugCondemnationListResponse(""));
    }
  }, [drugCondemnationListResp]);
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
          <div className="d-flex flex-row justify-content-between">
            <Link to={"/openVerificationDesk"}>
              <Basicbutton
                buttonText="Add New Condemnation"
                outlineType={true}
                className="primary rounded-0 mb-2 me-1 mt-2"
              />
            </Link>

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
              order={order}
              handleSorting={handleSortingChange}
              checkBoxRequired={false}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  tableData.length > 0 &&
                  tableData.map((data, index) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell padding="none">
                        {data?.drugName}
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {data?.programName}
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {data?.batchNo}
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {data?.condemnQty}
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {data?.condemType}
                      </StyledTableCell>

                      <StyledTableCell padding="none">
                        {moment(data?.reqDate).format("DD/MM/YYYY")}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
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
    </>
  );
};

export default DrugCondemnationRegister;
