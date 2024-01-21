import { useEffect, useReducer } from "react";

import { getPoolFundProjects } from "@/library/services/backendAPI";
import Button from "../atoms/Button";
import ReviewCard from "../molecules/ReviewCard";

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

const ProjectSection = ({ poolFundId }: { poolFundId: any }) => {
  const [values, updateValues] = useReducer(stateReducer, initialState);

  useEffect(() => {
    (async () => {
      const poolFundProjects = await getPoolFundProjects(poolFundId);
      updateValues({ poolFundProjects });
    })();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className=" flex justify-between">
        <p className=" text-sm">
          Review showcased projects by accepting or rejecting applications
        </p>
        <Button text={"Upload Revision"} handleClick={undefined} />
      </div>
      <div className="flex flex-col gap-8">
        {values.poolFundProjects.map(() => {
          return (
            <ReviewCard
              name={"fgfgfg"}
              address={"0xB754369b3a7C430d7E94c14f33c097C398a0caa5"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSection;
