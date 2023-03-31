import { React, useMemo, useState, useEffect } from "react";
import TableComponent from "../../components/tables/datatable/tableComponent";
import CommonTableBody from "../../components/tables/datatable/commonTableBody";
import programlistservice from "../../services/programservice/programlistservice";
import SearchField from "../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Programme = () => {
  const [tableData, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const emptyRows =
    controller.page > 0
      ? Math.max(
          0,
          (1 + controller.page) * controller.rowsPerPage - tableData?.length
        )
      : 0;
  const columns = useMemo(() => [
    {
      id: "programmeCode",
      name: "Programme Code",
      sortable: true,
    },
    {
      id: "programmeName",
      name: "Programme Name",
      sortable: true,
    },
    {
      id: "remarks",
      name: "Remarks",
      sortable: true,
    },
    {
      id: "startDate",
      name: "Start Date",
      sortable: true,
    },

    {
      id: "action",
      name: "Action",
      sortable: false,
    },
  ]);

  const callApi = async () => {
    await programlistservice("programme/programmeList", {
      pageNumber: controller.page,
      pageSize: controller.rowsPerPage,
    })
      .then((r) => {
        let tableDataApi = r.data.data.content;
        console.log(destructureData(tableDataApi));
      })  
      .catch((e) => {
        console.log("Error", e);
      });
  };

  const destructureData = (apiResponse) => {
    if (apiResponse && apiResponse?.data && apiResponse?.data?.content) {
      let tempArray = [];
      apiResponse?.data?.content.map((data, i) => {
        console.log("Data", data);
      });
      return null;
    }
  };

  useEffect(() => {
    let loadPage = true;
    callApi();
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, [controller]);

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

  const handleClick = (clickedIndex) => {
    if (open.includes(clickedIndex)) {
      const openCopy = open.filter((element) => {
        return element !== clickedIndex;
      });
      setOpen(openCopy);
    } else {
      const openCopy = [...open];
      openCopy.shift();
      openCopy.push(clickedIndex);
      setOpen(openCopy);
    }
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-end">
            <SearchField
              placeholder="Search..."
              iconPosition="end"
              iconName={faSearch}
              onChange={() => {
                console.log("...");
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
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleSorting={handleSortingChange}
              paginationRequired={true}
              caption="Prgramme Table"
              checkBoxRequired={false}
              tableTitle="Programme List"
              colouredHeader={true}
            >
              <CommonTableBody
                data={tableData}
                columns={columns}
                emptyRows={emptyRows}
                handleClick={handleClick}
                checkBoxRequired={true}
                loading={loading}
              />
            </TableComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default Programme;
