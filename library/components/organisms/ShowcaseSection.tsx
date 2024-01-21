import { useEffect, useReducer } from "react";

import { getPoolFundProjects } from "@/library/services/backendAPI";
import LargeCard from "../molecules/LargeCard";

interface PoolFundProject {
  projectId: number;
  createdBy: string;
  tokensRequested: number;
  emoji: string;
  title: string;
  description: string;
}

type PoolFundProjects = { poolFundProjects: PoolFundProject[] };

const initialState = {
  poolFundProjects: [],
};

const stateReducer = (
  current: PoolFundProjects,
  update: Partial<PoolFundProjects>
): PoolFundProjects => {
  return {
    ...current,
    ...update,
  };
};

const ShowcaseSection = ({ poolFundId }: { poolFundId: string }) => {
  const [values, updateValues] = useReducer(stateReducer, initialState);

  useEffect(() => {
    (async () => {
      const poolFundProjects = await getPoolFundProjects(poolFundId);
      updateValues({ poolFundProjects });
    })();
  }, []);

  return (
    <div className="w-[520px] flex flex-col gap-4">
      {values.poolFundProjects?.map((x) => {
        return (
          <LargeCard
            title={x.title}
            description={x.description}
            buttonText={"Open Fund"}
            buttonImg={"enter.svg"}
            buttonOnclick={() => {
              throw new Error("Function not implemented.");
            }}
          />
        );
      })}
    </div>
  );
};

export default ShowcaseSection;
