import React, { useState, useMemo, useEffect } from "react";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { Spinner } from "react-bootstrap";
import {
  faList,
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import CreateRoleModalForm from "./createrolemodalform";
import EditRoleModal from "./editrolemodalform";
import RoleActivityListModal from "./roleactivitylistmodal";
import { useDispatch } from "react-redux";
import { deleteRole, getRoleList } from "../../../store/admin/action";
import { useSelector } from "react-redux";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
const useStyles = makeStyles({
  tableCell: {
    padding: "8px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});

const RoleDesk = () => {
  const roleListResponse = useSelector((state) => state.admin.roleListResponse);
  console.log("roleListResponse", roleListResponse);
  const dispatch = useDispatch();
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([
    {
      id: 1150,
      name: "System Admin",
      remark: "All rights excluding application services",
      activityList: [],
    },
    {
      id: 1157,
      name: "Store Incharge (DMS/DWH)",
      remark: "Store Incharge for DWH",
      activityList: [
        {
          id: 102,
          activityName: "Upload Stock (from a file)",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 131,
          activityName: "Transfer Request for Shortage",
          code: {
            id: 13,
            typeName: "Transfer",
            code: "tf",
          },
        },
        {
          id: 105,
          activityName: "Stock Drug Verification",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 59,
          activityName: "View Indent",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 104,
          activityName: "Stock Entry of Miscellaneous",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 62,
          activityName: "Receive of Drugs (Indent/Transfer)",
          code: {
            id: 11,
            typeName: "Receive",
            code: "rv",
          },
        },
        {
          id: 81,
          activityName: "List User",
          code: {
            id: 8,
            typeName: "User Management",
            code: "um",
          },
        },
        {
          id: 50,
          activityName: "Issue and Return of Drugs",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 63,
          activityName: "Receive Challan",
          code: {
            id: 11,
            typeName: "Receive",
            code: "rv",
          },
        },
        {
          id: 132,
          activityName: "Transfer Request for Excess",
          code: {
            id: 13,
            typeName: "Transfer",
            code: "tf",
          },
        },
        {
          id: 106,
          activityName: "Drug Condemnation Register",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 14,
          activityName: "Create Local Purchase",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
        {
          id: 58,
          activityName: "Generate and Modify Indent",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 7,
          activityName: "Compile Annual Demand (DWH/Block)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 140,
          activityName: "Approval Desk (Head of Institute)",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
        {
          id: 134,
          activityName: "Transfer of Drugs (Indent, Excess, Shortage)",
          code: {
            id: 13,
            typeName: "Transfer",
            code: "tf",
          },
        },
        {
          id: 2,
          activityName: "Annual Demand (Sub Stores)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 142,
          activityName: "Transfer Approval by HQ",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
        {
          id: 141,
          activityName: "Transfer/Indent Approval By Institute",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
      ],
    },
    {
      id: 1155,
      name: "Store Incharge (CMS/SWH)",
      remark: "Store Incharge HQ",
      activityList: [
        {
          id: 102,
          activityName: "Upload Stock (from a file)",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 64,
          activityName: "Verify Challan",
          code: {
            id: 11,
            typeName: "Receive",
            code: "rv",
          },
        },
        {
          id: 67,
          activityName: "Accept Challan",
          code: {
            id: 11,
            typeName: "Receive",
            code: "rv",
          },
        },
        {
          id: 105,
          activityName: "Stock Drug Verification",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 59,
          activityName: "View Indent",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 104,
          activityName: "Stock Entry of Miscellaneous",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 4,
          activityName: "Compile and freeze Annual Demand(HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 62,
          activityName: "Receive of Drugs (Indent/Transfer)",
          code: {
            id: 11,
            typeName: "Receive",
            code: "rv",
          },
        },
        {
          id: 81,
          activityName: "List User",
          code: {
            id: 8,
            typeName: "User Management",
            code: "um",
          },
        },
        {
          id: 6,
          activityName: "Compile and Freeze Supplementary Demand (HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 50,
          activityName: "Issue and Return of Drugs",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 103,
          activityName: "Update Stock of PO",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 63,
          activityName: "Receive Challan",
          code: {
            id: 11,
            typeName: "Receive",
            code: "rv",
          },
        },
        {
          id: 106,
          activityName: "Drug Condemnation Register",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 12,
          activityName: "List PO",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
        {
          id: 71,
          activityName: "Rate Contract List",
          code: {
            id: 7,
            typeName: "Drug",
            code: "dr",
          },
        },
        {
          id: 7,
          activityName: "Compile Annual Demand (DWH/Block)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 140,
          activityName: "Approval Desk (Head of Institute)",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
        {
          id: 1,
          activityName: "Demand Notification (HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 2,
          activityName: "Annual Demand (Sub Stores)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 142,
          activityName: "Transfer Approval by HQ",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
      ],
    },
    {
      id: 1153,
      name: "QC Team",
      remark: "Quality Control Team (HQ",
      activityList: [
        {
          id: 71,
          activityName: "Rate Contract List",
          code: {
            id: 7,
            typeName: "Drug",
            code: "dr",
          },
        },
        {
          id: 172,
          activityName: "Drug Configuration Desk (HQ)",
          code: {
            id: 17,
            typeName: "Configuration Management",
            code: "cf",
          },
        },
        {
          id: 64,
          activityName: "Verify Challan",
          code: {
            id: 11,
            typeName: "Receive",
            code: "rv",
          },
        },
        {
          id: 67,
          activityName: "Accept Challan",
          code: {
            id: 11,
            typeName: "Receive",
            code: "rv",
          },
        },
        {
          id: 105,
          activityName: "Stock Drug Verification",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 59,
          activityName: "View Indent",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 81,
          activityName: "List User",
          code: {
            id: 8,
            typeName: "User Management",
            code: "um",
          },
        },
        {
          id: 1,
          activityName: "Demand Notification (HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 73,
          activityName: "Add, Edit, Delete Drug (HQ)",
          code: {
            id: 7,
            typeName: "Drug",
            code: "dr",
          },
        },
        {
          id: 12,
          activityName: "List PO",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
      ],
    },
    {
      id: 1152,
      name: "Purchase Officer",
      remark: "SWH Purchase Officer",
      activityList: [
        {
          id: 67,
          activityName: "Accept Challan",
          code: {
            id: 11,
            typeName: "Receive",
            code: "rv",
          },
        },
        {
          id: 59,
          activityName: "View Indent",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 201,
          activityName: "Supplier Payment",
          code: {
            id: 20,
            typeName: "Financial Management",
            code: "fm",
          },
        },
        {
          id: 4,
          activityName: "Compile and freeze Annual Demand(HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 72,
          activityName: "Add Renew Delete Rate Contract",
          code: {
            id: 7,
            typeName: "Drug",
            code: "dr",
          },
        },
        {
          id: 122,
          activityName: "Program Funding Desk (HQ)",
          code: {
            id: 12,
            typeName: "Program Management",
            code: "pm",
          },
        },
        {
          id: 123,
          activityName: "Budget Allocation (HQ)",
          code: {
            id: 12,
            typeName: "Program Management",
            code: "pm",
          },
        },
        {
          id: 81,
          activityName: "List User",
          code: {
            id: 8,
            typeName: "User Management",
            code: "um",
          },
        },
        {
          id: 6,
          activityName: "Compile and Freeze Supplementary Demand (HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 151,
          activityName: "Program Funding Mapping (HQ)",
          code: {
            id: 17,
            typeName: "Configuration Management",
            code: "cf",
          },
        },
        {
          id: 12,
          activityName: "List PO",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
        {
          id: 171,
          activityName: "PO Configuration Desk",
          code: {
            id: 17,
            typeName: "Configuration Management",
            code: "cf",
          },
        },
        {
          id: 14,
          activityName: "Create Local Purchase",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
        {
          id: 74,
          activityName: "Add Edit Delete Supplier",
          code: {
            id: 7,
            typeName: "Drug",
            code: "dr",
          },
        },
        {
          id: 71,
          activityName: "Rate Contract List",
          code: {
            id: 7,
            typeName: "Drug",
            code: "dr",
          },
        },
        {
          id: 121,
          activityName: "Add Edit Delete Program (HQ)",
          code: {
            id: 12,
            typeName: "Program Management",
            code: "pm",
          },
        },
        {
          id: 150,
          activityName: "List Programme Funding Source",
          code: {
            id: 17,
            typeName: "Configuration Management",
            code: "cf",
          },
        },
        {
          id: 11,
          activityName: "Create/Cancel PO",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
        {
          id: 154,
          activityName: "Budget Interface (HQ)",
          code: {
            id: 17,
            typeName: "Configuration Management",
            code: "cf",
          },
        },
        {
          id: 1,
          activityName: "Demand Notification (HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 2,
          activityName: "Annual Demand (Sub Stores)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 142,
          activityName: "Transfer Approval by HQ",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
      ],
    },
    {
      id: 1159,
      name: "Medical Officer (MO)",
      remark: "Medical Officer of CHC/PHC",
      activityList: [
        {
          id: 131,
          activityName: "Transfer Request for Shortage",
          code: {
            id: 13,
            typeName: "Transfer",
            code: "tf",
          },
        },
        {
          id: 105,
          activityName: "Stock Drug Verification",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 59,
          activityName: "View Indent",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 104,
          activityName: "Stock Entry of Miscellaneous",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 4,
          activityName: "Compile and freeze Annual Demand(HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 62,
          activityName: "Receive of Drugs (Indent/Transfer)",
          code: {
            id: 11,
            typeName: "Receive",
            code: "rv",
          },
        },
        {
          id: 6,
          activityName: "Compile and Freeze Supplementary Demand (HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 50,
          activityName: "Issue and Return of Drugs",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 132,
          activityName: "Transfer Request for Excess",
          code: {
            id: 13,
            typeName: "Transfer",
            code: "tf",
          },
        },
        {
          id: 58,
          activityName: "Generate and Modify Indent",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 7,
          activityName: "Compile Annual Demand (DWH/Block)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 140,
          activityName: "Approval Desk (Head of Institute)",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
        {
          id: 134,
          activityName: "Transfer of Drugs (Indent, Excess, Shortage)",
          code: {
            id: 13,
            typeName: "Transfer",
            code: "tf",
          },
        },
        {
          id: 2,
          activityName: "Annual Demand (Sub Stores)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 142,
          activityName: "Transfer Approval by HQ",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
        {
          id: 141,
          activityName: "Transfer/Indent Approval By Institute",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
      ],
    },
    {
      id: 1156,
      name: "DWH Admin",
      remark: "DWH Admin for District Ware House",
      activityList: [
        {
          id: 74,
          activityName: "Add Edit Delete Supplier",
          code: {
            id: 7,
            typeName: "Drug",
            code: "dr",
          },
        },
        {
          id: 82,
          activityName: "Add Edit Delete User(HQ/DWH Admin)",
          code: {
            id: 8,
            typeName: "User Management",
            code: "um",
          },
        },
        {
          id: 161,
          activityName: "Add  Edit Delete Store (HQ/DWH Admin)",
          code: {
            id: 16,
            typeName: "Store Management",
            code: "sm",
          },
        },
        {
          id: 81,
          activityName: "List User",
          code: {
            id: 8,
            typeName: "User Management",
            code: "um",
          },
        },
        {
          id: 1,
          activityName: "Demand Notification (HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 85,
          activityName: "Add Edit Delete Role(HQ/DWH Admin)",
          code: {
            id: 8,
            typeName: "User Management",
            code: "um",
          },
        },
      ],
    },
    {
      id: 1158,
      name: "District Medical Officer (DMO)",
      remark: "District Medical & Health Officer",
      activityList: [
        {
          id: 105,
          activityName: "Stock Drug Verification",
          code: {
            id: 10,
            typeName: "Stock",
            code: "sk",
          },
        },
        {
          id: 59,
          activityName: "View Indent",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 4,
          activityName: "Compile and freeze Annual Demand(HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 81,
          activityName: "List User",
          code: {
            id: 8,
            typeName: "User Management",
            code: "um",
          },
        },
        {
          id: 171,
          activityName: "PO Configuration Desk",
          code: {
            id: 17,
            typeName: "Configuration Management",
            code: "cf",
          },
        },
        {
          id: 14,
          activityName: "Create Local Purchase",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
        {
          id: 71,
          activityName: "Rate Contract List",
          code: {
            id: 7,
            typeName: "Drug",
            code: "dr",
          },
        },
        {
          id: 13,
          activityName: "PO Appoval /Cancel(Head of Ins.)",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
        {
          id: 7,
          activityName: "Compile Annual Demand (DWH/Block)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 140,
          activityName: "Approval Desk (Head of Institute)",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
        {
          id: 2,
          activityName: "Annual Demand (Sub Stores)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 141,
          activityName: "Transfer/Indent Approval By Institute",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
      ],
    },
    {
      id: 1151,
      name: "Director",
      remark: "DHS and NHM Director",
      activityList: [
        {
          id: 59,
          activityName: "View Indent",
          code: {
            id: 6,
            typeName: "Issue ",
            code: "is",
          },
        },
        {
          id: 4,
          activityName: "Compile and freeze Annual Demand(HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 122,
          activityName: "Program Funding Desk (HQ)",
          code: {
            id: 12,
            typeName: "Program Management",
            code: "pm",
          },
        },
        {
          id: 123,
          activityName: "Budget Allocation (HQ)",
          code: {
            id: 12,
            typeName: "Program Management",
            code: "pm",
          },
        },
        {
          id: 81,
          activityName: "List User",
          code: {
            id: 8,
            typeName: "User Management",
            code: "um",
          },
        },
        {
          id: 6,
          activityName: "Compile and Freeze Supplementary Demand (HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 12,
          activityName: "List PO",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
        {
          id: 71,
          activityName: "Rate Contract List",
          code: {
            id: 7,
            typeName: "Drug",
            code: "dr",
          },
        },
        {
          id: 13,
          activityName: "PO Appoval /Cancel(Head of Ins.)",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
        {
          id: 121,
          activityName: "Add Edit Delete Program (HQ)",
          code: {
            id: 12,
            typeName: "Program Management",
            code: "pm",
          },
        },
        {
          id: 150,
          activityName: "List Programme Funding Source",
          code: {
            id: 17,
            typeName: "Configuration Management",
            code: "cf",
          },
        },
        {
          id: 140,
          activityName: "Approval Desk (Head of Institute)",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
        {
          id: 11,
          activityName: "Create/Cancel PO",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
        {
          id: 154,
          activityName: "Budget Interface (HQ)",
          code: {
            id: 17,
            typeName: "Configuration Management",
            code: "cf",
          },
        },
        {
          id: 1,
          activityName: "Demand Notification (HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 141,
          activityName: "Transfer/Indent Approval By Institute",
          code: {
            id: 14,
            typeName: "Approval",
            code: "ap",
          },
        },
      ],
    },
    {
      id: 1154,
      name: "Accountant",
      remark: "Accountant for HQ",
      activityList: [
        {
          id: 71,
          activityName: "Rate Contract List",
          code: {
            id: 7,
            typeName: "Drug",
            code: "dr",
          },
        },
        {
          id: 201,
          activityName: "Supplier Payment",
          code: {
            id: 20,
            typeName: "Financial Management",
            code: "fm",
          },
        },
        {
          id: 122,
          activityName: "Program Funding Desk (HQ)",
          code: {
            id: 12,
            typeName: "Program Management",
            code: "pm",
          },
        },
        {
          id: 123,
          activityName: "Budget Allocation (HQ)",
          code: {
            id: 12,
            typeName: "Program Management",
            code: "pm",
          },
        },
        {
          id: 81,
          activityName: "List User",
          code: {
            id: 8,
            typeName: "User Management",
            code: "um",
          },
        },
        {
          id: 154,
          activityName: "Budget Interface (HQ)",
          code: {
            id: 17,
            typeName: "Configuration Management",
            code: "cf",
          },
        },
        {
          id: 1,
          activityName: "Demand Notification (HQ)",
          code: {
            id: 1,
            typeName: "Demand",
            code: "dm",
          },
        },
        {
          id: 12,
          activityName: "List PO",
          code: {
            id: 2,
            typeName: "Order Management",
            code: "om",
          },
        },
      ],
    },
  ]);

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [activityList, setActivityList] = useState([]);
  const [dropDownList, setDropDownList] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const [data, setData] = useState([]);
  const columns = useMemo(() => [
    {
      id: "id",
      name: "ROLE ID",
      sortable: true,
    },

    {
      id: "name",
      name: "ROLE NAME",
      sortable: true,
    },
    {
      id: "remark",
      name: "ROLE DESCRIPTION",
      sortable: true,
    },
    {
      id: "activities",
      name: "ACTIVITIES",
      sortable: false,
    },
  ]);

  // edit role modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [totalRoleList, setTotalRoleList] = useState([]);
  const [currentRoleList, setCurrentRoleList] = useState([]);
  const [availableRoleList, setAvailableRoleList] = useState([]);

  const data1 = [
    {
      id: 1,
      name: "Demand Notification (HQ)",
    },
    {
      id: 2,
      name: "Annual Demand (Sub Stores)",
    },
    {
      id: 13,
      name: "PO Appoval /Cancel(Head of Ins.)",
    },
    {
      id: 62,
      name: "Receive of Drugs (Indent/Transfer)",
    },
    {
      id: 63,
      name: "Receive Challan",
    },
    {
      id: 64,
      name: "Verify Challan",
    },
    {
      id: 67,
      name: "Accept Challan",
    },
    {
      id: 72,
      name: "Add Renew Delete Rate Contract",
    },
    {
      id: 74,
      name: "Add Edit Delete Supplier",
    },
    {
      id: 11,
      name: "Create/Cancel PO",
    },
    {
      id: 82,
      name: "Add Edit Delete User(HQ/DWH Admin)",
    },
    {
      id: 101,
      name: "Application Configuration (HQ)",
    },
    {
      id: 105,
      name: "Stock Drug Verification",
    },
    {
      id: 106,
      name: "Drug Condemnation Register",
    },
    {
      id: 131,
      name: "Transfer Request for Shortage",
    },
    {
      id: 132,
      name: "Transfer Request for Excess",
    },
    {
      id: 134,
      name: "Transfer of Drugs (Indent, Excess, Shortage)",
    },
    {
      id: 142,
      name: "Transfer Approval by HQ",
    },
    {
      id: 161,
      name: "Add  Edit Delete Store (HQ/DWH Admin)",
    },
    {
      id: 141,
      name: "Transfer/Indent Approval By Institute",
    },
    {
      id: 4,
      name: "Compile and freeze Annual Demand(HQ)",
    },
    {
      id: 6,
      name: "Compile and Freeze Supplementary Demand (HQ)",
    },
    {
      id: 12,
      name: "List PO",
    },
    {
      id: 50,
      name: "Issue and Return of Drugs",
    },
    {
      id: 58,
      name: "Generate and Modify Indent",
    },
    {
      id: 59,
      name: "View Indent",
    },
    {
      id: 71,
      name: "Rate Contract List",
    },
    {
      id: 73,
      name: "Add, Edit, Delete Drug (HQ)",
    },
    {
      id: 81,
      name: "List User",
    },
    {
      id: 85,
      name: "Add Edit Delete Role(HQ/DWH Admin)",
    },
    {
      id: 102,
      name: "Upload Stock (from a file)",
    },
    {
      id: 103,
      name: "Update Stock of PO",
    },
    {
      id: 104,
      name: "Stock Entry of Miscellaneous",
    },
    {
      id: 121,
      name: "Add Edit Delete Program (HQ)",
    },
    {
      id: 122,
      name: "Program Funding Desk (HQ)",
    },
    {
      id: 123,
      name: "Budget Allocation (HQ)",
    },
    {
      id: 140,
      name: "Approval Desk (Head of Institute)",
    },
    {
      id: 150,
      name: "List Programme Funding Source",
    },
    {
      id: 201,
      name: "Supplier Payment",
    },
    {
      id: 173,
      name: "Alert/SMS Configuration Desk (HQ)",
    },
    {
      id: 172,
      name: "Drug Configuration Desk (HQ)",
    },
    {
      id: 171,
      name: "PO Configuration Desk",
    },
    {
      id: 154,
      name: "Budget Interface (HQ)",
    },
    {
      id: 153,
      name: "Store Programme Drug Mapping (HQ)",
    },
    {
      id: 152,
      name: "Store Type Wise Drug Mapping (HQ)",
    },
    {
      id: 151,
      name: "Program Funding Mapping (HQ)",
    },
    {
      id: 3,
      name: "Supplementary Demand (Sub Stores)",
    },
    {
      id: 7,
      name: "Compile Annual Demand (DWH/Block)",
    },
    {
      id: 14,
      name: "Create Local Purchase",
    },
    {
      id: 68,
      name: "Update Challan",
    },
    {
      id: 999,
      name: "Global",
    },
    {
      id: 95,
      name: "Lock Unlcok user",
    },
  ];
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
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getRoleList({
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
    if (roleListResponse && roleListResponse?.status === 200) {
      setTotalRoleList(roleListResponse?.data?.activityList);
      setActivityList(roleListResponse?.data?.activityTypeList);
      setData(roleListResponse?.data?.activityList);
      setTotalPages(roleListResponse?.data?.totalPages);
      setTotalRows(roleListResponse?.data?.totalElements);
      setTableData(roleListResponse?.data?.content);
      setLoading(false);
    } else if (roleListResponse && roleListResponse?.status == 400) {
      setLoading(false);
      toastMessage("Login Error", "Please enter valid ID", "error");
    } else if (roleListResponse && roleListResponse?.code === "ERR_NETWORK") {
      setLoading(false);
      toastMessage("Role List", "Internet Connection Problem");
    }
  }, [roleListResponse]);

  const handleCloseCreateRoleModal = () => {
    setShowModal(false);
  };
  const handleCloseEditRoleModal = () => {
    setShowEditModal(false);
  };
  const handleActivityShowModal = () => {
    setShowActivityModal(false);
  };

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">ROLE LIST</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Role List" />
      </div>
      <div className="row ">
        <div className="d-flex flex-row justify-content-between">
          <Basicbutton
            buttonText="Add New Role"
            outlineType={true}
            className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
            onClick={() => {
              dispatch(deleteRole(1));
              // setDropDownList(activityList);
              setShowModal(true);
            }}
          />
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
      <Paper elevation={2} className="mb-2">
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
                      <StyledTableRow key={data.id}>
                        <TableCell
                          padding="none"
                          className={[classes.tableCell, "text-center"]}
                        >
                          {data.id}
                        </TableCell>
                        <TableCell
                          padding="none"
                          className={[classes.tableCell, "text-center"]}
                        >
                          {data.name}
                        </TableCell>
                        <TableCell
                          padding="none"
                          className={[classes.tableCell, "text-center"]}
                        >
                          {data?.remark}
                        </TableCell>

                        <TableCell
                          padding="none"
                          className={[classes.tableCell, "text-center"]}
                        >
                          {data?.activityList &&
                          data?.activityList.length > 0 ? (
                            <>
                              <span
                                className="text-decoration-underline me-2"
                                onClick={() => {
                                  console.log("clicked");
                                  setActivityList(data?.activityList);
                                  setShowActivityModal(true);
                                }}
                                style={{
                                  fontSize: "0.8rem",
                                  cursor: "pointer",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faList}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="SHOW ACTIVITIES"
                                />
                              </span>
                              <span className="m-1"> |</span>
                            </>
                          ) : (
                            ""
                          )}

                          <span
                            className="text-decoration-underline ms-1"
                            style={{ fontSize: "0.8rem", cursor: "pointer" }}
                            onClick={() => {
                              let list = [];
                              data?.activityList.forEach((element) => {
                                let ele = {};
                                ele["id"] = element?.id;
                                ele["name"] = element?.activityName;
                                list.push(ele);
                              });
                              console.log("list", list);
                              setCurrentRoleList(list);

                              const availableRoleLists = [
                                ...totalRoleList,
                              ]?.filter((elem) => {
                                return !list?.find((ele) => {
                                  return ele.id === elem.id;
                                });
                              });
                              setAvailableRoleList(availableRoleLists);

                              setShowEditModal(true);
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
                            style={{ fontSize: "0.8rem", cursor: "pointer" }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="ms-2"
                              color="red"
                            />
                          </span>
                        </TableCell>
                      </StyledTableRow>
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
      <CreateRoleModalForm
        openCreateRoleModal={showModal}
        handleCloseCreateRoleModal={handleCloseCreateRoleModal}
        data={data1}
      />
      <EditRoleModal
        openEditRoleModal={showEditModal}
        handleCloseEditRoleModal={handleCloseEditRoleModal}
        data={data1}
      />
      <RoleActivityListModal
        showActivityModal={showActivityModal}
        handleActivityShowModal={handleActivityShowModal}
        activityList={activityList}
      />
    </>
  );
};

export default RoleDesk;
