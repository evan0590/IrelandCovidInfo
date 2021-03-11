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
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
const axios = require("axios");

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
        <BarChart
          width={800}
          height={400}
          data={liveCountyData}
          onClick={handlePvBarClick}
        >
          <XAxis dataKey="dateString" />
          <YAxis yAxisId="a" />
          <Legend />
          <Tooltip />
          <CartesianGrid vertical={false} />
          <Bar
            yAxisId="a"
            dataKey="confirmedCovidCases"
            onAnimationStart={handleBarAnimationStart}
            onAnimationEnd={handleBarAnimationEnd}
          >
            {liveCountyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
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
