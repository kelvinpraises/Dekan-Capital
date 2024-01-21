"use client";
import { useEffect, useReducer } from "react";

import {
  createPoolFundAllocation,
  getPoolFundAllocations,
  getPoolFundProjects,
} from "@/library/services/backendAPI";
import { useStore } from "@/library/store/useStore";
import Button from "../atoms/Button";
import AllocationCard from "../molecules/AllocationCard";

interface poolFundProjects {
  projectId: number;
  createdBy: string;
  tokensRequested: number;
  emoji: string;
  title: string;
  description: string;
}

export interface AllocateSectionState {
  showAllocateSentiment: boolean;
  allocators: Allocation[];
  personalAllocations: Allocation["allocated"];
}

interface Allocation {
  name: string;
  address: string;
  allocated: {
    projectId: number;
    amount: number;
    title: string;
    createdBy: string;
  }[];
}

const initialState = {
  showAllocateSentiment: false,
  allocators: [],
  personalAllocations: [],
};

const stateReducer = (
  current: AllocateSectionState,
  update: Partial<AllocateSectionState>
): AllocateSectionState => {
  return {
    ...current,
    ...update,
  };
};

const AllocateSection = ({ poolFundId }: { poolFundId: any }) => {
  // TODO: take into consideration the previous allocations made by user, basically when user edits their prev choice
  useEffect(() => {
    (async () => {
      const allocators = await getPoolFundAllocations(poolFundId);
      const poolFundProjects: poolFundProjects[] = await getPoolFundProjects(
        poolFundId
      );

      const personalAllocations = poolFundProjects?.map((poolFund) => {
        return {
          projectId: poolFund.projectId,
          amount: 0,
          title: poolFund.title,
          createdBy: poolFund.createdBy,
        };
      });

      updateValues({ allocators, personalAllocations });
    })();
  }, [poolFundId]);

  const [values, updateValues] = useReducer(stateReducer, initialState);

  const userAddress = useStore((state) => state.userAddress);
  const userName = useStore((state) => state.userName);

  return (
    <div className="flex flex-col gap-8  flex-1 bg-white p-5 rounded-lg">
      <div className=" flex justify-between">
        <p className="text-sm">
          Allocate project value sentiment as they are averaged for final voting
        </p>
        <Button
          text={"Allocate Sentiment"}
          handleClick={() => updateValues({ showAllocateSentiment: true })}
        />
      </div>

      <div className="flex flex-col gap-8">
        {values.showAllocateSentiment && (
          <AllocationCard
            poolFundId={poolFundId}
            name={userName}
            address={userAddress}
            open
            allocated={values.personalAllocations}
            updateValues={updateValues}
            createPoolFundAllocation={createPoolFundAllocation}
          />
        )}
        {values.allocators.map(({ name, address, allocated }) => {
          return (
            <AllocationCard
              poolFundId={poolFundId}
              name={name}
              address={address}
              allocated={allocated}
              readonly
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllocateSection;
