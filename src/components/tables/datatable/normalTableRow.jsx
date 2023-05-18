import { styled } from "@mui/material/styles";
import { TableRow } from "@mui/material";

const NormalTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default NormalTableRow;
