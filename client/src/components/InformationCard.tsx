import { Link, LinkProps } from "react-router-dom";

interface InformationCardProps {
  title: string;
  description: string;
  value: number;
  link: LinkProps["to"];
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
          <button className="p-0.5 rounded-full cursor-pointer bg-black text-white transition-all duration-300 hover:opacity-80">
            <Link to={link}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
