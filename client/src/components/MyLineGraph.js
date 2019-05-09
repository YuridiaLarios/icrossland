import React, { PureComponent } from "react";
import classes from "./LineGraph.module.css";
import Chart from "chart.js";

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.defaultFontSize = 13;
Chart.defaults.global.legend.display = true;
Chart.defaults.global.legend.position = "right";
Chart.defaults.global.elements.line.tension = 0.2;
//--Chart Style Options--//

export default class MyLineGraph extends PureComponent {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
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
            data: ["209.88", "209.84", "210.89", "204.29", "205.88", "201.90"],
            borderColor: "#98B9AB",
            borderWidth: 3,
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 10
          },
          {
            label: "Close",
            data: ["210.52", "209.15", "211.75", "208.48", "202.86", "202.90"],
            borderColor: "#FF4500",
            borderWidth: 3,
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 10
          }
        ]
      },
      options: {
        //Customize chart options
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
              }
            }
          ]
        },
        layout: {
          padding: {
            top: 5,
            left: 15,
            right: 15,
            bottom: 15
          }
        }
      }
    });
  };
  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas
          id="myChart"
          aria-label="Graph of open and close"
          role="img"
          ref={this.chartRef}
        />
      </div>
    );
  }
}
