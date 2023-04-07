import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { useSortableTable } from "../../components/tables/datatable/useSortableTable";
import { getStockservice } from "../../services/stockservice/stockservice";
const useStyles = makeStyles({
  tableCell: {
    padding: "10px",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const StockListing = () => {
  let classes = useStyles();
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
      id: "storeName",
      name: "STORE. NAME",
      sortable: true,
    },

    {
      id: "dName",
      name: "DRUG NAME",
      sortable: true,
    },

    {
      id: "progName",
      name: "PROGRAMME NAME",
      sortable: true,
    },
    {
      id: "batchNO",
      name: "BATCH NO.",
      sortable: true,
    },
    {
      id: "expDate",
      name: "EXPIRY DATE",
      sortable: true,
    },
    {
      id: "mfgDate",
      name: "MANUFACTURE DATE",
      sortable: true,
    },
    {
      id: "dToExp",
      name: "DAYS TO EXPIRE",
      sortable: true,
    },
    {
      id: "avalQty",
      name: "AVAIL. QTY.",
      sortable: true,
    },
    {
      id: "uPrice",
      name: "UNIT PRICE",
      sortable: true,
    },
    {
      id: "instiute",
      name: "INSTITUE",
      sortable: true,
    },
    {
      id: "donated",
      name: "DONATED",
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
    handleSorting(accessor, sortOrder);
    setTableData(sortedData);
  };

  const callApi = async () => {
    await getStockservice("pagination/calls/stocklisting", {
      pageNumber: controller.page,
      pageSize: controller.rowsPerPage,
    })
      .then((r) => {
        setLoading(false);
        setTotalPages(r?.data?.totalPages);
        // setTotalRows(r.data.totalElements);
        setTableData(r.data.content);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      callApi();
    }, 10000);
    return () => {
      clearTimeout();
    };
  }, [controller]);

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">STOCK DESK</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Stock Management Desk" />
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
          >
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell className="text-center" colSpan={12}>
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : (
                tableData.length > 0 &&
                tableData.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.storeName}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.dName}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.progName}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.batchNo}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {moment(data?.expDate).format("DD/MM/YYYY")}
                    </TableCell>

                    <TableCell padding="none" className={classes.tableCell}>
                      {moment(data?.mfgDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.dToExp}
                      {data?.status === 10
                        ? "	Compiled by HQ"
                        : data?.status === 11
                        ? " 	Closed"
                        : data?.status === 1
                        ? "Active"
                        : data?.status === 3
                        ? "Cancelled"
                        : ""}
                    </TableCell>

                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.avalQty}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.uPrice}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.instiute}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.donated}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </TableComponent>
        </div>
      </div>
    </>
  );
};

export default StockListing;
