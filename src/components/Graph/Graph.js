import React, { Component } from "react";

export default class Graph extends Component {
  state = {
    graphWidth: "100%",
    graphHeight: 500
  };

  getGraphHeight = () => {
    return Math.max(...this.props.favCurrencies.map((el) => el.current_price));
  };

  getRandomColor = () => {
    return (
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  };

  componentDidMount() {}

  render() {
    const datas = this.props.favCurrencies;
    const colors = datas.map(() => this.getRandomColor());
    return (
      <div className="graph">
        <svg width={this.state.graphWidth} height={this.state.graphHeight}>
          {datas.map((el, index) => (
            <g key={"gr" + el.id}>
              <rect
                fill={colors[index]}
                x={0 + index * (100 / datas.length) + "%"}
                y={95 - (95 / this.getGraphHeight()) * el.current_price + "%"}
                width={100 / datas.length + "%"}
                height={(95 / this.getGraphHeight()) * el.current_price + "%"}
              ></rect>
              <rect
                fill={colors[index]}
                x={0 + index * (100 / datas.length) + "%"}
                y={95 + "%"}
                width={100 / datas.length + "%"}
                height={5 + "%"}
              ></rect>
              <rect
                fill={"#000000"}
                opacity="0.5"
                x={0 + index * (100 / datas.length) + "%"}
                y={95 + "%"}
                width={100 / datas.length + "%"}
                height={5 + "%"}
              ></rect>
              <text
                fill="#ffffff"
                fontSize="12"
                x={3 + index * (100 / datas.length) + "%"}
                width={100 / datas.length + "%"}
                y={"98.4%"}
              >
                {el.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }
}
