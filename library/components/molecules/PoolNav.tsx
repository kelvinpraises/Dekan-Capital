import { cn } from "@/library/utils";
import { useState } from "react";
import AllocationSection from "../organisms/AllocationSection";
import DetailSection from "../organisms/DetailSection";
import DistributionSection from "../organisms/DistributionSection";
import ReviewSection from "../organisms/ReviewSection";
import SubmitSection from "../organisms/SubmitSection";
import VotingSection from "../organisms/VotingSection";
import { usePathname } from "next/navigation";
import ShowcaseSection from "../organisms/ShowcaseSection";

const PoolNav = () => {
  const [activeScreen, setActiveScreen] = useState("detail");
  const pathname = usePathname();
  const id = pathname.split("/")[3];

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
              return (
                <div className=" flex gap-8">
                  <DetailSection /> <SubmitSection />
                </div>
              );
            case "showcase":
              return <ShowcaseSection poolFundId={id} />;
            case "review":
              return <ReviewSection poolFundId={id} />;
            case "allocate":
              return <AllocationSection poolFundId={id} />;
            case "vote":
              return <VotingSection poolFundId={id} />;
            case "distribute":
              return <DistributionSection poolFundId={id} />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default PoolNav;
