import { OutputData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { ChangeEvent } from "react";

import { cn } from "@/library/utils";

interface inputProps {
  type?: "text" | "datetime-local" | "textarea" | "rich";
  label?: string;
  disabled?: boolean;
  value: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EditorBlock = dynamic(
  () => import("@/library/components/organisms/EditorBlock"),
  {
    ssr: false,
  }
);

const Input = (prop: inputProps) => {
  const renderInput = () => {
    switch (prop.type) {
      case "textarea":
        return (
          <textarea
            className={cn(
              "bg-[#fcecd6] p-4 rounded-md h-[113px] outline-none",
              prop.disabled &&
                "bg-white shadow-[0_0_0_2px] shadow-[#fcecd6] outline-none",
              prop.className
            )}
            value={prop.value}
            onChange={prop.onChange}
            disabled={prop.disabled}
          />
        );
      case "rich":
        return (
          <div className=" p-4 bg-[#fcecd6] min-h-[120px] rounded-md">
            <EditorBlock
              data={JSON.parse(JSON.stringify(prop.value))}
              onChange={(val: OutputData) =>
                prop.onChange({
                  target: { value: JSON.stringify(val) },
                } as any)
              }
              holder="editorjs-container"
            />
          </div>
        );
      default:
        return (
          <input
            type={prop.type}
            className={cn(
              "bg-[#fcecd6] p-4 rounded-md outline-none w-full",
              prop.disabled &&
                "bg-white shadow-[0_0_0_2px] shadow-[#fcecd6] outline-none",
              prop.className
            )}
            value={prop.value}
            onChange={prop.onChange}
            disabled={prop.disabled}
          />
        );
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full")}>
      {prop.label && <p className=" text-sm font-normal">{prop.label}</p>}
      {renderInput()}
    </div>
  );
};

export default Input;
