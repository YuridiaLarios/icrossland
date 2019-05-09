import React, { Component } from "react";
import classes from "./LineGraph.module.css";
import Chart from "chart.js";

export default class MyLineGraph extends Component {
  chartRef = React.createRef();

  //   //--Chart Style Options--//
  // Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
  // Chart.defaults.global.legend.display = false;
  // //--Chart Style Options--//

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        //Labels represent x-axis = time
        labels: [
          "2019-05-01",
          "2019-05-02",
          "2019-05-03",
          "2019-05-06",
          "2019-05-07",
          "2019-05-08"
        ],
        datasets: [
          {
            label: "Open",
            data: ["209.88", "209.84", "210.89", "204.29", "205.88", "201.90"]
          },
          {
            label: "Close",
            data: ["210.52", "209.15", "211.75", "208.48", "202.86", "202.90"]
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }
  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
