import FundingPoolCard from "../molecules/FundingPoolCard";

const MyPoolFunds = () => {
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
    <div className="max-w-[420px] w-full">
      <p className=" font-medium py-4 text-gray-500 ">Your Funding Pools</p>
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

export default MyPoolFunds;
