import FundingPoolCard from "../molecules/FundingPoolCard";

const FundingPoolSection = () => {
  const data = [
    {
      title: "Write a twitter thread about moongate",
      href: "",
      imgsrc: "/pic.svg",
      closing: "7",
      open: false,
    },
    {
      title: "Write a twitter thread about moongate",
      href: "",
      imgsrc: "/pic.svg",
      closing: "7",
      open: true,
    },
  ];
  return (
    <div className=" flex-1 h-full border-r border-r-[#e4e5e6] pr-4">
      <p className=" font-medium border-b py-4 border-b-[#e4e5e6]">
        Funding Pool
      </p>
      <div className=" py-3">
        {data.map((prop, i) => (
          <div className=" flex flex-col flex-1 " key={i}>
            <FundingPoolCard {...prop} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundingPoolSection;
