import { cn } from "@/library/utils";
import Link from "next/link";

interface buttonProps {
  text: string;
  handleClick: any;
  buttonImg?: string;
  link?: boolean;
  href?: string;
  className?: string;
}

const Button = (button: buttonProps) => {
  return (
    <>
      {button.link ? (
        <Link
          className={cn(
            "py-4 rounded-[5px] text-sm text-[#767b82] flex items-center justify-center",
            button.className
          )}
          href={button.href || ""}
        >
          {button.text}
          {button.buttonImg && (
            <img src={`/${button.buttonImg}`} className=" pl-4" />
          )}
        </Link>
      ) : (
        <button
          onClick={button.handleClick}
          className={cn(
            "py-4 px-4 rounded-[5px] text-sm font-bold bg-[#313B3D] text-white flex items-center justify-center",
            button.className
          )}
        >
          {button.text}
          {button.buttonImg && (
            <img src={`/${button.buttonImg}`} className=" pl-4" />
          )}
        </button>
      )}
    </>
  );
};

export default Button;
