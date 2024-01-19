
import Button from "../atoms/Button";
import CustomSIWEButton from "../atoms/CustomSIWEButton";
const Header = () => {
  return (
    <div className=" flex justify-between items-center px-4 border-b border-b-[#e4e5e6] py-3 bg-white pr-8">
      <p className=" text-sm font-bold">DEKAN</p>
      <div className=" flex gap-6">
        <Button text={"Create a Fund Pool"} handleClick={undefined} link={true} />
        <CustomSIWEButton />
      </div>
    </div>
  );
};

export default Header;
