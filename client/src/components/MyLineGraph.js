import React, { PureComponent } from "react";
import classes from "./LineGraph.module.css";
import Chart from "chart.js";

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.defaultFontSize = 16;
Chart.defaults.global.legend.display = true;
Chart.defaults.global.legend.position = "top";
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
        labels: this.props.historyDates,
        datasets: [
          {
            label: "Open",
            data: this.props.historyOpenData,
            borderColor: "#98B9AB",
            borderWidth: 3,
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 10
          },
          {
            label: "Close",
            data: this.props.historyCloseData,
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
        layout: {
          padding: {
            top: 1,
            left: 1,
            right: 1,
            bottom: 1
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
