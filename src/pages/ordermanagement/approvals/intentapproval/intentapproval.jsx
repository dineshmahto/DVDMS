import React, {
  useState,
  useMemo,
  useEffect,
  lazy,
  Suspense,
  useCallback,
} from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import SearchField from "../../../../components/search/search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIntentforApprovalList } from "../../../../store/ordermanagement/action";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@mui/material";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const tempData = [
  {
    id: 1,
    storeName: "STATE WAREHOUSE",
    drugName: "PARACETAMOL TAB. 500MG",
    progName: "COVID19",
    batchNo: "	21443792",
    expDate: "NOV-2024",
    mfgDate: "DEC-2021",
    dToExp: "597",
    avalQty: "579",
    rack: "0 ",
    instiute: "BOTH(NHM & DHS)",
    source: "ECRP",
  },
];
const IntentApproval = () => {
  const dispatch = useDispatch();
  const intentApprovalListResponse = useSelector(
    (state) => state.ordermanaagement?.intentApprovalListResponse
  );
  console.log("intentApprovalListResponse", intentApprovalListResponse);
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState(tempData);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const columns = useMemo(() => [
    {
      id: "fromStore",
      name: "INSTITUTE",
      sortable: true,
    },

    {
      id: "toStore",
      name: "SUB INSTITUTE / PARENT STORE",
      sortable: true,
    },
    {
      id: "requestNo",
      name: "REQUEST NUMBER",
      sortable: true,
    },
    {
      id: "requestDate",
      name: "REQUEST DATE",
      sortable: true,
    },
    {
      id: "type",
      name: "REQUEST TYPE",
      sortable: true,
    },
    // {
    //   id: "expDate",
    //   name: "INSTITUTE",
    //   sortable: true,
    // },
    {
      id: "status",
      name: "STATUS",
      sortable: true,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getIntentforApprovalList({
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
      intentApprovalListResponse &&
      intentApprovalListResponse?.status === 200
    ) {
      setTotalRows(intentApprovalListResponse?.data?.totalElements);
      setTableData(intentApprovalListResponse?.data?.content);
      setLoading(false);
    } else if (
      intentApprovalListResponse &&
      intentApprovalListResponse?.status == 400
    ) {
      setLoading(false);
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [intentApprovalListResponse]);

  const handlePageChange = (newPage) => {
    console.log("newPage", newPage);
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
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
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };
  const handleSorting = useCallback(
    (sortField, sortOrder) => {
      if (sortField) {
        const sorted = [...tableData].sort((a, b) => {
          if (a[sortField] === null) return 1;
          if (b[sortField] === null) return -1;
          if (a[sortField] === null && b[sortField] === null) return 0;

          return (
            a[sortField]
              .toString()
              .localeCompare(b[sortField].toString(), "en", {
                numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
          );
        });
        setSelected([]);

        setTableData(sorted);
      }
    },
    [sortField, order, tableData]
  );

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

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">APPROVAL DESK</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start mb-2">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Store Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "statewarehouse",
                  label: "STATE WAREHOUSE",
                }}
                options={[
                  { value: "statewarehouse", label: "STATE WAREHOUSE" },
                ]}
              />
            </div>

            <div className="col-auto">
              <label>Request Type</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "intentIssue",
                  label: "Intent for Issue",
                }}
                options={[
                  {
                    value: "intentIssue",
                    label: "Intent for Issue",
                  },
                ]}
              />
            </div>

            <div className="col-auto">
              <label>Request Status</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "all",
                  label: "All",
                }}
                options={[
                  {
                    value: "all",
                    label: "All",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-start">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <div>
                <Link to={"/openIssueToThirdparty"}>
                  <Basicbutton
                    type="button"
                    buttonText="Approval"
                    className="primary rounded-0"
                  />
                </Link>
              </div>
            </div>

            <div className="col-auto">
              <div>
                <Link to={"/openIssueToThirdparty"}>
                  <Basicbutton
                    type="button"
                    buttonText="Reapproval"
                    className="primary rounded-0"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="Excess/Shortage Requested Details" />
      </div>
      <div className="row mb-1">
        <div className="d-flex justify-content-end">
          <SearchField
            className="me-1 mt-1"
            iconPosition="end"
            iconName={faSearch}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div>
      <Paper>
        {/* Table Rendering */}
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
              checkBoxRequired={true}
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
                  tableData?.length > 0 &&
                  tableData?.map((data, index) => {
                    return (
                      <TableRow key={data.id}>
                        <TableCell padding="none">
                          <Checkbox
                            onClick={(event) => handleClick(event, index, data)}
                            color="primary"
                            checked={selected.includes(index)}
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${index}`,
                            }}
                          />
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.fromStore}
                        </TableCell>
                        <TableCell
                          padding="none"
                          className={[classes.tableCell, "text-center"]}
                        >
                          {data?.toStore}
                        </TableCell>
                        <TableCell
                          padding="none"
                          className={[classes.tableCell, "text-center"]}
                        >
                          {data?.requestNo}
                        </TableCell>
                        <TableCell
                          padding="none"
                          className={[classes.tableCell, "text-center"]}
                        >
                          {moment(data?.requesstDate).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell
                          padding="none"
                          className={[classes.tableCell, "text-center"]}
                        >
                          {data?.type}
                        </TableCell>

                        <TableCell
                          padding="none"
                          className={[classes.tableCell, "text-center"]}
                        >
                          {data?.status}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
                {console.log(tableData?.length)}
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

export default IntentApproval;
