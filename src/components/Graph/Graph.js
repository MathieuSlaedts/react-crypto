import React, { useState } from "react";

export default function Graph(props) {

  const [graphDim, setGrapgDim] = useState({
    width: "100%",
    height: 500
  });

  const getGraphHeight = () => {
    return Math.max(...props.favCoins.map((el) => el.current_price));
  };

  const getRandomColor = () => {
    return (
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  };
    const datas = props.favCoins;
    const colors = datas.map(() => getRandomColor());
    return (
      <div className="graph">
        <svg width={graphDim.width} height={graphDim.height}>
          {datas.map((el, index) => (
            <g key={"gr" + el.id}>
              <rect
                fill={colors[index]}
                x={0 + index * (100 / datas.length) + "%"}
                y={95 - (95 / getGraphHeight()) * el.current_price + "%"}
                width={100 / datas.length + "%"}
                height={(95 / getGraphHeight()) * el.current_price + "%"}
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
