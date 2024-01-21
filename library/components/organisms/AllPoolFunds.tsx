import FundingPoolCard from "../molecules/FundingPoolCard";

const AllPoolFunds = () => {
  const data = [
    {
      avatarURL: "",
      name: "Dreampiper",
      title: "Test",
      poolFundId: 1,
      active: false,
      poolSize: 1,
    },
  ];
  return (
    <div className=" flex-1 h-full border-r border-r-[#e4e5e6] pr-4">
      <p className=" font-medium border-b py-4 border-b-[#e4e5e6]">
        All Pool Funds
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

export default AllPoolFunds;
