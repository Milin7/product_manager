import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface InformationCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function InformationCard({
  title,
  description,
  children,
}: InformationCardProps) {
  return (
    <>
      <Card className="w-full max-w-3xs">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {children}
      </Card>
    </>
  );
}
