import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TransactionType } from "@/types/transaction.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { transactionQueries } from "@/query/transaction.queries";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryQueries } from "@/query/category.queries";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

interface ModalProps {
  title: string;
}

export function Modal({ title }: ModalProps) {
  const user = useAuthStore((state) => state.user);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  const createTransactionMutation = useMutation({
    ...transactionQueries.create(),
    onSuccess: () => {
      toast.success(`${title} transaction created successfully`, {
        position: "top-center",
      });
      formRef.current?.reset();
      setSelectedCategory(undefined);
    },
    onError: (error) => {
      toast.error(`Failed to create transaction: ${error.message}`, {
        position: "top-center",
      });
    },
  });
  const categories = useQuery(categoryQueries.all(user));

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
        title.toLowerCase() === TransactionType.income
          ? TransactionType.income
          : TransactionType.expense,
      description: formData.get("description") as string,
      transactionDate: new Date(formData.get("date") as string),
      categoryId: selectedCategory ? Number(selectedCategory) : null,
    };

    createTransactionMutation.mutate(params);
  };

  const inputConfig = [
    {
      id: "date",
      label: "Date",
      type: "date",
      defaultValue: new Date().toISOString().slice(0, 10),
      required: true,
    },
    {
      id: "amount",
      label: "Amount",
      type: "number",
      step: 0.01,
      required: true,
      placeholder: "0.00",
    },
    {
      id: "description",
      label: "Description",
      type: "text",
      placeholder: "Optional",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button className="w-full">Create {title} transaction</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{handleDescription(title)}</DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            <Field>
              <Label htmlFor="category">Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger id="category" name="category">
                  <SelectValue placeholder="Select a category" />
                  <SelectContent>
                    {categories.data?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </Field>
            <Field>
              {inputConfig.map((input) => (
                <Field key={input.id}>
                  <Label htmlFor={input.id}>
                    {input.label}{" "}
                    {input.required && (
                      <span className="text-destructive">*</span>
                    )}
                  </Label>
                  <Input
                    id={input.id}
                    name={input.id}
                    type={input.type}
                    defaultValue={input.defaultValue}
                    step={input.step}
                    placeholder={input.placeholder}
                    required={input.required}
                  />
                </Field>
              ))}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-4">
            <Button type="submit">Add {title}</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
