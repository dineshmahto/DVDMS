import React, { useMemo, useState } from "react";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import {
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import CustomSelect from "../../../components/select/customSelect";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { makeStyles } from "@mui/styles";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TableComponent from "../../../components/tables/datatable/tableComponent";

const UserLogReport = () => {
  const [data, setData] = useState({
    lastDate: "",
    remarks: "",
    periodic: "",
    financialYear: "2023 - 2024",
    demandType: "",
    programWiseDrug: "1",
    drugNotification: "1",
  });

  const useStyles = makeStyles({
    root: {
      "& .MuiInputBase-root": {
        "& .MuiButtonBase-root": {},
        "& .MuiInputBase-input": {
          padding: 8,
        },
      },
    },
  });

  const classes = useStyles();

  const columns = useMemo(() => [
    {
      id: "user",
      name: "User",
      sortable: true,
    },

    {
      id: "facility",
      name: "Facility",
      sortable: true,
    },

    {
      id: "district",
      name: "District",
      sortable: true,
    },

    {
      id: "logtime",
      name: "Log Time",
      sortable: true,
    },
    {
      id: "ipaddress",
      name: "IP Address",
      sortable: true,
    },

    {
      id: "module",
      name: "Module",
      sortable: false,
    },
    {
      id: "message",
      name: "Message",
      sortable: false,
    },
  ]);

  return (
    <>
      <Paper className="p-2 mt-2">
        <div className="row mt-3">
          <div className="d-flex">
            {/* <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="storeName">
                    Store Name
                  </label>
                </div>
                <div className="col-7 m-0">State WareHouse</div>
              </div>
            </div> */}
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="financialYear">
                    Store
                  </label>
                </div>
                <div className="col-7">
                  <CustomSelect
                    defaultValue={{ value: "2023-2024", label: "2023-2024" }}
                    options={[
                      { value: "select", label: "Select" },
                      { value: "2023-2024", label: "2023-2024" },
                    ]}
                    onChange={(selectedOption) => {
                      console.log(selectedOption?.value);
                      setData({
                        ...data,
                        financialYear: selectedOption?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="financialYear">
                    users
                  </label>
                </div>
                <div className="col-7">
                  <CustomSelect
                    defaultValue={{ value: "2023-2024", label: "2023-2024" }}
                    options={[
                      { value: "select", label: "Select" },
                      { value: "2023-2024", label: "2023-2024" },
                    ]}
                    onChange={(selectedOption) => {
                      console.log(selectedOption?.value);
                      setData({
                        ...data,
                        financialYear: selectedOption?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="financialYear">
                    Form
                  </label>
                </div>
                <div className="col-7">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className={classes.root}
                      value={data?.lastDate}
                      onChange={(newValue) => {
                        console.log("NewValue", newValue);
                        setData({
                          ...data,
                          lastDate: newValue,
                        });
                      }}
                      disablePast={false}
                      disableFuture={true}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="financialYear">
                    To
                  </label>
                </div>
                <div className="col-7">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className={classes.root}
                      value={data?.lastDate}
                      onChange={(newValue) => {
                        console.log("NewValue", newValue);
                        setData({
                          ...data,
                          lastDate: newValue,
                        });
                      }}
                      disablePast={true}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mt-3 text-center">
          <Basicbutton
            buttonText=" Generate"
            outlineType={true}
            className="primary rounded-0 mb-2 me-1 mt-2"
            icon={<FontAwesomeIcon icon={faPaperPlane} />}
          />
          <Basicbutton
            buttonText=" Clear"
            outlineType={true}
            className="warning rounded-0 mb-2 me-1 mt-2"
            icon={<FontAwesomeIcon icon={faEraser} />}
          />
        </div>

        <HorizonatalLine text="User Logs" />

        <div className="row">
          <div className="col-12">
            <TableComponent columns={columns} page={10}>
              <TableBody>
                <TableRow key={data.id}>
                  <TableCell
                    padding="none"
                    className={[classes.tableCell, "text-center"]}
                  >
                    168
                  </TableCell>
                  <TableCell
                    padding="none"
                    className={[classes.tableCell, "text-center"]}
                  ></TableCell>
                  <TableCell
                    padding="none"
                    className={[classes.tableCell, "text-center"]}
                  ></TableCell>
                  <TableCell
                    padding="none"
                    className={[classes.tableCell, "text-center"]}
                  >
                    2022-08-19 20:30:58.845
                  </TableCell>
                  <TableCell
                    padding="none"
                    className={[classes.tableCell, "text-center"]}
                  >
                    192.168.30.1
                  </TableCell>
                  <TableCell
                    padding="none"
                    className={[classes.tableCell, "text-center"]}
                  >
                    LOGIN
                  </TableCell>
                  <TableCell
                    padding="none"
                    className={[classes.tableCell, "text-center"]}
                  >
                    USER AUTHENTICATION
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableComponent>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default UserLogReport;
