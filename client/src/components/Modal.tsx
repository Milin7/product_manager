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
import { FieldGroup } from "./ui/field";

interface ModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  handleDescription?: (title: string) => string | undefined;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({
  title,
  description,
  children,
  handleSubmit,
  handleDescription,
  open,
  onOpenChange,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button className="w-full">Create {title} transaction</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {handleDescription ? handleDescription(title) : description}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">{children}</FieldGroup>

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
