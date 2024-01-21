import FundingPoolCard from "../molecules/FundingPoolCard";

const YourPoolFunds = () => {
  const data = [
    {
      avatarURL: "",
      name: "Dreampiper",
      title: "Test",
      poolFundId: 1,
      active: false,
      poolSize: 1,
    },
    {
      avatarURL: "",
      name: "Dreampiper",
      title: "Test Test Test Demoooooooooooooooooooooo",
      poolFundId: 1,
      active: false,
      poolSize: 1,
    },
  ];
  return (
    <div className="max-w-[420px] w-full">
      <p className=" font-medium py-4 text-gray-500 ">Your Pools Funds</p>
      <div className=" py-3">
        {data.map((prop, i) => (

            <FundingPoolCard key={i} {...prop} />

        ))}
      </div>
    </div>
  );
};

export default YourPoolFunds;
