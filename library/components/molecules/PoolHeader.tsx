import Image from "next/image";

const PoolHeader = ({ poolFundId }: { poolFundId: string }) => {
  const Tag = ({ isOpen }: { isOpen: boolean }) => {
    return (
      <span
        className={`inline-block px-3 py-1 rounded-xl text-xs font-semibold ml-4 ${
          isOpen ? "bg-green-200 text-green-700" : "bg-red-300 text-red-800"
        }`}
      >
        {isOpen ? "Open" : "Closed"}
      </span>
    );
  };
  return (
    <div className=" px-16 py-4 flex gap-4 w-full  border-b border-b-[#e4e5e6]">
      <Image src={"/pic.svg"} alt={"profile pic"} width={64} height={64} />
      <div className=" flex flex-col justify-between py-1">
        <p className=" text-[#334254] font-semibold text-xl">
          Write A Twitter Thread about Moongate
          <Tag isOpen={true} />
        </p>
        <p className=" text-[#94A3B8] text-sm">by Dreampiper</p>
      </div>
    </div>
  );
};

export default PoolHeader;
