import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

const DeletConformation = ({ open, setOpen, content, handleClose, handleYes }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{content}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align={"center"}>
            <img src="https://t3.ftcdn.net/jpg/01/93/90/82/360_F_193908219_ak4aB1PzlhizUVGLOVowzHICc3tl6WeX.jpg" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

DeletConformation.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  content: PropTypes.func,
  handleClose: PropTypes.func,
  handleYes: PropTypes.func,
};

export default DeletConformation;
