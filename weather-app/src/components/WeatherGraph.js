import React from "react";
// vx
import { Group } from "@vx/group";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";
import { LinePath, AreaClosed } from "@vx/shape";
import { AxisBottom } from "@vx/axis";
import { curveMonotoneX } from "@vx/curve";

export default function WeatherGraph(props) {
  const data = props.info.weather.map((item) => ({
    timeOfDay: parseInt(item.dt_txt.slice(11, 13)),
    temp: Math.round(item.main.feels_like - 273.15),
  }));

  const width = 560;
  const height = 140;

  const margin = {
    top: 50,
    bottom: 20,
    left: 0,
    right: 0,
  };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const x = (d) =>
    d.timeOfDay >= 12
      ? today.setHours(d.timeOfDay)
      : tomorrow.setHours(d.timeOfDay);
  const y = (d) => d.temp - 18;

  data.map(y);

  const xScale = scaleLinear({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
  });

  const testXScale = scaleLinear({
    range: [0, xMax],
    domain: [1, 8],
  });

  const chart = (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left} justify="flex-end">
        <LinePath
          data={data}
          x={(d) => xScale(x(d))}
          y={(d) => yScale(y(d))}
          strokeWidth={4}
          stroke={"#EC6E4C"}
          strokeLinecap="round"
          fill={"transparent"}
          curve={curveMonotoneX}
        />
        <AreaClosed
          data={data}
          yScale={yScale}
          x={(d) => xScale(x(d))}
          y={(d) => yScale(y(d))}
          strokeWidth={0}
          fill={"#EAA18F"}
          curve={curveMonotoneX}
        />
        <AxisBottom
          scale={testXScale}
          top={yMax}
          numTicks={7}
          stroke={"transparent"}
          tickStroke={"transparent"}
          tickLabelProps={() => ({
            fill: "#aaaaaa",
            fontSize: 11,
          })}
        />
      </Group>
    </svg>
  );

  return <div>{chart}</div>;
}
