import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function CustomDialog(props) {
  const handleClose = () => {
    props.setMenuDialogOpen(false);
  };

  // This application allows users to view information related to the spread of Covid-19 in Ireland. All data has been gathered from covid-19.geohive.ie.
  // This project is divided into a backend and frontend. The backend has been developed using the Java Spring Boot web framework to host a simple API.
  // The frontend has been developed using React and queries data from the API. A PostgreSQL database serving the API is implemented.

  const string =
    "This application allows users to view information related to the spread " +
    "of Covid-19 in Ireland. All data has been gathered from covid-19.geohive.ie." +
    " This project is divided into a backend and frontend. " +
    "The backend has been developed using the Java Spring Boot web framework to host a simple API. " +
    "The frontend has been developed using React and queries data from the API ." +
    "A PostgreSQL database serving the API is implemented.";

  if (props.menuDialogFlag === true) {
    return (
      <React.Fragment>
        <Dialog
          maxWidth={"sm"}
          open={props.menuDialogOpen}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">About</DialogTitle>
          <DialogContent>
            <DialogContentText>{string}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        <Dialog
          maxWidth={"sm"}
          open={props.menuDialogOpen}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Key</DialogTitle>
          <DialogContent>
            <DialogContentText>TODO</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}
