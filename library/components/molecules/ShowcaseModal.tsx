"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useReducer, useState } from "react";

import EmojiPicker from "@/library/components/organisms/EmojiPicker";
import Button from "../atoms/Button";
import Input from "./Input";

interface ModalProps {
  children: React.ReactNode;
}

interface ShowcaseProject {
  emoji: string;
  title: string;
  tokensRequested: number;
  description: string;
}

const initialState = {
  emoji: "",
  title: "",
  tokensRequested: 0,
  description: "",
};

const stateReducer = (
  current: ShowcaseProject,
  update: Partial<ShowcaseProject>
): ShowcaseProject => {
  return {
    ...current,
    ...update,
    tokensRequested:
      update.tokensRequested === undefined
        ? current.tokensRequested
        : isNaN(current.tokensRequested)
        ? 0
        : update.tokensRequested || 0,
  };
};

const ShowcaseModal: React.FC<ModalProps> = ({ children }: ModalProps) => {
  const [values, updateValues] = useReducer(stateReducer, initialState);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!isRendered) {
    return null;
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-full">{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-blur-xl data-[state=open]:animate-overlayShow absolute inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow overflow-scroll absolute max-h-[80%] top-[50%] left-[50%] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div>
            <div className="sticky top-[0] flex flex-row-reverse translate-x-[12px] translate-y-[-12px] w-full">
              <Dialog.Close asChild>
                <button
                  className=" hover:bg-black/60 text-white bg-black/40 inline-flex flex-row-reverse h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-8">
              <div className="mt-[-25px] flex flex-col gap-4">
                <div>
                  <Dialog.Title className="font-bold text-xl">
                    Showcase
                  </Dialog.Title>
                  <Dialog.Description>
                    Fill your details. Apply for a funded drip!
                  </Dialog.Description>
                </div>

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
                  label={"Dekans Request Amount"}
                  type="text"
                  value={values.tokensRequested.toString()}
                  onChange={(e) =>
                    updateValues({
                      tokensRequested: parseFloat(e.target.value),
                    })
                  }
                />

                <Input
                  label={"Description"}
                  type="textarea"
                  value={values.description}
                  onChange={(e) =>
                    updateValues({ description: e.target.value })
                  }
                />
              </div>

              <Dialog.Close>
                <Button
                  className="w-full"
                  text={"Save Project"}
                  handleClick={undefined}
                />
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ShowcaseModal;
