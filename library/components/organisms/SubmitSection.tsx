import Button from "../atoms/Button";

const SubmitSection = () => {
  return (
    <div className="max-w-[400px] w-full bg-white  p-5 rounded-lg flex flex-col gap-3">
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
      <Button text={"Showcase Project"} handleClick={undefined} />
      

    </div>
  );
};

export default SubmitSection;
