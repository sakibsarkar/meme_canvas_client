import { IShape, TFontWeight } from "@/types/shape";

interface IShapeStyleProps {
  selectedShape: IShape | null;
  shapes: IShape[];
}

export const shapeStyleFunction = (args: IShapeStyleProps) => {
  const { selectedShape, shapes } = args;
  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (!selectedShape) return null;

    return { ...selectedShape, color };
  };

  const handleChangeRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedShape) return null;

    const rotation = Number(e.target.value);
    return { ...selectedShape, rotation } as IShape;
  };

  const updateFontSize = (delta: number) => {
    if (!selectedShape) return null;
    if (selectedShape.textStyle?.fontSize === 0 && delta < 0)
      return selectedShape;

    const shape = { ...selectedShape };
    const { textStyle = {}, ...rest } = shape;
    const { fontSize = 15 } = textStyle;
    const newFontSize = Math.max(fontSize + delta, 0);
    const newTextStyle = { ...textStyle, fontSize: newFontSize };

    return { ...rest, textStyle: newTextStyle } as IShape;
  };
  const updateFontWeight = (weight: TFontWeight) => {
    if (!selectedShape) return null;

    const shape = { ...selectedShape };
    const { textStyle = {}, ...rest } = shape;

    const newTextStyle = { ...textStyle, fontWeight: weight };

    return { ...rest, textStyle: newTextStyle } as IShape;
  };

  return {
    handleChangeColor,
    handleChangeRotation,
    updateFontSize,
    updateFontWeight,
  };
};
