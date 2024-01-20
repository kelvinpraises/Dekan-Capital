"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useReducer } from "react";

import Button from "@/library/components/atoms/Button";
import Input from "@/library/components/atoms/Input";
import EmojiPicker from "@/library/components/organisms/EmojiPicker";
import { createEcoFund } from "@/library/backendAPI";
import Toggle from "@/library/components/atoms/Toggle";
import StrategySelect from "@/library/components/molecules/StrategySelect";
import Concentric from "@/library/components/molecules/Concentric";

export interface NewFundPool {
  emoji: string;
  title: string;
  tokenAmount: number; // TODO: add this
  description: string;
  registrationEnd: number;
  allocationEnd: number;
  createdAt: number;
}

const NewFundPool = () => {
  const router = useRouter();

  // TODO: Ensure the dates passed should be a time in the future.
  const [values, updateValues] = useReducer(
    (current: NewFundPool, update: Partial<NewFundPool>): NewFundPool => {
      return {
        ...current,
        ...update,
        tokenAmount:
          update.tokenAmount === undefined
            ? current.tokenAmount
            : isNaN(current.tokenAmount)
            ? 0
            : update.tokenAmount || 0,
        registrationEnd:
          update.registrationEnd === undefined
            ? current.registrationEnd
            : update.registrationEnd || Math.floor(new Date().getTime() / 1000),
        allocationEnd:
          update.allocationEnd === undefined
            ? current.allocationEnd
            : update.allocationEnd || Math.floor(new Date().getTime() / 1000),
      };
    },
    {
      emoji: "",
      title: "",
      tokenAmount: 0,
      description: "",
      registrationEnd: Math.floor(new Date().getTime() / 1000), // Convert to Unix timestamp already in UTC
      allocationEnd: Math.floor(new Date().getTime() / 1000), // Convert to Unix timestamp already in UTC
      createdAt: Math.floor(new Date().getTime() / 1000),
    }
  );

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
            label={"Proposal Description"}
            type="rich"
            value={values.description}
            onChange={(e) => updateValues({ description: e.target.value })}
          />
        </div>

        <hr className="bg-[#F2F2F2] w-[480px] outline-none"></hr>

        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">Allocation Strategy</h2>

          <div className=" w-[480px] flex flex-col gap-8">
            <div className=" w-[480px] flex flex-col gap-4">
              <Toggle
                label="Stream Donation"
                optional
                description={
                  "After donation is over stream tokens to recipients"
                }
                value={""}
                onChange={function (e: any): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <Toggle
                label="Registry Anchor Required"
                optional
                description={"Recipients must have an registry anchor address "}
                value={""}
                onChange={function (e: any): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
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
                <Input
                  type="datetime-local"
                  label={"Registration End Date"}
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
              <div className="flex gap-4">
                <Input
                  type="datetime-local"
                  label={"Allocation Start Date"}
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
              label={"Pool Managers"}
              type="text"
              value={values.description}
              onChange={(e) => updateValues({ description: e.target.value })}
            />

            <Input
              label="Registration Questions (Optional)"
              type="text"
              value={values.title}
              onChange={(e) => updateValues({ title: e.target.value })}
            />
          </div>
        </div>
        <Button
          className="w-full max-w-[480px]"
          text={"Create Pool"}
          handleClick={
            () => {}
            // () =>
            // createEcoFund(values, (d: string) => { TODO: add correct values
            //   router.push("/ecoFunds/" + d); TODO: push to correct route
            // })
          }
        />
      </div>
    </div>
  );
};

export default NewFundPool;
