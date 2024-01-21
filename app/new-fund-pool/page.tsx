"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useReducer } from "react";
import { Address } from "viem";

import Button from "@/library/components/atoms/Button";
import Switch from "@/library/components/atoms/Switch";
import Concentric from "@/library/components/molecules/Concentric";
import Input from "@/library/components/molecules/Input";
import StrategySelect from "@/library/components/molecules/StrategySelect";
import EmojiPicker from "@/library/components/organisms/EmojiPicker";
import ProgressModal from "@/library/components/organisms/ProgressModal";
import TimeLock from "@/library/contracts/TimeLock";
import { createPool } from "@/library/services/backendAPI";
import { deployDVMDD, setupAllo } from "@/library/services/contractOps";
import { useStore } from "@/library/store/useStore";

export interface NewFundPool {
  emoji: string;
  title: string;
  detail: string;
  tokenAmount: number;
  streamDonation: boolean;
  strategy: string;
  poolManagers: string;
  registrationStart: number;
  registrationEnd: number;
  allocationStart: number;
  allocationEnd: number;
  createdAt: number;
}

// TODO: Ensure the dates passed should be a time in the future.
const initialState = {
  emoji: "",
  title: "",
  detail: "",
  tokenAmount: 0,
  streamDonation: false,
  strategy: "",
  poolManagers: TimeLock.address,
  registrationStart: Math.floor(new Date().getTime() / 1000), // Convert to Unix timestamp already in UTC
  registrationEnd: Math.floor(new Date().getTime() / 1000), // Convert to Unix timestamp already in UTC
  allocationStart: Math.floor(new Date().getTime() / 1000), // Convert to Unix timestamp already in UTC
  allocationEnd: Math.floor(new Date().getTime() / 1000), // Convert to Unix timestamp already in UTC
  createdAt: Math.floor(new Date().getTime() / 1000),
};

const stateReducer = (
  current: NewFundPool,
  update: Partial<NewFundPool>
): NewFundPool => {
  return {
    ...current,
    ...update,
    tokenAmount:
      update.tokenAmount === undefined
        ? current.tokenAmount
        : isNaN(current.tokenAmount)
        ? 0
        : update.tokenAmount || 0,
    registrationStart:
      update.registrationStart === undefined
        ? current.registrationStart
        : update.registrationStart || Math.floor(new Date().getTime() / 1000),
    registrationEnd:
      update.registrationEnd === undefined
        ? current.registrationEnd
        : update.registrationEnd || Math.floor(new Date().getTime() / 1000),
    allocationStart:
      update.allocationStart === undefined
        ? current.allocationStart
        : update.allocationStart || Math.floor(new Date().getTime() / 1000),
    allocationEnd:
      update.allocationEnd === undefined
        ? current.allocationEnd
        : update.allocationEnd || Math.floor(new Date().getTime() / 1000),
  };
};

const NewFundPool = () => {
  const router = useRouter();
  const [values, updateValues] = useReducer(stateReducer, initialState);
  const setModalStep = useStore((state) => state.setModalStep);
  const setModalStepIndex = useStore((state) => state.setModalStepIndex);
  const setTransactionHashes = useStore((state) => state.setTransactionHashes);

  useEffect(() => {
    setModalStep([
      { status: "loading" },
      { status: "none" },
      { status: "none" },
      { status: "none" },
    ]);
  }, []);

  const handleCreateNewPool = async () => {
    let txHashes = {};
    let poolProfileId: Address = "0x";
    let DVMDDAddress: Address = "0x";

    await deployDVMDD({
      callback: (txHash: { [key: string]: Address }, address: Address) => {
        txHashes = { ...txHashes, ...txHash };
        DVMDDAddress = address;
      },
    });

    setModalStepIndex(0, { status: "done" });
    setModalStepIndex(1, { status: "loading" });

    await setupAllo({
      strategy: DVMDDAddress,
      poolProfileId: null, // TODO:
      contractData: {
        tokenAmount: values.tokenAmount,
        poolManagers: values.poolManagers.split(" ") as Address[],
        stream: values.streamDonation,
        registrationStartTime: BigInt(values.registrationStart),
        registrationEndTime: BigInt(values.registrationEnd),
        allocationStartTime: BigInt(values.allocationStart),
        allocationEndTime: BigInt(values.allocationEnd),
      },
      callback: (txHash: { [key: string]: Address }, id: Address) => {
        txHashes = { ...txHashes, ...txHash };
        poolProfileId = id;
      },
    });

    setTransactionHashes(txHashes);

    setModalStepIndex(1, { status: "done" });
    setModalStepIndex(2, { status: "loading" });

    createPool(
      {
        emoji: values.emoji,
        title: values.title,
        detail: values.detail,
        strategyAddress: DVMDDAddress,
        createdAt: Date.now(),
      },
      (poolId: string) => {
        setModalStepIndex(2, { status: "done" });
        setModalStepIndex(3, { status: "done" });

        setTimeout(() => {
          router.push("/pools/" + poolId);
        }, 10_000);
      }
    );
  };

  return (
    <div className="relative w-full flex-1 rounded-[10px] p-8 flex flex-col gap-8 items-center">
      <Concentric size={12} />
      <div className="flex flex-col items-center">
        <p className=" text-4xl font-lexend font-bold">
          Let's Make a Dekan Splash!
        </p>
        <p className=" text-base font-semibold font-lexend">
          Create a dekan funding pool party to support a cause!
        </p>
      </div>

      <div className="relative bg-white flex-1 rounded-[10px] p-8 flex flex-col gap-8 items-center border">
        <div className=" w-[480px] flex flex-col gap-4">
          <div className=" flex flex-col gap-2 w-full">
            <p className=" text-sm font-medium">Title</p>
            <div className=" flex bg-[#fcecd6] items-center pl-2 rounded-md">
              <EmojiPicker setSelectedEmoji={updateValues} />
              <Input
                type="text"
                value={values.title}
                onChange={(e) => updateValues({ title: e.target.value })}
              />
            </div>
          </div>
          <Input
            label={"Details"}
            type="rich"
            value={values.detail}
            onChange={(e) => updateValues({ detail: e.target.value })}
          />
        </div>

        <hr className="bg-[#F2F2F2] w-[480px] outline-none"></hr>

        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">Allocation Strategy</h2>

          <div className=" w-[480px] flex flex-col gap-8">
            <Switch
              label="Stream Donation"
              optional
              description={"After donation is over stream tokens to recipients"}
              value={values.streamDonation}
              onChange={(e) => updateValues({ streamDonation: e })}
            />

            <StrategySelect
              value={""}
              onChange={function (
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
              input={false}
            />

            <div className=" w-[480px] flex flex-col gap-4">
              <div className="flex gap-4">
                <Input
                  type="datetime-local"
                  label={"Registration Start Date"}
                  value={
                    isNaN(values.registrationStart)
                      ? ""
                      : new Date(
                          values.registrationStart * 1000 -
                            new Date().getTimezoneOffset() * 60000 // Convert Unix timestamp already in UTC to milliseconds and factor in timezone
                        )
                          .toISOString()
                          .substring(0, 16)
                  }
                  onChange={
                    (e) =>
                      updateValues({
                        registrationStart: Math.floor(
                          new Date(e.target.value).getTime() / 1000
                        ),
                      }) // Convert to Unix timestamp
                  }
                />
                <Input
                  type="datetime-local"
                  label={"Registration End Date"}
                  value={
                    isNaN(values.registrationEnd)
                      ? ""
                      : new Date(
                          values.registrationEnd * 1000 -
                            new Date().getTimezoneOffset() * 60000 // Convert Unix timestamp already in UTC to milliseconds and factor in timezone
                        )
                          .toISOString()
                          .substring(0, 16)
                  }
                  onChange={
                    (e) =>
                      updateValues({
                        registrationEnd: Math.floor(
                          new Date(e.target.value).getTime() / 1000
                        ),
                      }) // Convert to Unix timestamp
                  }
                />
              </div>
              <div className="flex gap-4">
                <Input
                  type="datetime-local"
                  label={"Allocation Start Date"}
                  value={
                    isNaN(values.allocationStart)
                      ? ""
                      : new Date(
                          values.allocationStart * 1000 -
                            new Date().getTimezoneOffset() * 60000 // Convert Unix timestamp already in UTC to milliseconds and factor in timezone
                        )
                          .toISOString()
                          .substring(0, 16)
                  }
                  onChange={
                    (e) =>
                      updateValues({
                        allocationStart: Math.floor(
                          new Date(e.target.value).getTime() / 1000
                        ),
                      }) // Convert to Unix timestamp
                  }
                />
                <Input
                  type="datetime-local"
                  label={"Allocation End Date"}
                  value={
                    isNaN(values.allocationEnd)
                      ? ""
                      : new Date(
                          values.allocationEnd * 1000 -
                            new Date().getTimezoneOffset() * 60000 // Convert Unix timestamp already in UTC to milliseconds and factor in timezone
                        )
                          .toISOString()
                          .substring(0, 16)
                  }
                  onChange={
                    (e) =>
                      updateValues({
                        allocationEnd: Math.floor(
                          new Date(e.target.value).getTime() / 1000
                        ),
                      }) // Convert to Unix timestamp
                  }
                />
              </div>
            </div>

            <Input
              label={"Token Amount"}
              type="text"
              value={values.tokenAmount.toString()}
              onChange={(e) =>
                updateValues({ tokenAmount: parseFloat(e.target.value) })
              }
            />

            <Input
              label="Pool Managers"
              type="tag"
              value={values.poolManagers}
              onChange={(e) => updateValues({ poolManagers: e.target.value })}
            />
          </div>
        </div>
        <ProgressModal modalItem={"newPool"}>
          <Button
            className="w-full max-w-[480px]"
            text={"Create Pool"}
            handleClick={handleCreateNewPool}
          />
        </ProgressModal>
      </div>
    </div>
  );
};

export default NewFundPool;
