import React from "react";
// vx
import { Group } from "@vx/group";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";
import { LinePath, AreaClosed } from "@vx/shape";
import { AxisBottom } from "@vx/axis";
import { curveMonotoneX } from "@vx/curve";

export default function Test() {
  const data = [
    { day: 1, temp: 30 },
    { day: 2, temp: 27 },
    { day: 3, temp: 23 },
    { day: 4, temp: 21 },
    { day: 5, temp: 20 },
    { day: 6, temp: 20 },
    { day: 7, temp: 24 },
    { day: 8, temp: 25 },
  ];

  const width = 560;
  const height = 200;

  const margin = {
    top: 50,
    bottom: 20,
    left: 0,
    right: 0,
  };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = (d) => new Date(d.day);
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

  const testYScale = scaleLinear({
    range: [0, xMax],
    domain: [3, 24],
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
          scale={testYScale}
          top={yMax}
          numTicks={5}
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
