"use client";

import { useParams } from "next/navigation";

import PoolNav from "@/library/components/molecules/PoolBody";
import PoolHeader from "@/library/components/molecules/PoolHeader";

const page = () => {
  const { pool: poolFundId } = useParams();

  return (
    <div className=" flex-1">
      <PoolHeader poolFundId={poolFundId as string} />
      <PoolNav poolFundId={poolFundId as string} />
    </div>
  );
};

export default page;
