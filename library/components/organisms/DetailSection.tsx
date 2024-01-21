const DetailSection = () => {
  const data = {
    strategyAddress: "0x9876543210",
    tokenAmount: "",
    createdAt: "Sun Jan 07 2024",
  };
  return (
    <div className=" flex-1 bg-white p-5 rounded-lg">
      {/* <div className=""> */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold">Strategy</p>
            <p className="text-sm">{data?.strategyAddress}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold">Pool</p>
            <p className="text-sm">{data?.tokenAmount}5000 RDT</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold">Created</p>
            <p className="text-sm">{data?.createdAt}</p>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default DetailSection;
