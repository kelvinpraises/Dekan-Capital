import ProgressStep from "../atoms/Step";
import TxHashes from "../atoms/TxHash";
import {
  Status,
  getLatestLoadingIndex,
  progressGap,
} from "../organisms/ProgressModal";

const StrategyProgressItem = (prop: {
  progressSteps: { name: string; status: Status }[];
  txHashes: { [key: string]: string };
}) => {
  return (
    <div className="w-full flex items-center">
      <div
        className={"flex flex-col min-w-fit"}
        style={{ gap: `${progressGap}rem` }}
      >
        {prop.progressSteps.map((step, index, items) => {
          return (
            <ProgressStep
              name={step.name}
              last={items.length === index + 1}
              index={index}
              status={step.status}
            />
          );
        })}
      </div>
      <div className="w-full flex items-center">
        {(() => {
          const index = getLatestLoadingIndex(prop.progressSteps);
          switch (index) {
            case 0:
              return <>Deploying strategy</>;
            case 1:
              return <p>Setting up Allo</p>;
            case 2:
              return <>...</>;
            case 3:
              return (
                <TxHashes
                  txHashes={prop.txHashes}
                  note="You have created a new pool! Redirecting in 10 seconds"
                />
              );
            default:
              return <></>;
          }
        })()}
      </div>
    </div>
  );
};

export default StrategyProgressItem;
