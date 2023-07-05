import { styled } from "@mui/material/styles";
import { TableCell } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&": {
    padding: "11px !important",
    fontSize: "0.7rem !important",
    textAlign: "center",
  },
}));

export default StyledTableCell;
