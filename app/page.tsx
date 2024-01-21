import AllPoolFunds from "@/library/components/organisms/AllPoolFunds";
import MyPoolFunds from "@/library/components/organisms/YourPoolFunds";

const page = () => {
  return (
    <>
      <div className=" flex-1 h-full flex gap-4 px-16">
        <AllPoolFunds />
        <MyPoolFunds />
      </div>
    </>
  );
};

export default page;
