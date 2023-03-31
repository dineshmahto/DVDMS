import { useState, useEffect } from "react";
import { TableBody, TableRow, TableCell, Collapse } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableComponent from "../../components/tables/datatable/tableComponent";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
import SearchField from "../../components/search/search";
import { useSortableTable } from "../../components/tables/datatable/useSortableTable";
const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial",
  },
  tableRow: {
    "&.MuiTableRow-root:hover": {
      backgroundColor: "orange",
      "& > .MuiTableCell-root": {
        color: "white",
      },
    },
  },
  tableCell: {
    padding: "5px",
  },
});
const temp = [
  {
    _id: "63fc6a3542d2778a7efe1fc6",
    name: "Sachin Renjith",
    trips: 203,
    airline: [
      {
        id: 3,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
    ],
    __v: 0,
  },
  {
    _id: "63fc6a3542d2773b97fe1fcb",
    name: "Yash Khare",
    trips: 264,
    airline: [
      {
        id: 4,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
    ],
    __v: 0,
  },
  {
    _id: "63fc6a3542d2771d23fe1fcf",
    name: "Simon Khare",
    trips: 203,
    airline: [
      {
        id: 4,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
    ],
    __v: 0,
  },
  {
    _id: "63fc6a3242d277f6cafe1e0a",
    name: "Simon Khare",
    trips: 203,
    airline: [
      {
        id: 4,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
    ],
    __v: 0,
  },
  {
    _id: "63fc6a3542d277ef9dfe1fd2",
    name: "Simon Khare",
    trips: 203,
    airline: [
      {
        id: 4,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
      {
        id: 5,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
      {
        id: 6,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
      {
        id: 7,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
      {
        id: 8,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
    ],
    __v: 0,
  },
  {
    _id: "63fc6a3542d2777050fe1feb",
    name: "Yash Khare",
    trips: 264,
    airline: [
      {
        id: 4,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
    ],
    __v: 0,
  },
  {
    _id: "63fc6a3542d27725f0fe1fed",
    name: "Akshay Kumar",
    trips: 235,
    airline: [
      {
        id: 5,
        name: "Eva Air",
        country: "Taiwan",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png",
        slogan: "Sharing the World, Flying Together",
        head_quaters: "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
        website: "www.evaair.com",
        established: "1989",
      },
    ],
    __v: 0,
  },
  {
    _id: "63fc6a3542d2776af1fe1ff2",
    name: "Yash Khare",
    trips: 264,
    airline: [
      {
        id: 4,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
      {
        id: 9,
        name: "Emirates",
        country: "Dubai",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985",
      },
    ],
    __v: 0,
  },
  {
    _id: "63fc6a3542d27758f7fe2002",
    name: "Naman Khare",
    trips: 90,
    airline: [
      {
        id: 3,
        name: "Cathay Pacific",
        country: "Hong Kong",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Cathay_Pacific_logo.svg/300px-Cathay_Pacific_logo.svg.png",
        slogan: "Move Beyond",
        head_quaters:
          "Cathay City, Hong Kong International Airport, Chek Lap Kok, Hong Kong",
        website: "www.cathaypacific.com",
        established: "1946",
      },
    ],
    __v: 0,
  },
  {
    _id: "63fc6a3542d277ac63fe1ffd",
    name: "Akshay Kumar",
    trips: 235,
    airline: [
      {
        id: 5,
        name: "Eva Air",
        country: "Taiwan",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png",
        slogan: "Sharing the World, Flying Together",
        head_quaters: "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
        website: "www.evaair.com",
        established: "1989",
      },
    ],
    __v: 0,
  },
];
const IntentList = () => {
  const [sortedData, handleSorting] = useSortableTable(temp);
  const [tableData, setTableData] = useState(temp);
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const classes = useStyles();

  const columns = [
    { name: "Name", id: "name", sortable: false },
    { name: "Trips", id: "trips", sortable: true },
    { name: "Slogan", id: "slogan", sortable: true },
    { name: "Established", id: "established", sortable: true },
    { name: "Head Quater", id: "head_quaters", sortable: true },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        setTotalRows(10);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
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
    console.log("Clikedindex", clickedIndex);
    if (open.includes(clickedIndex)) {
      const openCopy = open.filter((element) => {
        return element !== clickedIndex;
      });
      console.log("Open", openCopy);
      setOpen(openCopy);
    } else {
      console.log("Else");
      const openCopy = [...open];
      console.log("OpenCopy", openCopy);
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
    setTableData(sortedData);
  };

  // const handleSorting = (sortField, sortOrder) => {
  //   if (sortField) {
  //     console.log("sortField", sortField);
  //     const sorted = [...tableData].sort((a, b) => {
  //       if (a[sortField] === null) return 1;
  //       if (b[sortField] === null) return -1;
  //       if (a[sortField] === null && b[sortField] === null) return 0;
  //       console.log("Dinesh", a[sortField]);
  //       return (
  //         a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
  //           numeric: true,
  //         }) * (sortOrder === "asc" ? 1 : -1)
  //       );
  //     });
  //     setTableData(sorted);
  //   }
  // };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-end">
            <SearchField
              placeholder="Search....."
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
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleSorting={handleSortingChange}
              paginationRequired={true}
              caption="intent Table"
              checkBoxRequired={false}
              tableTitle="Open Intent List"
              overFlow={true}
              colouredHeader={true}
            >
              <TableBody>
                {tableData &&
                  tableData.map((passenger, index) => (
                    <TableRow
                      className={classes.tableRow}
                      key={passenger._id}
                      onClick={() => console.log("Row", passenger)}
                    >
                      <TableCell
                        padding="none"
                        style={{ padding: "10px", fontSize: "0.7rem" }}
                      >
                        {passenger.name}
                      </TableCell>
                      <TableCell
                        padding="none"
                        style={{ padding: "10px", fontSize: "0.7rem" }}
                        className={classes.tableCell}
                      >
                        {passenger.trips}
                      </TableCell>
                      <TableCell
                        padding="none"
                        style={{ padding: "10px", fontSize: "0.7rem" }}
                        className={classes.tableCell}
                      >
                        {passenger.airline.length > 1 && (
                          <>
                            <div className="d-flex justify-content-end">
                              <FontAwesomeIcon
                                icon={
                                  open.includes(index)
                                    ? faChevronUp
                                    : faChevronDown
                                }
                                style={{ cursor: "pointer" }}
                                onClick={() => handleClick(index)}
                              />
                            </div>
                          </>
                        )}
                        {passenger.airline.length > 1 && (
                          <Collapse in={open.includes(index)}>
                            {passenger.airline &&
                              passenger.airline.map((elem, index) => {
                                return (
                                  <div className="pt-2 pb-2">
                                    {elem?.slogan}
                                  </div>
                                );
                              })}
                          </Collapse>
                        )}
                        {passenger.airline.length === 1 &&
                          passenger.airline.map((elem, index) => {
                            return <div className="">{elem?.slogan}</div>;
                          })}
                      </TableCell>
                      <TableCell
                        padding="none"
                        style={{ padding: "10px", fontSize: "0.7rem" }}
                        className={classes.tableCell}
                      >
                        {passenger?.established}
                      </TableCell>
                      <TableCell
                        padding="none"
                        style={{ fontSize: "0.7rem" }}
                        className={classes.tableCell}
                      >
                        {passenger?.head_quaters}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </TableComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntentList;
