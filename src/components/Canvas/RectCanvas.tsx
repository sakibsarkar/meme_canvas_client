import { IShape } from "@/types/shape";

const RectCanvas = ({ shape }: { shape: IShape }) => {
  return (
    <div
      id={shape.id}
      style={{
        width: `${shape.width}px`,
        height: `${shape.height}px`,
        backgroundColor: shape.color,
        borderRadius: `${shape.radius}%`,
      }}
    ></div>
  );
};

export default RectCanvas;
