import { useQuery } from "@tanstack/react-query";
import IncomeStatement from "../components/IncomeStatement";
import InformationCard from "../components/InformationCard";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { transactionQueries } from "@/query/transaction.queries";
import { TransactionType } from "@/types/transaction.types";

export default function MainDashboard() {
  const user = useAuthStore((state) => state.user);
  const { data: transactionData } = useQuery(transactionQueries.summary(user));

  const informationCardConfig = [
    {
      title: "Income",
      description: "Total Income",
      value: (
        transactionData?.reduce((acc, curr) => {
          return curr.type === TransactionType.income ? acc + curr.amount : acc;
        }, 0) || 0
      ).toFixed(2),
    },
    {
      title: "Expenses",
      description: "Total Expenses",
      value: (
        transactionData?.reduce((acc, curr) => {
          return curr.type === TransactionType.expense
            ? acc + curr.amount
            : acc;
        }, 0) || 0
      ).toFixed(2),
    },
    {
      title: "Net Balance",
      description: "Income - Expenses",
      value: (
        transactionData?.reduce((acc, curr) => {
          return curr.type === TransactionType.income
            ? acc + curr.amount
            : acc - curr.amount;
        }, 0) || 0
      ).toFixed(2),
    },
  ];

  return (
    <div className="grid gap-4 ">
      <div className="flex gap-4 ">
        {informationCardConfig.map((card) => (
          <InformationCard
            key={card.title}
            title={card.title}
            description={card.description}
            value={card.value}
          />
        ))}
      </div>

      <IncomeStatement transactionData={transactionData} />
    </div>
  );
}
