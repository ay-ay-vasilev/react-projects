import React from "react";
// vx
import { Group } from "@vx/group";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";
import { LinePath, AreaClosed } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";

export default function WeatherGraph(props) {
  const data = props.info.weather.map((item, index) => ({
    order: index,
    temp: Math.round(item.main.feels_like - 273.15),
  }));

  const width = 560;
  const height = 80;

  const margin = {
    top: 30,
    bottom: 0,
    left: 0,
    right: 0,
  };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = (d) =>
    d.order;

  const y = (d) =>
    d.temp -
    (Math.min.apply(
      null,
      data.map((item) => item.temp)
    ) -
      2);

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
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
      </Group>
    </svg>
  );

  return <div>{chart}</div>;
}
