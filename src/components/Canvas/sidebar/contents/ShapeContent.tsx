import { addShape } from "@/redux/features/project/shapes.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import React from "react";
import { v4 } from "uuid";

const ShapeContent: React.FC = () => {
  const { shapes } = useAppSelector((state) => state.shapes);
  const dispatch = useAppDispatch();
  const addCircle = () => {
    const newShape: IShape = {
      x: 150,
      y: 150,
      radius: 100,
      width: 200,
      height: 200,
      color: "#4a4a4a",
      id: v4(),
      type: "circle",
      rotation: 0,
      zIndex: shapes.length,
    };
    dispatch(addShape(newShape));
  };

  const addRectangle = () => {
    const newShape: IShape = {
      x: 50,
      radius: 0,
      y: 50,
      width: 300,
      height: 200,
      color: "#4a4a4a",
      id: v4(),
      type: "rectangle",
      rotation: 0,
      zIndex: shapes.length,
    };
    dispatch(addShape(newShape));
  };

  return (
    <div className=" flex items-start justify-start flex-col gap-[25px] px-[15px]">
      <h3 className="text-[#bebebe] text-[30px] font-[700]">Add shape</h3>
      <div className="flex items-center justify-start gap-[20px] flex-wrap h-fit">
        <button
          className="w-[150px] h-[80px] bg-slate-200"
          onClick={addRectangle}
        >
          Rectagle
        </button>
        <button
          className="w-[80px] h-[80px] rounded-full bg-slate-200"
          onClick={addCircle}
        >
          Circle
        </button>
      </div>
    </div>
  );
};

export default ShapeContent;
