import DocfundSection from "@/library/components/organisms/DocfundSection";
import FundingPoolSection from "@/library/components/organisms/FundingPoolSection";
import React from "react";

const page = () => {
  return (
    <>
      <div className=" flex-1 h-full flex gap-4">
        <FundingPoolSection />
        <DocfundSection />
      </div>
    </>
  );
};

export default page;
