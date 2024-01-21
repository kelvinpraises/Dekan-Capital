import { cn } from "@/library/utils";
import { useState } from "react";
import AllocationSection from "../organisms/AllocationSection";
import DetailSection from "../organisms/DetailSection";
import DistributionSection from "../organisms/DistributionSection";
import ProjectSection from "../organisms/ProjectSection";
import SubmitSection from "../organisms/SubmitSection";
import VotingSection from "../organisms/VotingSection";

const PoolNav = () => {
  const [activeScreen, setActiveScreen] = useState("detail");

  return (
    <div className="  bg-[#f4f9ff] flex-1 h-full">
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
          className={cn(activeScreen === "allocation" && "text-[#334254]")}
          onClick={() => setActiveScreen("allocation")}
        >
          Allocation
        </button>
        <button
          className={cn(activeScreen === "voting" && "text-[#334254]")}
          onClick={() => setActiveScreen("voting")}
        >
          Voting
        </button>
        <button
          className={cn(activeScreen === "distribution" && "text-[#334254]")}
          onClick={() => setActiveScreen("distribution")}
        >
          Distribution
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
            case "project":
              return <ProjectSection />;
            case "allocation":
              return <AllocationSection />;
            case "voting":
              return <VotingSection />;
            case "distribution":
              return <DistributionSection />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default PoolNav;
