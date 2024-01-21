import Image from "next/image";
import Link from "next/link";

const Footer = ({ className }: { className?: string }) => {
  const date = new Date();

  return (
    <div
      className={` flex pb-8 border-t border-t-[#e4e5e6] bg-white ${className} px-16 gap-24 items-center`}
    >
      <div className=" flex flex-col gap-3 ">
        <p className=" text-slate-700 font-bold">DEKAN</p>
        <p className=" text-sm text-slate-500 w-[580px]">
          Dekan Capital is a project focused on effective capital allocation.
          The Dekan token is a governance vault token and is backed by GHO, a
          stable yield-enabled token, that supports this initiative.{" "}
        </p>
        <p className=" text-sm font-bold text-slate-500">
          © {date.getFullYear()} Dekan Capital
        </p>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Footer;
