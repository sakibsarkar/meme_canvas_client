import { SendToBack } from "lucide-react";
import React, { SetStateAction } from "react";
import { IoIosImages } from "react-icons/io";
import { IoShapes, IoText } from "react-icons/io5";
interface IProps {
  setTab: React.Dispatch<SetStateAction<string>>;
  tab: string;
}
const SidebarLinks: React.FC<IProps> = ({ setTab, tab }) => {
  return (
    <div className="w-[80px] h-full flex flex-col justify-start items-center bg-[#18191b] gap-[8px] py-[10px]">
      <button
        onClick={() => setTab("shape")}
        className={`text-white center gap-[5px] p-[8px] flex-col rounded-[5px] hover:bg-[#52565c] ${
          tab === "shape" ? "bg-[#52565c]" : ""
        }`}
      >
        <IoShapes /> Shapes
      </button>
      <button
        onClick={() => setTab("text")}
        className={`text-white center gap-[5px] p-[8px] flex-col rounded-[5px] hover:bg-[#52565c] ${
          tab === "text" ? "bg-[#52565c]" : ""
        }`}
      >
        <IoText /> Add text
      </button>
      <button
        onClick={() => setTab("position")}
        className={`text-white center gap-[5px] p-[8px] flex-col rounded-[5px] hover:bg-[#52565c] ${
          tab === "position" ? "bg-[#52565c]" : ""
        }`}
      >
        <SendToBack /> Position
      </button>
      <button
        onClick={() => setTab("image")}
        className={`text-white center gap-[5px] p-[8px] flex-col rounded-[5px] hover:bg-[#52565c] ${
          tab === "image" ? "bg-[#52565c]" : ""
        }`}
      >
        <IoIosImages /> Image
      </button>
    </div>
  );
};

export default SidebarLinks;
