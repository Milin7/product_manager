import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import type { ColDef } from "ag-grid-community";
import { TransactionSummary } from "@/types/transaction.types";
ModuleRegistry.registerModules([AllCommunityModule]);

interface IncomeStatementProps {
  transactionData?: TransactionSummary[];
}

export default function IncomeStatement({
  transactionData,
}: IncomeStatementProps) {
  const rowData = useMemo(() => transactionData, [transactionData]);
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
    <div style={{ minHeight: "400px" }}>
      <AgGridReact<TransactionSummary> rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
