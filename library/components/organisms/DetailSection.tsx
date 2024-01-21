import Blocks from "editorjs-blocks-react-renderer";

import Button from "../atoms/Button";
import ShowcaseModal from "../molecules/ShowcaseModal";

const DetailSection = () => {
  const data = {
    strategyAddress: "0x9876543210",
    tokenAmount: "",
    createdAt: "Sun Jan 07 2024",
    details: "",
  };

  return (
    <div className="flex gap-4">
      <div className=" flex-1 bg-white p-5 rounded-lg">
        {data.details && (
          <Blocks
            data={data.details as any}
            config={{
              code: {
                className: "language-js",
              },
              delimiter: {
                className: "border-[#5c93bb2b] border-2 w-[60%] my-8 mx-auto",
              },
              embed: {
                className: "border-0",
              },
              header: {
                className:
                  "font-semibold text-2xl pb-2 my-7 text-[#020f18b5]  border-[#5c93bb2b] border-b-[1px]",
              },
              image: {
                className: "w-full max-w-screen-md mx-auto m-8",
                actionsClassNames: {
                  stretched: "w-full h-80 object-cover",
                  withBorder: "border border-2",
                  withBackground: "p-2",
                },
              },
              list: {
                className: "list-inside pl-8 leading-9 list-disc",
              },
              paragraph: {
                className: "text-base text-opacity-85 leading-8 py-2 ",
                actionsClassNames: {
                  alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
                },
              },
              quote: {
                className: "py-4 px-6 italic font-serif",
              },
              table: {
                className: "table-auto",
              },
            }}
          />
        )}
      </div>
      <div className="max-w-[400px] w-full bg-white  p-5 rounded-lg flex flex-col gap-3 h-fit">
        <div className=" text-lg text-[#abbfdb]">
          <span className=" font-semibold text-2xl text-[#334254]">500 </span>
          Dekan
        </div>
        <div className=" flex justify-between items-center">
          <div className=" flex flex-col gap-1">
            <div className=" flex gap-2">
              <img src="/suitcase.svg" alt="" />
              <p className=" font-medium text-[#334254]"> 2</p>
            </div>
            <p className=" text-sm text-[#abbfdb]">Submissions</p>
          </div>
          <div className=" flex flex-col gap-1">
            <div className=" flex gap-2">
              <img src="/suitcase.svg" alt="" />
              <p className=" font-medium text-[#334254]"> 8d:21h:58m</p>
            </div>
            <p className=" text-sm text-[#abbfdb]">Remaining</p>
          </div>
        </div>
        <ShowcaseModal>
          <Button className="w-full" text={"Showcase Project"} handleClick={() => {}} />
        </ShowcaseModal>
      </div>
    </div>
  );
};

export default DetailSection;
