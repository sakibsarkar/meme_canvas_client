import { addShape } from "@/redux/features/project/shapes.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import React from "react";
import { v4 } from "uuid";

const AddTextContent: React.FC = () => {
  const { shapes } = useAppSelector((state) => state.shapes);
  const dispatch = useAppDispatch();

  const addText = () => {
    const newShape: IShape = {
      x: 250,
      y: 250,
      radius: 0,
      width: 0,
      height: 0,
      color: "#000000",
      id: v4(),
      type: "text",
      rotation: 0,
      text: "Sample Text",
      zIndex: shapes.length,
      textStyle: {
        fontSize: 20,
        textAlign: "start",
      },
    };
    dispatch(addShape(newShape));
  };

  return (
    <div className=" flex items-start justify-start flex-col gap-[25px] px-[15px]">
      <h3 className="text-[#bebebe] text-[30px] font-[700]">Add Text</h3>
      <div className="flex items-center justify-start gap-[20px] flex-wrap h-fit w-full">
        <button
          className="w-full bg-primaryMat text-white rounded-[5px] py-[8px]"
          onClick={addText}
        >
          Add a text
        </button>
      </div>
    </div>
  );
};

export default AddTextContent;
