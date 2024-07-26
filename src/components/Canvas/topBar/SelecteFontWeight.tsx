import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  setSelectedShape,
  updateShape,
} from "@/redux/features/project/shapes.slice";
import { useAppSelector } from "@/redux/hook";
import { IShape, TFontWeight } from "@/types/shape";
import React from "react";
import { useDispatch } from "react-redux";

interface IProps {
  updateFontWeight: (delta: TFontWeight) => IShape | null;
}

const SelecteFontWeight: React.FC<IProps> = ({ updateFontWeight }) => {
  const dispatch = useDispatch();
  const { selectedShape } = useAppSelector((state) => state.shapes);

  const handleChangeFontweight = (e: string) => {
    const weight = Number(e) as TFontWeight;
    const updated = updateFontWeight(weight);

    if (!updated) return;

    dispatch(setSelectedShape(updated));
    dispatch(updateShape(updated));
  };

  return (
    <Select
      onValueChange={(e) => handleChangeFontweight(e)}
      value={selectedShape?.textStyle?.fontWeight?.toString() || "300"}
    >
      <SelectTrigger className="w-[180px] border-borderColor">
        <SelectValue placeholder="Select font weight" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup className="cursor-pointer">
          <SelectLabel>Font Weight</SelectLabel>
          <SelectItem value="300">Light</SelectItem>
          <SelectItem value="400">Regular</SelectItem>
          <SelectItem value="500">Medium</SelectItem>
          <SelectItem value="600">Bold</SelectItem>
          <SelectItem value="700">Extra bold</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelecteFontWeight;
