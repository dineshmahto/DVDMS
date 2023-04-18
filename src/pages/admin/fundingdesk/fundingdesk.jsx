import React, { useEffect, useMemo, useState } from "react";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
import { Spinner } from "react-bootstrap";
import {
  useFormik,
  FormikProvider,
  Form,
  useField,
  Field,
  Formik,
} from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import BasicModal from "../../../components/modal/basicmodal";

const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});

const FundingDesk = () => {
  const classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  console.log(typeof tableData, tableData.length);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const columns = useMemo(() => [
    {
      id: "fundingSrcName",
      name: "FUNDING SOURCE NAME",
      sortable: true,
    },

    {
      id: "code",
      name: "CODE",
      sortable: true,
    },
    {
      id: "effDate",
      name: "EFFECTIVE DATE",
      sortable: true,
    },
    {
      id: "action",
      name: "ACTION",
      sortable: false,
    },
  ]);
  const createFundingSchema = Yup.object().shape({
    fundingSrcName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    code: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const Example = () => {
    return (
      <Formik
        initialValues={{
          fundingSrcName: "",
          code: "",
          effectiveDate: "",
        }}
        validationSchema={createFundingSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="fundingSrcName">Funding Source Name</label>
            <Field
              name="fundingSrcName"
              type="text"
              className="form-control shadow-none"
              placeholder="Funding Source Name"
            />
            {errors.fundingSrcName && touched.fundingSrcName ? (
              <div>{errors.fundingSrcName}</div>
            ) : null}
            <label htmlFor="code">Code</label>
            <Field
              name="code"
              type="text"
              className="form-control shadow-none"
            />
            {errors.code && touched.code ? <div>{errors.code}</div> : null}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name=""
                className={classes.root}
                onChange={(newValue) => {
                  console.log("NewValue", newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div>
              <Basicbutton type="submit" buttonText="Submit" />
              <Basicbutton type="reset" buttonText="Reset" />
            </div>
          </Form>
        )}
      </Formik>
    );
  };
  const handlePageChange = (newPage) => {
    console.log("newPage", newPage);
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (current, pageSize) => {
    console.log(current, pageSize);
    setController({
      ...controller,
      rowsPerPage: pageSize,
      page: 0,
    });
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6 text-3xl font-bold underline">FUNDING DESK</p>
        </div>
      </div>

      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Add New Funding"
              className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
              onClick={() => {
                setShowCreateModal(true);
              }}
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
              count={totalRows}
              rowsPerPage={controller.rowsPerPage}
              order={order}
              paginationRequired={true}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleSorting={handleSortingChange}
              checkBoxRequired={false}
            >
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell className="text-center" colSpan={12}>
                      <Spinner />
                    </TableCell>
                  </TableRow>
                ) : (
                  tableData &&
                  tableData.length > 0 &&
                  tableData.map((data, index) => {
                    return (
                      <TableRow key={data.id}>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data.programme}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data.financialYear}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.fundingSource}
                        </TableCell>

                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.budgetAllocated}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.utlzBudget}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.avlBudget}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}

                {!loading && tableData && tableData.length === 0 && (
                  <TableRow>
                    <TableCell className="text-center" colSpan={12}>
                      <p style={{ fontSize: "0.8rem" }}>
                        NO DATA AVAILABE IN TABLE
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </TableComponent>
          </div>
        </div>
      </Paper>
      <BasicModal
        title="Create New Funding"
        show={showCreateModal}
        close={() => setShowCreateModal(false)}
        isStatic={false}
        scrollable={true}
        isCenterAlign={true}
        fullScreen={false}
        size="lg"
        key="list_Activity"
      >
        {Example()}
      </BasicModal>
    </>
  );
};

export default FundingDesk;
