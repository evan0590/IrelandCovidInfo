import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceArea,
  ReferenceDot,
  Tooltip,
  CartesianGrid,
  Legend,
  Brush,
  ErrorBar,
  AreaChart,
  Area,
  Label,
  LabelList,
} from "recharts";

const data = [
  { name: "Page A", uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
  { name: "Page B", uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
  { name: "Page C", uv: 280, pv: 1398, amt: 2400, uvError: 40 },
  { name: "Page D", uv: 200, pv: 9800, amt: 2400, uvError: 20 },
  { name: "Page E", uv: 278, pv: null, amt: 2400, uvError: 28 },
  { name: "Page F", uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
  { name: "Page G", uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
  { name: "Page H", uv: 189, pv: 4800, amt: 2400, uvError: 28 },
  { name: "Page I", uv: 189, pv: 4800, amt: 2400, uvError: 28 },
  { name: "Page J", uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
];

export default function GraphDialog(props) {
  const handleClose = () => {
    props.setGraphDialogOpen(false);
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

  return (
    <React.Fragment>
      <Dialog
        maxWidth={"sm"}
        open={props.graphDialogOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">About</DialogTitle>
        <DialogContent>
          <LineChart
            width={400}
            height={400}
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
            <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
          </LineChart>
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
}
