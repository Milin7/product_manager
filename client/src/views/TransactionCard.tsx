import InformationCard from "@/components/InformationCard";
import { Modal } from "@/components/Modal";
import { CardContent, CardFooter } from "@/components/ui/card";
import TransactionForm from "./TransactionForm";
import { transactionQueries } from "@/query/transaction.queries";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { toast } from "sonner";
import { TransactionType } from "@/types/transaction.types";

interface TransactionCardProps {
  card: {
    title: string;
    description: string;
    value: string;
  };
}

export default function TransactionCard({ card }: TransactionCardProps) {
  const user = useAuthStore((state) => state.user);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createTransactionMutation = useMutation({
    ...transactionQueries.create(),
    onSuccess: () => {
      toast.success(`Transaction created successfully`, {
        position: "top-center",
      });
      setSelectedCategory(undefined);
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to create transaction: ${error.message}`, {
        position: "top-center",
      });
    },
  });

  //TODO: Handle description better, maybe pass it as a prop instead of using a callback to determine it based on the title
  const handleDescription = useCallback((title: string) => {
    if (title.toLowerCase() === TransactionType.income) {
      return "Add a new income transaction";
    } else if (title.toLowerCase() === TransactionType.expense) {
      return "Add a new expense transaction";
    }
  }, []);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const params = {
      userId: user,
      amount: parseFloat(formData.get("amount") as string),
      type:
        card.title.toLowerCase() === TransactionType.income
          ? TransactionType.income
          : TransactionType.expense,
      description: formData.get("description") as string,
      transactionDate: new Date(formData.get("date") as string),
      categoryId: selectedCategory ? Number(selectedCategory) : null,
    };

    createTransactionMutation.mutate(params);
  };

  return (
    <InformationCard
      key={card.title}
      title={card.title}
      description={card.description}
    >
      <CardContent>
        <div className="m-auto text-3xl font-semibold">
          <p>{card.value && `$${card.value}`}</p>
        </div>
      </CardContent>

      <CardFooter>
        {card.title != "Net Balance" && (
          <Modal
            handleDescription={handleDescription}
            handleSubmit={handleSubmit}
            title={card.title}
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
          >
            <TransactionForm
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Modal>
        )}
      </CardFooter>
    </InformationCard>
  );
}
