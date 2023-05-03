import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
interface dialogProps {
  open: boolean | false;
  dialogTitle?: string;
  description?: string;
  children?: React.ReactNode;
  handleClose: () => void;
}
const AlertDialog: React.FC<dialogProps> = ({
  open,
  handleClose,
  dialogTitle,
  description,
  children,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>{children}</DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
