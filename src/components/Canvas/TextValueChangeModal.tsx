import { useAppSelector } from "@/redux/hook";
import React from "react";
import { LuPencil } from "react-icons/lu";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface IProps {
  onSubmit: (value: string) => void;
  value: string;
}

const TextValueChangeModal: React.FC<IProps> = ({ onSubmit, value }) => {
  const { zoom } = useAppSelector((state) => state.project);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = form.text.value as string;
    if (!value) {
      return toast.error("Please enter a value in feild");
    }

    const closeBtn = document.getElementById("close") as HTMLElement;
    onSubmit(value);
    closeBtn.click();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            style={{ transform: `scale(${1 / (zoom / 100)})` }}
            className="shadow-md w-[30px] h-[30px] bg-white rounded-full center"
          >
            <LuPencil className="w-[15px]" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-[8px]">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-card-foreground"
                >
                  Name
                </Label>
                <Textarea
                  id="text"
                  name="text"
                  defaultValue={value}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <Button
                type="submit"
                variant={"secondary"}
                className="w-full rounded-[8px] bg-slate-900 text-white hover:bg-slate-800"
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>

        <DialogFooter>
          <DialogClose asChild>
            <button className="in visible" id="close" />
          </DialogClose>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default TextValueChangeModal;
