import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";

interface InformationCardProps {
  title: string;
  description: string;
  value: number;
  link: string;
}

export default function InformationCard({
  title,
  description,
  value,
  link,
}: InformationCardProps) {
  return (
    <>
      <div className="p-4 cursor-default rounded-2xl shadow-md bg-white w-full flex justify-between items-center">
        <div className="flex flex-col m-auto items-center">
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          <p className="text-gray-700">{description}</p>
          <p className="text-xl font-semibold">${value}</p>
        </div>
        <div>
          <Link to={link}>
            <Button variant={"ghost"} size={"icon-sm"} asChild>
              <CirclePlus />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
