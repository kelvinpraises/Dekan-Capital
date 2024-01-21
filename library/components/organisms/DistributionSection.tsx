import React from "react";
import Button from "../atoms/Button";

const DistributionSection = ({ poolFundId }: { poolFundId: any }) => {
  return (
    <div className="flex flex-col gap-4  flex-1 bg-white p-5 rounded-lg">
      <div className=" flex justify-between">
        <p className=" text-sm">
          Averaged sentiments are matched with the pool funds and distributed
        </p>
        <Button text={"Distribute Funds"} handleClick={undefined} />
      </div>
      <div className="flex flex-col gap-8">
        <div className="w-[520px]">{}</div>
      </div>
    </div>
  );
};

export default DistributionSection;
