import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { categoryQueries } from "@/query/category.queries";
import { useQuery } from "@tanstack/react-query";

interface TransactionFormProps {
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
}

export default function TransactionForm({
  selectedCategory,
  setSelectedCategory,
}: TransactionFormProps) {
  const user = useAuthStore((state) => state.user);
  const categories = useQuery(categoryQueries.all(user));

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
    <>
      <Field>
        <Label htmlFor="category">Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger id="category" name="category">
            <SelectValue placeholder="Select a category" />
            <SelectContent>
              {categories.data?.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
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
              {input.required && <span className="text-destructive">*</span>}
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
    </>
  );
}
