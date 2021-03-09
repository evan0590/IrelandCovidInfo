import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
const axios = require("axios");

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    maxWidth: 600,
    // maxHeight: 500,
  },
});

const LiveApiData = (props) => {
  const classes = useStyles();
  // A placeholder variable used while waiting for RTPI response.
  const placeholder = {
    results: [
      {
        countyName: "",
        // fid
        fid: 0,
        // confirmedCovidCases
        confirmedCovidCases: 0,
        // populationProportionCovidCases
        populationProportionCovidCases: 0,
        // timeStampDate
        timeStampDate: 0,
        // dateString
        dateString: "",
      },
    ],
  };
  // The response from the backend we need to track in state:
  const [rawLiveCountyData, setRawLiveCountyData] = React.useState(placeholder);

  React.useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = () => {
      try {
        axios.get(`api/v1/live-county/${props.countyName}`).then((res) => {
          setRawLiveCountyData({ results: res.data });
        });
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, [props]);

  const liveCountyData = rawLiveCountyData.results;

  if (String(liveCountyData.countyName) === "") {
    return null;
  } else {
    return (
      <TableContainer
        component={Paper}
        style={{ maxHeight: "15vh", overflowY: "scroll" }}
      >
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Confirmed Cases</StyledTableCell>
              <StyledTableCell align="center">Population</StyledTableCell>
              <StyledTableCell align="center">
                Population Proportion Covid Cases
              </StyledTableCell>
              <StyledTableCell align="center">Recent Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key={liveCountyData.fid}>
              <StyledTableCell component="th" scope="row">
                {liveCountyData.confirmedCovidCases}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {props.population}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {liveCountyData.populationProportionCovidCases}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {liveCountyData.dateString}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export default LiveApiData;
