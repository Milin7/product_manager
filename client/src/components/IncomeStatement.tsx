import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useEffect } from "react";
import type { ColDef } from "ag-grid-community";
import { TransactionSummary } from "@/types/transaction.types";
import { themeQuartz } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

interface IncomeStatementProps {
  transactionData?: TransactionSummary[];
}

const tableTheme = themeQuartz.withParams({
  headerBackgroundColor: "#000000",
  headerTextColor: "#ffffff",
  headerColumnResizeHandleColor: "#ffffff99",
});

export default function IncomeStatement({
  transactionData,
}: IncomeStatementProps) {
  const gridRef = useRef<AgGridReact<TransactionSummary>>(null);
  const rowData = useMemo(() => transactionData, [transactionData]);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.setGridOption("rowData", rowData);
    }
  }, [rowData]);

  const [colDefs] = useMemo<[ColDef<TransactionSummary>[]]>(() => {
    return [
      [
        {
          field: "transactionDate",
          headerName: "Transaction Date",
          valueFormatter: (params) => {
            return params.value
              ? new Date(params.value).toLocaleDateString()
              : "";
          },
        },
        { field: "amount", headerName: "Amount" },
        { field: "type", headerName: "Type" },
        { field: "description", headerName: "Description" },
        { field: "categoryName", headerName: "Category" },
      ],
    ];
  }, []);

  return (
    <div style={{ minHeight: "400px", width: "50vw" }}>
      <AgGridReact<TransactionSummary>
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        theme={tableTheme}
      />
    </div>
  );
}
