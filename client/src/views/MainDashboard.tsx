import IncomeStatement from "../components/IncomeStatement";
import InformationCard from "../components/InformationCard";

const informationCardConfig = [
  {
    title: "Income",
    description: "Total Income",
    value: 12345,
    link: "/income/:userId",
  },
  {
    title: "Expenses",
    description: "Total Expenses",
    value: 6789,
    link: "/expenses/:userId",
  },
];

export default function MainDashboard() {
  return (
    <div className="grid gap-4 ">
      <div className="flex gap-4 ">
        {informationCardConfig.map((card) => (
          <InformationCard
            key={card.title}
            title={card.title}
            description={card.description}
            value={card.value}
            link={card.link}
          />
        ))}
      </div>
      <IncomeStatement />
    </div>
  );
}
