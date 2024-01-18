import Link from "next/link";

interface buttonProps {
  text: string;
  handleClick: any;
  buttonImg?: string;
  link?: boolean;
  href?: string;
}

const Button = (button: buttonProps) => {
  return (
    <>
      {button.link ? (
        <Link
          className=" py-4 rounded-[5px] text-sm text-[#767b82] flex items-center justify-center"
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
          className=" py-2 px-4 rounded-[5px] text-sm bg-[#313B3D] text-white flex items-center justify-center"
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
