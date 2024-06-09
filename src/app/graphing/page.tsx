"use client";

import InputandPlot from "./__components/InputandPlot";

export default function GraphingPage() {
  return (
    <div className="flex">
      <InputandPlot />
      <div id="graph" className="h-16 w-16"></div>
    </div>
  );
}
