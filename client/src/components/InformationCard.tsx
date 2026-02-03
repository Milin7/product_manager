import { Modal } from "./Modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface InformationCardProps {
  title: string;
  description: string;
  value: string;
}

export default function InformationCard({
  title,
  description,
  value,
}: InformationCardProps) {
  return (
    <>
      <Card className="w-full max-w-3xs">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="m-auto text-3xl font-semibold">
            <p>${value}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Modal title={title} />
        </CardFooter>
      </Card>
    </>
  );
}
