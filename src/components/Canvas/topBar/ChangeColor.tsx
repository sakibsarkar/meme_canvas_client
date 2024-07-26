import { Input } from "@/components/ui/input";
import { updateShape } from "@/redux/features/project/shapes.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import React from "react";
interface IProps {
  handleChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => IShape | null;
}
const ChangeColor: React.FC<IProps> = ({ handleChangeColor }) => {
  const { selectedShape } = useAppSelector((state) => state.shapes);

  const dispatch = useAppDispatch();
  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shape = handleChangeColor(e);
    if (!shape) return;
    dispatch(updateShape(shape));
  };

  return (
    <div className=" center gap-[5px]">
      <p>Color:</p>
      <Input
        className="p-[0] w-[50px]"
        type="color"
        value={selectedShape?.color}
        onChange={changeColor}
      />
    </div>
  );
};

export default ChangeColor;
