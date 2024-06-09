"use client";

import functionPlot from "function-plot";
import { useState, useEffect } from "react";
import FunctionCard from "./functions";

export default function InputandPlot() {
  const [graphedFunctions, setFunctionList] = useState<
    Array<{ fn: string; graphType: string; id: number }>
  >([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 300 });

  useEffect(() => {
    let contentsBounds = document.body.getBoundingClientRect();
    let width = 1250;
    let height = 750;
    setDimensions({ width, height });
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      functionPlot({
        target: "#graph",
        width: dimensions.width,
        height: dimensions.height,
        grid: true,
        data: graphedFunctions as any,
      });
    }
  }, [graphedFunctions, dimensions]);

  return (
    <div className="flex flex-col gap-y-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const functionData: HTMLInputElement = document.getElementById(
            "func"
          ) as any;
          setFunctionList([
            ...graphedFunctions,
            {
              fn: functionData.value.toLowerCase(),
              graphType: "polyline",
              id: Math.random(),
            } as never,
          ]);

          functionData.value = "";
        }}
      >
        <input type="text" id="func" /> <button>Submit</button>
      </form>
      <div className="flex flex-col gap-y-5">
        {graphedFunctions.map((func) => (
          <div key={func.id}>
            <FunctionCard
              id={func.id}
              function={func.fn}
              deletefunc={() => {
                const newFunctions = graphedFunctions.filter(
                  (f) => f.id !== func.id
                );

                setFunctionList(newFunctions);

                functionPlot({
                  target: "#graph",
                  width: dimensions.width,
                  height: dimensions.height,
                  grid: true,
                  data: newFunctions as any,
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
