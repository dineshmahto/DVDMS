import React from "react";

const IssueListMUI = () => {
  const [passengersList, setPassengersList] = useState([]);
  const [passengersCount, setPassengersCount] = useState(0);
  const [open, setOpen] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  useEffect(() => {
    const getData = async () => {
      try {
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
                head_quaters:
                  "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
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
                head_quaters:
                  "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
                website: "www.evaair.com",
                established: "1989",
              },
            ],
            __v: 0,
          },
        ];

        setPassengersList(temp);
        setPassengersCount(10);
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
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Trips</TableCell>
            <TableCell>Airlines</TableCell>
            <TableCell>Established</TableCell>
            <TableCell>Head Quater</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengersList.map((passenger, index) => (
            <TableRow key={passenger._id}>
              <TableCell width="20%">{passenger.name}</TableCell>
              <TableCell width="20%">{passenger.trips}</TableCell>
              <TableCell width="30%">
                {passenger.airline.length > 1 && (
                  <>
                    <div className="d-flex justify-content-end">
                      <FontAwesomeIcon
                        icon={
                          open.includes(index) ? faChevronUp : faChevronDown
                        }
                        onClick={() => handleClick(index)}
                      />
                    </div>
                  </>
                )}
                {passenger.airline.length > 1 && (
                  <Collapse in={open.includes(index)}>
                    {passenger.airline &&
                      passenger.airline.map((elem, index) => {
                        return <div className="pt-2 pb-2">{elem?.slogan}</div>;
                      })}
                  </Collapse>
                )}
                {passenger.airline.length === 1 &&
                  passenger.airline.map((elem, index) => {
                    return <div className="">{elem?.slogan}</div>;
                  })}
              </TableCell>
              <TableCell width="10%">{passenger?.established}</TableCell>
              <TableCell width="20%">{passenger?.head_quaters}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        onPageChange={handlePageChange}
        page={controller.page}
        count={passengersCount}
        rowsPerPage={controller.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default IssueListMUI;
