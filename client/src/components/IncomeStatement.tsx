import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import type { ColDef } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function IncomeStatement() {
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  type RowDataType = {
    make: string;
    model: string;
    price: number;
    electric: boolean;
  };

  const [colDefs] = useState<ColDef<RowDataType>[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "calc(100vh - 500px)", width: "auto" }}
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
