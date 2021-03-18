import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  Cell,
  Pie,
  PieChart,
  LineChart,
  Label,
  LabelList,
  Line,
  Brush,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
const axios = require("axios");

const data02 = [
  { name: "Page A", uv: 300, pv: 2600, amt: 3400 },
  { name: "Page B", uv: 400, pv: 4367, amt: 6400 },
  { name: "Page C", uv: 300, pv: 1398, amt: 2400 },
  { name: "Page D", uv: 200, pv: 9800, amt: 2400 },
  { name: "Page E", uv: 278, pv: 3908, amt: 2400 },
  { name: "Page F", uv: 189, pv: 4800, amt: 2400 },
  { name: "Page G", uv: 189, pv: 4800, amt: 2400 },
];

const colors = scaleOrdinal(schemeCategory10).range();

const GraphApiData = (props) => {
  const handlePvBarClick = (data, index, e) => {
    console.log(`Pv Bar (${index}) Click: `, data);
  };

  const handleBarAnimationStart = () => {
    console.log("Animation start");
  };

  const handleBarAnimationEnd = () => {
    console.log("Animation end");
  };

  const handleLegendMouseEnter = () => {
    // setState({
    //   opacity: 0.5,
    // });
  };

  const handleLegendMouseLeave = () => {
    // setState({
    //   opacity: 1,
    // });
  };
  // A placeholder variable used while waiting for api response.
  const barDataPlaceholder = {
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

  const pieDataPlaceholder = [
    { name: "", value: 0 },
    { name: "", value: 0 },
  ];
  // The responses from the backend we need to track in state:
  const [rawLiveCountyData, setRawLiveCountyData] = useState(
    barDataPlaceholder
  );
  const [pieData, setPieData] = useState(pieDataPlaceholder);

  React.useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = () => {
      try {
        axios
          .get(`api/v1/live-county/recent/${props.countyName}`)
          .then((res) => {
            console.log();
            setRawLiveCountyData({ results: res.data });
            setPieData([
              { name: "Population", value: props.population },
              {
                name: "Confirmed Cases",
                value: res.data[0].confirmedCovidCases,
              },
            ]);
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
    if (props.barChartFlag === true) {
      return (
        // <BarChart
        //   width={800}
        //   height={400}
        //   data={liveCountyData}
        //   onClick={handlePvBarClick}
        // >
        //   <XAxis dataKey="dateString" />
        //   <YAxis yAxisId="a" />
        //   <Legend />
        //   <Tooltip />
        //   <CartesianGrid vertical={false} />
        //   <Bar
        //     yAxisId="a"
        //     dataKey="confirmedCovidCases"
        //     onAnimationStart={handleBarAnimationStart}
        //     onAnimationEnd={handleBarAnimationEnd}
        //   >
        //     {liveCountyData.map((entry, index) => (
        //       <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        //     ))}
        //   </Bar>
        // </BarChart>
        <LineChart width={500} height={300} data={liveCountyData}>
          <XAxis dataKey="dateString" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line
            type="monotone"
            dataKey="confirmedCovidCases"
            stroke="#8884d8"
          />
          {/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
        </LineChart>
      );
    }
    if (props.pieChartFlag === true) {
      return (
        <PieChart width={800} height={400}>
          <Legend />
          <Tooltip />
          <Pie data={pieData} dataKey="value" startAngle={360} endAngle={0}>
            {pieData.map((entry, index) => (
              <Cell key={`slice-${index}`} fill={colors[index % 10]} />
            ))}
          </Pie>
        </PieChart>
      );
    }
  }
};

export default GraphApiData;
