import React from "react";
// vx
import { appleStock } from "@vx/mock-data";
import { Group } from "@vx/group";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";
import { AreaClosed } from "@vx/shape";
import { LinearGradient } from "@vx/gradient";
import { curveMonotoneX } from "@vx/curve";

export default function Test() {
  const data = appleStock;

  const width = 560;
  const height = 100;

  const margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  console.log("DUMMY DATA", data);

  const x = (d) => new Date(d.date); // d.date is unix timestamps
  const y = (d) => d.close;

  console.log(x(data[0])); // Fri Aug 21 1970 12:23:21 GMT-0600 (MDT)
  console.log(y(data[0])); // 72.2

  data.map(y);

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
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={data}
          yScale={yScale}
          x={(d) => xScale(x(d))}
          y={(d) => yScale(y(d))}
          strokeWidth={1}
          stroke={"red"}
          fill={"red"}
          curve={curveMonotoneX}
        />
      </Group>
    </svg>
  );

  return <div>{chart}</div>;
}
