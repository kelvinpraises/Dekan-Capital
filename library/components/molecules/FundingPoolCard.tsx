import Image from "next/image";
import Link from "next/link";

interface IFundingPoolCard {
  title: string;
  href: string;
  imgsrc: string;
  closing: string;
  open: boolean;
}

const FundingPoolCard = (card: IFundingPoolCard) => {
  return (
    <Link
      className=" flex justify-between items-center w-full p-4 hover:bg-slate-200 rounded-md"
      href={card.href}
    >
      <div className=" flex gap-4 items-center h-[64px]">
        <Image src={card.imgsrc} alt={card.title} width={64} height={64} />
        <div className=" flex flex-col justify-between h-full">
          <p>{card.title}</p>
          <p className=" text-sm text-[#767b82] ">Superteam uk</p>
          <div className=" flex gap-8 items-center font-light">
            {card.closing && (
              <p className=" text-xs text-[#767b82] border-r border-r-[#e4e5e6] pr-8">
                closing in {card.closing} days
              </p>
            )}
            {card.open ? (
              <p className=" text-green-500 text-xs">open</p>
            ) : (
              <p className=" text-pink-600 text-xs">closed</p>
            )}
          </div>
        </div>
      </div>
      <p className=" text-lg font-medium">550 USDC</p>
    </Link>
  );
};

export default FundingPoolCard;
