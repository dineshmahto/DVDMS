import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import Basicbutton from "../../../components/button/basicbutton";
import BasicModal from "../../../components/modal/basicmodal";
import SearchField from "../../../components/search/search";
import { Spinner } from "react-bootstrap";
import {
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "../../../components/select/customSelect";
import { getAdminService } from "../../../services/adminservice/adminservice";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import * as CONSTANTS from "../../../common/constant/constants";
import { Seo } from "../../../components/seo/seo";
import CreateUserModalForm from "./createusermodalform";
import EditUserModalForm from "./editusermodalform";
import UserActivityListModal from "./useractivitylistmodal";
const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const StoreDesk = () => {
  let classes = useStyles();
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [activityList, setActivityList] = useState([]);
  const [activityType, setActivityType] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [dropDwonRoleList, setDropDownRoleList] = useState([]);
  const [dropDownStoreList, setDropDownStoreList] = useState([]);
  const columns = useMemo(() => [
    {
      id: "storeId",
      name: "STORE ID",
      sortable: true,
    },

    {
      id: "storeName",
      name: "STORE NAME",
      sortable: true,
    },
    {
      id: "storeType",
      name: "STORE TYPE",
      sortable: true,
    },
    {
      id: "reportingStore",
      name: "REPORTING STORE",
      sortable: true,
    },
    {
      id: "ownerList",
      name: "OWNER LIST",
      sortable: true,
    },
    {
      id: "district",
      name: "DISTRICT",
      sortable: true,
    },
    {
      id: "block",
      name: "BLOCK",
      sortable: true,
    },
    {
      id: "address",
      name: "Address",
      sortable: true,
    },
    {
      id: "contactNo",
      name: "CONTACT NO",
      sortable: true,
    },
    {
      id: "longitute",
      name: "LONGITUTE",
      sortable: true,
    },
    {
      id: "latitude",
      name: "LATITUDE",
      sortable: true,
    },
    {
      id: "deptOpd",
      name: "DEPT. OPD",
      sortable: true,
    },
    {
      id: "ninNumber",
      name: "NIN NUMBER",
      sortable: true,
    },
    {
      id: "Action",
      name: "Edit / Delete",
      sortable: false,
    },
  ]);

  const handlePageChange = (newPage) => {
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
              ?.toString()
              ?.localeCompare(b[sortField]?.toString(), "en", {
                numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
          );
        });

        setTableData(sorted);
      }
    },
    [sortField, order, tableData]
  );
  return (
    <>
      <Seo title="DVDMS | Store Desk" description="Store Desk" />
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">STORE LIST</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Store Management Desk" />
      </div>
      <Paper>
        <div className="row">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Add New Store"
              outlineType={true}
              className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
              onClick={() => {
                setShowAddModal(true);
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
                    {
                      columns.map((d, k) => {
                        if (d.id === "Action") {
                          return (
                            <TableCell
                              padding="none"
                              className={classes.tableCell}
                            >
                              <span
                                className="text-decoration-underline ms-1"
                                style={{
                                  fontSize: "0.7rem",
                                  cursor: "pointer",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  className="me-2"
                                />
                              </span>
                              <span className="m-1"> |</span>

                              <span
                                className="text-decoration-underline"
                                style={{
                                  fontSize: "0.7rem",
                                  cursor: "pointer",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="ms-2"
                                  color="red"
                                />
                              </span>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              key={k}
                              padding="none"
                              style={{
                                padding: "4px",
                                fontSize: "0.7rem",
                              }}
                            >
                              {data[d.id]}
                            </TableCell>
                          );
                        }
                      });
                    }
                  })
                )}
                {!loading && tableData && (
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
    </>
  );
};

export default StoreDesk;
