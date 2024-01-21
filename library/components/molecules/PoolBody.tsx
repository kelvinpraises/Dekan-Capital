import { useState } from "react";

import { cn } from "@/library/utils";
import AllocationSection from "../organisms/AllocationSection";
import DetailSection from "../organisms/DetailSection";
import DistributionSection from "../organisms/DistributionSection";
import ReviewSection from "../organisms/ReviewSection";
import ShowcaseSection from "../organisms/ShowcaseSection";
import VotingSection from "../organisms/VotingSection";

const PoolBody = ({ poolFundId }: { poolFundId: string }) => {
  const [activeScreen, setActiveScreen] = useState("detail");

  return (
    <div className="  bg-[#F3EFEE] flex-1 h-full">
      <div className="flex gap-4 items-center text-[#abbfdb] py-3 bg-white px-16">
        <button
          className={cn(activeScreen === "detail" && "text-[#334254]")}
          onClick={() => setActiveScreen("detail")}
        >
          Detail
        </button>
        <button
          className={cn(activeScreen === "project" && "text-[#334254]")}
          onClick={() => setActiveScreen("project")}
        >
          Projects
        </button>
        <button
          className={cn(activeScreen === "review" && "text-[#334254]")}
          onClick={() => setActiveScreen("review")}
        >
          Review
        </button>
        <button
          className={cn(activeScreen === "allocate" && "text-[#334254]")}
          onClick={() => setActiveScreen("allocate")}
        >
          Allocate
        </button>
        <button
          className={cn(activeScreen === "vote" && "text-[#334254]")}
          onClick={() => setActiveScreen("vote")}
        >
          Vote
        </button>
        <button
          className={cn(activeScreen === "distribute" && "text-[#334254]")}
          onClick={() => setActiveScreen("distribute")}
        >
          Distribute
        </button>
      </div>

      <div className=" pt-4 pb-8  mx-16">
        {(() => {
          switch (activeScreen) {
            case "detail":
              return <DetailSection />;
            case "showcase":
              return <ShowcaseSection {...{ poolFundId }} />;
            case "review":
              return <ReviewSection {...{ poolFundId }} />;
            case "allocate":
              return <AllocationSection {...{ poolFundId }} />;
            case "vote":
              return <VotingSection {...{ poolFundId }} />;
            case "distribute":
              return <DistributionSection {...{ poolFundId }} />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default PoolBody;
