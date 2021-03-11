import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import GraphApiData from "../components/GraphApiData";

export default function GraphDialog(props) {
  const handleClose = () => {
    props.setGraphDialogOpen(false);
  };

  const [barChartFlag, setBarChartFlag] = useState(true);
  const [pieChartFlag, setPieChartFlag] = useState(false);

  console.log(props.countyName);

  return (
    <React.Fragment>
      <Dialog
        maxWidth={"lg"}
        open={props.graphDialogOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          {props.countyName}
        </DialogTitle>
        <DialogContent>
          <Button
            size="small"
            variant="contained"
            disableElevation
            onClick={() => {
              setBarChartFlag(true);
              setPieChartFlag(false);
            }}
          >
            Bar Chart
          </Button>
          <Button
            size="small"
            variant="contained"
            disableElevation
            onClick={() => {
              setBarChartFlag(false);
              setPieChartFlag(true);
            }}
          >
            Pie Chart
          </Button>
          <GraphApiData
            countyName={props.countyName}
            population={props.population}
            barChartFlag={barChartFlag}
            pieChartFlag={pieChartFlag}
          ></GraphApiData>
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
