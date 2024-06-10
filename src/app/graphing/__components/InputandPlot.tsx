"use client";

import functionPlot from "function-plot";
import { useState, useEffect } from "react";
import FunctionCard from "./functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InputandPlot() {
  const [graphedFunctions, setFunctionList] = useState<
    Array<{ fn: string; graphType: string; id: number }>
  >([]);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 900 });

  useEffect(() => {
    try {
      if (dimensions.width && dimensions.height) {
        functionPlot({
          target: "#graph",
          width: dimensions.width,
          height: dimensions.height,
          grid: true,
          data: graphedFunctions as any,
        });
      }
    } catch (error) {
      setFunctionList([]);
      console.error(error);
    }
  }, [graphedFunctions, dimensions]);

  return (
    <div className="flex flex-col gap-y-5 h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Add your function (No y =)</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              try {
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
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Input type="text" id="func" /> <Button>Submit</Button>
          </form>
          <br />
          <div className="flex flex-col gap-y-5">
            {graphedFunctions.map((func) => (
              <div key={func.id}>
                <FunctionCard
                  editfunc={(newvalue: string) => {
                    const newFunctions = graphedFunctions.filter(
                      (f) => f.id !== func.id
                    );
                    newFunctions.push({
                      id: func.id,
                      fn: newvalue,
                      graphType: "polyline",
                    });

                    setFunctionList(newFunctions);
                  }}
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
        </CardContent>
      </Card>
    </div>
  );
}
