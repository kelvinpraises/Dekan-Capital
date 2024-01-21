import Button from "../atoms/Button";

const VotingSection = ({ poolFundId }: { poolFundId: any }) => {
  return (
    <div className="flex flex-col gap-4  flex-1 bg-white p-5 rounded-lg">
      <div className=" flex justify-between">
        <p className=" text-sm">
          Vote on if the collective averaged sentiment is fit for the ecosystem
        </p>
        <Button text={"Vote on Proposal"} handleClick={undefined} />
      </div>
      <div className="flex flex-col gap-8">
        <div className="w-[520px]">{}</div>
      </div>
    </div>
  );
};

export default VotingSection;
