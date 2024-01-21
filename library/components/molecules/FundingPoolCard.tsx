import Image from "next/image";
import Link from "next/link";

interface IFundingPoolCard {
  avatarURL: string;
  name: string;
  title: string;
  poolFundId: number;
  active: boolean;
  poolSize: number;
}

const FundingPoolCard = (prop: IFundingPoolCard) => {
  return (
    <Link
      className="flex justify-between items-center p-4 hover:bg-slate-200 rounded-md"
      href={`/pools/${prop.poolFundId}`}
    >
      <div className="flex gap-4">
        <Image
          src={prop.avatarURL ? prop.avatarURL : "/pic.svg"}
          alt={prop.title}
          width={64}
          height={64}
        />
        <div className=" flex flex-col">
          <p className="truncate max-w-[20ch]">{prop.title}</p>
          <p className=" text-sm text-[#767b82]">{prop.name}</p>
          <div className=" flex gap-8 items-center font-light">
            {/* {card.closing && (
              <p className=" text-xs text-[#767b82] border-r border-r-[#e4e5e6] pr-8">
                closing in {card.closing} days
              </p>
            )} */}
            {prop.active ? (
              <p className=" text-green-500 text-xs">open</p>
            ) : (
              <p className=" text-pink-600 text-xs">closed</p>
            )}
          </div>
        </div>
      </div>
      <p className="text-lg font-medium min">{prop.poolSize} DKN</p>
    </Link>
  );
};

export default FundingPoolCard;
