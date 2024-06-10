"use client";

import InputandPlot from "./__components/InputandPlot";

export default function GraphingPage() {
  return (
    <div className="flex h-full w-full" id="graphpage">
      <InputandPlot />
      <div id="graph" className="h-full w-16"></div>
    </div>
  );
}
