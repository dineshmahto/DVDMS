import { styled } from "@mui/material/styles";
import { TableRow } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: "orange",
    fontSize: "0.8rem !important",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default StyledTableRow;
