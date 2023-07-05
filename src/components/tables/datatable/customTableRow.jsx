import { styled } from "@mui/material/styles";
import { TableRow } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: "orange",
    color: "#ffffff",
    fontSize: "1.2rem",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default StyledTableRow;
