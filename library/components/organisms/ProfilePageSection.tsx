"use client";
import { cn } from "@/library/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "../atoms/Button";
import FundReceivedSection from "./FundReceivedSection";
import InvestmentSection from "./InvestmentSection";

const ProfilePageSection = () => {
  const [activeScreen, setActiveScreen] = useState("funds-received");

  return (
    <div className=" bg-white max-w-[700px] w-full rounded-[20px] p-7 mt-[-120px] z-10 flex flex-col">
      <div className=" flex justify-between pb-5 border-b">
        <div className=" flex flex-col ">
          <Image
            src="/pfp.png"
            alt="profile picture"
            className="rounded-full"
            width={80}
            height={80}
          />
          <p className=" font-medium text-xl mt-2">Jenny far</p>
          <p className=" text-[#abbfdb] text-sm">@jenny</p>
        </div>
        <div className=" max-w-40 w-full flex flex-col gap-2">
          {/* <button className=" border border-[#63392c] py-3 rounded-lg font-bold text-[#334254]">Share</button> */}
          <Button text={"Share"} handleClick={undefined} />
          <Button text={"Edit Profile"} handleClick={undefined} />
        </div>
      </div>

      <div className=" py-5 border-b justify-between flex">
        <div className=" max-w-72  flex flex-col gap-2">
          <p className=" font-medium">Details</p>
          <p className="text-[#94a3b8]">
            Lorem, ipsum dolor sit amet consectetur adipisicing distinctio
            voluptatum nesciunt architecto ipsum molestiae maxime!
          </p>
        </div>
        <div className=" flex gap-4 items-center">
          <Link href={""}>
            <Image
              src="/twitter.png"
              alt="twitter logo"
              width={24}
              height={24}
            />
          </Link>
          <Link href={""}>
            <Image
              src="/linkedin.png"
              alt="linkedin logo"
              width={24}
              height={24}
            />
          </Link>
          <Link href={""}>
            <Image src="/github.png" alt="github logo" width={24} height={24} />
          </Link>
          <Link href={""}>
            <Image src="/web.png" alt="web logo" width={24} height={24} />
          </Link>
        </div>
      </div>

      <div className=" py-5 border-b">
        <div className="flex gap-4 items-center justify-end text-[#94a3b8] ">
          <button
            className={cn(
              activeScreen === "funds-received" && "text-[#334254]"
            )}
            onClick={() => setActiveScreen("funds-received")}
          >
            Funds Received
          </button>
          <button
            className={cn(activeScreen === "investment" && "text-[#334254]")}
            onClick={() => setActiveScreen("investment")}
          >
            Investments
          </button>
        </div>

        <div className="pt-4 ">
          {(() => {
            switch (activeScreen) {
              case "funds-received":
                return <FundReceivedSection />;
              case "investment":
                return <InvestmentSection />;

              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSection;
